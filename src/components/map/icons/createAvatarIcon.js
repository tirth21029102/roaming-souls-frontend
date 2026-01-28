import L from 'leaflet';

export const createAvatarIcon = (imagePath) =>
  L.divIcon({
    className: 'user-avatar-marker',
    html: `
      <div class="avatar-wrapper">
        <img src="${imagePath}" alt="user avatar" />
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
