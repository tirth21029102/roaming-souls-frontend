// import { useEffect, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { createPeerConnection } from '../../socket/webrtc';
// import socket from '../../socket/socket';
// import { SOCKET_EVENTS } from '../../socket/events';
// import { endCall } from '../../store/call.slice';

// export default function VideoCall({
//   currentUser,
//   remoteUser,
//   isCaller, // ✅ from parent
//   onClose,
// }) {
//   const dispatch = useDispatch();

//   const { offer, answer, iceCandidates } = useSelector((state) => state.call);
//   console.log(offer);

//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerRef = useRef(null);
//   const streamRef = useRef(null);
//   const offerSentRef = useRef(false);

//   /**
//    * 1️⃣ Setup media + peer connection (once)
//    */
//   useEffect(() => {
//     async function init() {
//       // Get camera & mic
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       streamRef.current = stream;
//       localVideoRef.current.srcObject = stream;

//       // Create peer
//       const peer = createPeerConnection();
//       peerRef.current = peer;

//       // Add tracks
//       stream.getTracks().forEach((track) => {
//         peer.addTrack(track, stream);
//       });

//       // Receive remote stream
//       peer.ontrack = (event) => {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       };

//       // Send ICE candidates
//       peer.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit(SOCKET_EVENTS.ICE_CANDIDATE, {
//             to: remoteUser.id,
//             candidate: event.candidate,
//           });
//         }
//       };
//     }

//     init();

//     return () => {
//       streamRef.current?.getTracks().forEach((t) => t.stop());
//       peerRef.current?.close();
//       dispatch(endCall());
//     };
//   }, []);

//   /**
//    * 2️⃣ Caller: create & send OFFER
//    */
//   useEffect(() => {
//     async function createOffer() {
//       if (!isCaller || !peerRef.current || offerSentRef.current) return;

//       const offer = await peerRef.current.createOffer();
//       await peerRef.current.setLocalDescription(offer);

//       socket.emit(SOCKET_EVENTS.CALL_OFFER, {
//         to: remoteUser.id,
//         offer,
//       });

//       offerSentRef.current = true;
//     }

//     createOffer();
//   }, [isCaller]);

//   /**
//    * 3️⃣ Callee: receive OFFER → create ANSWER
//    */
//   useEffect(() => {
//     async function handleOffer() {
//       if (!offer || !peerRef.current) return;

//       await peerRef.current.setRemoteDescription(offer);

//       const answer = await peerRef.current.createAnswer();
//       await peerRef.current.setLocalDescription(answer);

//       socket.emit(SOCKET_EVENTS.CALL_ANSWER, {
//         to: remoteUser.id,
//         answer,
//       });
//     }

//     handleOffer();
//   }, [offer]);

//   /**
//    * 4️⃣ Caller: receive ANSWER
//    */
//   useEffect(() => {
//     async function handleAnswer() {
//       if (!answer || !peerRef.current) return;
//       await peerRef.current.setRemoteDescription(answer);
//     }

//     handleAnswer();
//   }, [answer]);

//   /**
//    * 5️⃣ Both sides: handle ICE candidates
//    */
//   useEffect(() => {
//     if (!peerRef.current) return;

//     iceCandidates.forEach((candidate) => {
//       peerRef.current.addIceCandidate(candidate);
//     });
//   }, [iceCandidates]);

//   return (
//     <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-lg">
//       <div className="relative flex h-[92vh] w-[92vw] max-w-7xl flex-col overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
//           <span className="text-sm text-white/80">
//             {currentUser.user_name} ➡️ {remoteUser.user_name}
//           </span>

//           <button
//             onClick={onClose}
//             className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
//           >
//             End Call
//           </button>
//         </div>

//         {/* Video Area */}
//         <div className="relative flex flex-1 items-center justify-center p-6">
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             playsInline
//             className="h-full w-full rounded-3xl object-cover"
//           />

//           <div className="absolute right-6 bottom-6 h-40 w-64 overflow-hidden rounded-2xl bg-black">
//             <video
//               ref={localVideoRef}
//               autoPlay
//               muted
//               playsInline
//               className="h-full w-full object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//https://chatgpt.com/c/696b1dad-8a50-8321-8a4d-b9c36ef08c98
// import { useEffect, useRef } from 'react';
// import { createPeerConnection } from '../../socket/webrtc';
// import socket from '../../socket/socket';
// import { SOCKET_EVENTS } from '../../socket/events';

// export default function VideoCall({
//   currentUser,
//   remoteUser,
//   onClose,
//   isCaller,
// }) {
//   const localVideoRef = useRef(null);
//   const remoteVideoRef = useRef(null);
//   const peerRef = useRef(null);
//   const streamRef = useRef(null);

//   useEffect(() => {
//     async function start() {
//       // 1️⃣ Get camera & mic
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       streamRef.current = stream;

//       localVideoRef.current.srcObject = stream;

//       // 2️⃣ Create peer connection
//       const peer = createPeerConnection();
//       peerRef.current = peer;

//       // 3️⃣ Add tracks
//       stream.getTracks().forEach((track) => {
//         peer.addTrack(track, stream);
//       });

//       // 4️⃣ Receive remote stream
//       peer.ontrack = (event) => {
//         remoteVideoRef.current.srcObject = event.streams[0];
//       };

//       // 5️⃣ ICE candidates
//       peer.onicecandidate = (event) => {
//         if (event.candidate) {
//           socket.emit(SOCKET_EVENTS.ICE_CANDIDATE, {
//             to: remoteUser.id,
//             candidate: event.candidate,
//           });
//         }
//       };

//       // 6️⃣ Socket listeners
//       socket.on(SOCKET_EVENTS.CALL_OFFER, async ({ from, offer }) => {
//         await peer.setRemoteDescription(offer);

//         const answer = await peer.createAnswer();
//         await peer.setLocalDescription(answer);
//         socket.emit(SOCKET_EVENTS.CALL_ANSWER, {
//           to: from,
//           answer,
//         });
//       });

//       socket.on(SOCKET_EVENTS.CALL_ANSWER, async ({ answer }) => {
//         await peer.setRemoteDescription(answer);
//       });

//       socket.on(SOCKET_EVENTS.ICE_CANDIDATE, async ({ candidate }) => {
//         if (candidate) {
//           await peer.addIceCandidate(candidate);
//         }
//       });

//       // 7️⃣ Caller creates offer
//       if (isCaller) {
//         const offer = await peer.createOffer();
//         await peer.setLocalDescription(offer);

//         socket.emit(SOCKET_EVENTS.CALL_OFFER, {
//           to: remoteUser.id,
//           offer,
//         });
//       }
//     }

//     start();

//     // 🧹 Cleanup
//     return () => {
//       socket.off(SOCKET_EVENTS.CALL_OFFER);
//       socket.off(SOCKET_EVENTS.CALL_ANSWER);
//       socket.off(SOCKET_EVENTS.ICE_CANDIDATE);

//       streamRef.current?.getTracks().forEach((t) => t.stop());
//       peerRef.current?.close();
//     };
//   }, []);

//   const currentUserImage = `http://localhost:9000/${currentUser.imageName}`;
//   const remoteUserImage = `http://localhost:9000/${remoteUser.imageName}`;

//   return (
//     <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/70 backdrop-blur-lg">
//       <div className="relative flex h-[92vh] w-[92vw] max-w-7xl flex-col overflow-hidden rounded-3xl bg-neutral-900 shadow-2xl">
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
//           <div className="flex items-center gap-3">
//             <img
//               src={currentUserImage}
//               alt={currentUser.user_name}
//               className="h-9 w-9 rounded-full object-cover ring-2 ring-green-500"
//             />
//             <span className="text-sm text-white/80">
//               {currentUser.user_name} ➡️ {remoteUser.user_name}
//             </span>
//           </div>

//           <button
//             onClick={onClose}
//             className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
//           >
//             End Call
//           </button>
//         </div>

//         {/* Video Area */}
//         <div className="relative flex flex-1 items-center justify-center p-6">
//           {/* Remote Video */}
//           <div className="relative h-full w-full overflow-hidden rounded-3xl bg-black">
//             {/* Name Badge */}
//             <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-xl bg-black/60 px-3 py-1.5 text-xs text-white backdrop-blur">
//               <img
//                 src={remoteUserImage}
//                 alt={remoteUser.user_name}
//                 className="h-6 w-6 rounded-full object-cover"
//               />
//               {remoteUser.user_name}
//             </div>

//             {/* Remote Video Placeholder */}
//             <div className="flex h-full w-full items-center justify-center bg-neutral-800">
//               {/* <img
//                 src={remoteUserImage}
//                 alt={remoteUser.user_name}
//                 className="h-48 w-48 rounded-full object-cover opacity-90"
//               /> */}
//               <video
//                 ref={remoteVideoRef}
//                 autoPlay
//                 playsInline
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </div>

//           {/* Local Video (PiP) */}
//           <div className="absolute right-6 bottom-6 w-64 overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10">
//             <div className="flex items-center gap-2 bg-black/70 px-3 py-2 text-xs text-white backdrop-blur">
//               <img
//                 src={currentUserImage}
//                 alt={currentUser.user_name}
//                 className="h-5 w-5 rounded-full object-cover"
//               />
//               You
//             </div>

//             <div className="flex h-40 items-center justify-center bg-neutral-700">
//               {/* <img
//                 src={currentUserImage}
//                 alt="You"
//                 className="h-20 w-20 rounded-full object-cover opacity-90"
//               /> */}
//               <video
//                 ref={localVideoRef}
//                 autoPlay
//                 muted
//                 playsInline
//                 className="h-full w-full object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Bottom Controls */}
//         <div className="flex items-center justify-center gap-4 border-t border-white/10 py-4">
//           <button className="rounded-full bg-neutral-800 p-4 text-white hover:bg-neutral-700">
//             🎤
//           </button>
//           <button className="rounded-full bg-red-600 p-4 text-white hover:bg-red-700">
//             📞
//           </button>
//           <button className="rounded-full bg-neutral-800 p-4 text-white hover:bg-neutral-700">
//             🎥
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// getUserMedia → asks permission
// Returns a MediaStream
// srcObject → streams video into <video>
//muted is REQUIRED or browser blocks autoplay.

import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useWebRTC } from '../src/socket/useWebRTC';

export default function VideoCall() {
  const { status, error } = useSelector((state) => state.call);
  const currentUser = useSelector((state) => state.users.loggedInUser);

  const { localStream, remoteStream, acceptIncomingCall, hangUp } = useWebRTC();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  /* ================= VIDEO BINDING ================= */

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // useEffect(() => {
  //   if (remoteVideoRef.current && remoteStream) {
  //     remoteVideoRef.current.srcObject = remoteStream;
  //   }
  // }, [remoteStream]);

  // useEffect(() => {
  //   console.log('📺 video tracks:', remoteStream?.getVideoTracks().length);
  //   if (remoteVideoRef.current && remoteStream) {
  //     remoteVideoRef.current.srcObject = remoteStream;
  //     remoteVideoRef.current.play().catch(() => {});
  //   }
  // }, [remoteStream]);

  useEffect(() => {
    if (remoteVideoRef.current) {
      console.log(
        '🎬 video srcObject set:',
        !!remoteVideoRef.current.srcObject,
      );
    }
  }, [remoteStream]);

  useEffect(() => {
    if (remoteStream) {
      console.log(
        '🎥 stream active:',
        remoteStream.active,
        'video tracks:',
        remoteStream.getVideoTracks().map((t) => t.readyState),
      );
    }
  }, [remoteStream]);

  useEffect(() => {
    const video = remoteVideoRef.current;
    if (!video || !remoteStream) return;

    console.log('📺 Binding remote stream');

    video.srcObject = null; // 🔥 force detach
    video.srcObject = remoteStream; // 🔥 reattach

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('🚫 Remote video play() failed:', err);
      });
    }
  }, [remoteStream]);

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
          {remoteStream && (
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              muted={false}
              preload="auto"
              className="h-full w-full rounded-3xl object-cover"
            />
          )}

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
