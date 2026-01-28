import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWebRTC } from '../src/socket/useWebRTC';

export default function VideoCall() {
  const { status, error } = useSelector((state) => state.call);
  const { localStream, remoteStream, acceptIncomingCall, hangUp } = useWebRTC();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  /* ================= STREAM BINDING ================= */

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // useEffect(() => {
  //   const video = remoteVideoRef.current;
  //   if (!video || !remoteStream) return;
  //   console.log(remoteStream);
  //   console.log(remoteVideoRef);
  //   video.srcObject = remoteStream;
  //   video.play().catch(() => {});
  // }, [remoteStream]);

  // useEffect(() => {
  //   const video = remoteVideoRef.current;
  //   if (!video || !remoteStream) return;

  //   console.log('Remote tracks:', remoteStream.getTracks());
  //   console.log('Remote video tracks:', remoteStream.getVideoTracks());

  //   video.srcObject = remoteStream;
  //   video.play().catch(() => {});
  // }, [remoteStream]);

  const setRemoteVideoRef = (node) => {
    if (node && remoteStream) {
      node.srcObject = remoteStream;
      node.play().catch(() => {});
    }
    remoteVideoRef.current = node;
  };

  /* ================= RENDER GUARDS ================= */

  if (status === 'IDLE') return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-lg">
      <div className="relative flex h-[92vh] w-[92vw] max-w-7xl flex-col overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <span className="text-sm text-white/80">
            {status === 'INCOMING' && 'Incoming call'}
            {status === 'OUTGOING' && 'Calling…'}
            {status === 'IN_CALL' && 'In call'}
          </span>

          <button
            onClick={hangUp}
            className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            End Call
          </button>
        </div>

        {/* BODY */}
        <div className="relative flex flex-1 items-center justify-center p-6">
          {/* REMOTE VIDEO */}
          <video
            ref={setRemoteVideoRef}
            autoPlay
            muted
            playsInline
            className="h-full w-full rounded-3xl object-cover"
          />

          {/* LOCAL VIDEO */}
          {localStream && (
            <div className="absolute right-6 bottom-6 h-40 w-64 overflow-hidden rounded-2xl bg-black">
              <video
                ref={localVideoRef}
                autoPlay
                muted
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* INCOMING CONTROLS */}
          {status === 'INCOMING' && (
            <div className="absolute bottom-10 flex gap-4">
              <button
                onClick={acceptIncomingCall}
                className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
              >
                Accept
              </button>

              <button
                onClick={hangUp}
                className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
              >
                Reject
              </button>
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="absolute top-4 rounded-lg bg-red-500/90 px-4 py-2 text-sm text-white">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
