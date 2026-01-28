// Create a peer connection helper (very important)

export const createPeerConnection = () => {
  return new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });
};

// Why this exists
// RTCPeerConnection is the engine
// STUN server helps browsers find each other across networks
