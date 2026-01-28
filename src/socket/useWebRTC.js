import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptCall, endCall } from '../store/call.slice';
import {
  emitCallOffer,
  emitCallAnswer,
  emitIceCandidate,
  emitCallEnd,
  emitCallError,
} from './emitters';
import { SOCKET_EVENTS } from './events';
import socket from './socket';
import { toast } from 'react-toastify';

const RTC_CONFIG = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
  ],
};

export const useWebRTC = () => {
  const dispatch = useDispatch();
  const call = useSelector((state) => state.call);

  const pcRef = useRef(null);
  const localStreamRef = useRef(null);
  const pendingIceRef = useRef([]);

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  const createPeerConnection = () => {
    if (pcRef.current) return pcRef.current;

    const pc = new RTCPeerConnection(RTC_CONFIG);

    pc.onconnectionstatechange = () => {
      if (
        pc.connectionState === 'disconnected' ||
        pc.connectionState === 'failed' ||
        pc.connectionState === 'closed'
      ) {
        toast.error('Connection lost 📻');
        hangUp();
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate && call.remoteUserId) {
        emitIceCandidate(call.remoteUserId, event.candidate);
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream((prev) => {
        if (prev) {
          prev.addTrack(event.track);
          return prev;
        }
        return new MediaStream([event.track]);
      });
    };

    pcRef.current = pc;
    return pc;
  };

  const startLocalMedia = async () => {
    if (localStreamRef.current) return localStreamRef.current;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: { echoCancellation: true, noiseSuppression: true },
      });

      localStreamRef.current = stream;
      setLocalStream(stream);
      return stream;
    } catch (err) {
      let message = 'Failed to access camera or microphone';

      if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        message = 'Camera is already in use by another application';
      } else if (err.name === 'NotAllowedError') {
        message = 'Camera or microphone permission denied';
      } else if (err.name === 'NotFoundError') {
        message = 'No camera or microphone found';
      }

      if (call.remoteUserId) {
        emitCallError(call.remoteUserId, message);
      }

      toast.error(message); // optional local UI

      emitCallEnd();
      dispatch(endCall());
      throw err;
    }
  };

  const flushPendingIce = async () => {
    const pc = pcRef.current;
    if (!pc || !pc.remoteDescription) return;

    for (const candidate of pendingIceRef.current) {
      try {
        await pc.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (e) {
        console.error('ICE add failed', e);
      }
    }
    pendingIceRef.current = [];
  };

  const acceptIncomingCall = async () => {
    if (
      call.status !== 'INCOMING' ||
      !call.offer ||
      !call.remoteUserId ||
      pcRef.current
    ) {
      return;
    }

    dispatch(acceptCall());

    const stream = await startLocalMedia();
    const pc = createPeerConnection();

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    await pc.setRemoteDescription(new RTCSessionDescription(call.offer));
    await flushPendingIce();

    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    emitCallAnswer(call.remoteUserId, answer);
  };

  const hangUp = () => {
    const pc = pcRef.current;

    if (pc) {
      pc.close();
      pcRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }

    pendingIceRef.current = [];
    setLocalStream(null);
    setRemoteStream(null);

    emitCallEnd();
    dispatch(endCall());
  };

  useEffect(() => {
    const handleIce = ({ from, candidate }) => {
      if (from !== call.remoteUserId) return;

      const pc = pcRef.current;

      if (!pc || !pc.remoteDescription) {
        pendingIceRef.current.push(candidate);
        return;
      }

      pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
    };

    socket.on(SOCKET_EVENTS.ICE_CANDIDATE, handleIce);
    return () => socket.off(SOCKET_EVENTS.ICE_CANDIDATE, handleIce);
  }, [call.remoteUserId]);

  useEffect(() => {
    if (call.status !== 'OUTGOING' || !call.remoteUserId || pcRef.current)
      return;

    const start = async () => {
      const stream = await startLocalMedia();
      const pc = createPeerConnection();

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      emitCallOffer(call.remoteUserId, offer);
    };

    start().catch(console.error);
  }, [call.status, call.remoteUserId]);

  useEffect(() => {
    if (call.status !== 'IN_CALL' || !call.answer) return;

    const pc = pcRef.current;
    if (!pc || pc.signalingState === 'closed') return;

    pc.setRemoteDescription(new RTCSessionDescription(call.answer))
      .then(flushPendingIce)
      .catch(console.error);
  }, [call.status, call.answer]);

  useEffect(() => {
    return () => hangUp();
  }, []);

  useEffect(() => {
    const handleCallError = (message) => {
      toast.error(message);
      console.log('Call error:', message);
      hangUp();
    };

    socket.on(SOCKET_EVENTS.CALL_ERROR, handleCallError);
    return () => socket.off(SOCKET_EVENTS.CALL_ERROR, handleCallError);
  }, []);

  return {
    acceptIncomingCall,
    hangUp,
    localStream,
    remoteStream,
  };
};
