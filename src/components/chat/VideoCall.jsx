import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useWebRTC } from '../../socket/useWebRTC';
import { Resizable } from 're-resizable';
import Draggable from 'react-draggable';

export default function VideoCall() {
  const { status, error, remoteUserId } = useSelector((state) => state.call);
  const { localStream, remoteStream, acceptIncomingCall, hangUp } = useWebRTC();
  const dragRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);

  const [size, setSize] = useState({
    width: '92vw',
    height: '92vh',
  });

  /* ================= STREAM BINDING ================= */

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream || null;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream || null;
    }
  }, [remoteStream]);

  /* ================= ANY CALL ERRORS ================= */

  /* ================= RENDER GUARDS ================= */

  if (status === 'IDLE') return null;

  //items-center justify-center bg-black/70 backdrop-blur-xl
  //h-[92vh] w-[92vw]
  return (
    <div className="animate-fadeIn fixed inset-0 z-50">
      <Draggable handle=".call-header" nodeRef={dragRef}>
        <div
          ref={dragRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Resizable
            size={size}
            onResizeStop={(e, direction, ref) => {
              setSize({
                width: ref.style.width,
                height: ref.style.height,
              });
            }}
            minWidth={700}
            minHeight={450}
            maxWidth="96vw"
            maxHeight="96vh"
            enable={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            handleStyles={{
              right: { cursor: 'ew-resize' },
              bottom: { cursor: 'ns-resize' },
              bottomRight: { cursor: 'nwse-resize' },
            }}
            className="animate-scaleIn relative flex flex-col overflow-hidden rounded-[2rem] bg-neutral-900/90 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10"
          >
            {/* <div className="animate-scaleIn relative flex max-w-7xl flex-col overflow-hidden rounded-[2rem] bg-neutral-900/90 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-white/10"> */}
            {/* HEADER */}
            <div className="call-header flex cursor-move items-center justify-between border-b border-white/10 px-8 py-5">
              <div className="flex items-center gap-3">
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    status === 'IN_CALL'
                      ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]'
                      : 'bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]'
                  }`}
                />
                <span className="text-sm font-medium tracking-wide text-white/80">
                  {status === 'INCOMING' && 'Incoming call'}
                  {status === 'OUTGOING' && 'Calling…'}
                  {status === 'IN_CALL' && 'In call'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* MIC TOGGLE */}
                <button
                  onClick={() => setMicOn((v) => !v)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-lg ring-1 ring-white/10 transition active:scale-95 ${
                    micOn
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-red-600/80 hover:bg-red-700'
                  }`}
                >
                  {micOn ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white/90">
                      <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" />
                      <path d="M19 11a1 1 0 0 0-2 0 5 5 0 0 1-10 0 1 1 0 0 0-2 0 7 7 0 0 0 6 6.93V21a1 1 0 0 0 2 0v-3.07A7 7 0 0 0 19 11z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                      <path d="M16.5 12c0 .23-.03.45-.08.67l1.46 1.46c.39-.64.62-1.38.62-2.13a1 1 0 0 0-2 0zM12 14a3 3 0 0 1-3-3V9.41l5.59 5.59c-.79.65-1.8 1-2.59 1zM3.27 2L2 3.27l5 5V11a5 5 0 0 0 8.9 3.14l2.83 2.83 1.27-1.27L3.27 2zM15 5.18V5a3 3 0 0 0-5.11-2.12l5.11 5.3z" />
                    </svg>
                  )}
                </button>

                {/* CAM TOGGLE */}
                <button
                  onClick={() => setCamOn((v) => !v)}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-lg ring-1 ring-white/10 transition active:scale-95 ${
                    camOn
                      ? 'bg-white/10 hover:bg-white/20'
                      : 'bg-red-600/80 hover:bg-red-700'
                  }`}
                >
                  {camOn ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white/90">
                      <path d="M17 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4.5l4 4v-11l-4 4z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                      <path d="M21 6.5l-4 4V6a2 2 0 0 0-2-2H7.82l9.09 9.09L21 10.5v-4zM3.27 2L2 3.27 5.73 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-.73l3.73 3.73 1.27-1.27L3.27 2z" />
                    </svg>
                  )}
                </button>

                {/* END CALL */}
                <button
                  onClick={hangUp}
                  className="rounded-xl bg-red-600/90 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 hover:shadow-red-500/30 active:scale-95"
                >
                  End Call
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="relative flex flex-1 items-center justify-center gap-10 p-8">
              {/* REMOTE — MAIN */}
              <div className="animate-slideUp relative flex h-full max-h-[520px] w-full max-w-[820px] items-center justify-center overflow-hidden rounded-[2rem] bg-black shadow-2xl ring-1 ring-white/10">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />

                {!remoteStream && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/70">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
                    <span className="text-sm tracking-wide">
                      Waiting for remote…
                    </span>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  Remote
                </div>
              </div>

              {/* LOCAL — FLOATING PIP */}
              <div className="animate-slideInRight absolute right-8 bottom-8 h-44 w-44 overflow-hidden rounded-2xl bg-black shadow-[0_10px_40px_rgba(0,0,0,0.6)] ring-1 ring-white/20">
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className={`h-full w-full object-cover transition-opacity ${
                    camOn ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <div className="absolute bottom-2 left-2 rounded bg-black/60 px-2 py-1 text-[11px] font-medium text-white backdrop-blur">
                  You
                </div>
              </div>

              {/* INCOMING CONTROLS */}
              {status === 'INCOMING' && (
                <div className="animate-slideUp absolute bottom-10 flex gap-6">
                  <button
                    onClick={acceptIncomingCall}
                    className="rounded-2xl bg-green-600/90 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-green-700 hover:shadow-green-500/30 active:scale-95"
                  >
                    Accept
                  </button>

                  <button
                    onClick={hangUp}
                    className="rounded-2xl bg-red-600/90 px-8 py-3.5 font-semibold text-white shadow-lg transition hover:bg-red-700 hover:shadow-red-500/30 active:scale-95"
                  >
                    Reject
                  </button>
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div className="animate-slideDown absolute top-6 rounded-xl bg-red-500/90 px-5 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur">
                  {error}
                </div>
              )}
            </div>
            {/* </div> */}
          </Resizable>
        </div>
      </Draggable>
    </div>
  );
}
