import { Polyline, useMap } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';

const OCEAN_POINT = [0, -160];

export default function CallConnectionLine() {
  const map = useMap();

  const call = useSelector((state) => state.call);
  const currentUser = useSelector((state) => state.users.loggedInUser);
  const users = useSelector((state) => state.userTracking.visibleUsers);

  const { linePoints, shouldRender } = useMemo(() => {
    if (
      call.status !== 'OUTGOING' &&
      call.status !== 'INCOMING' &&
      call.status !== 'IN_CALL'
    ) {
      return { shouldRender: false };
    }

    const userA = users.find((u) => u.id === currentUser?.id);
    const userB = users.find((u) => u.id === call.remoteUserId);

    const hasA = userA?.latitude && userA?.longitude;
    const hasB = userB?.latitude && userB?.longitude;

    // ❌ Neither user has location
    if (!hasA && !hasB) {
      return { shouldRender: false };
    }

    const pointA = hasA
      ? [Number(userA.latitude), Number(userA.longitude)]
      : OCEAN_POINT;

    const pointB = hasB
      ? [Number(userB.latitude), Number(userB.longitude)]
      : OCEAN_POINT;

    return {
      shouldRender: true,
      linePoints: [pointA, pointB],
    };
  }, [call.status, call.remoteUserId, users, currentUser]);

  /* ================= MAP ZOOM ================= */

  useEffect(() => {
    if (!shouldRender || !linePoints) return;

    map.fitBounds(linePoints, {
      padding: [80, 80],
      animate: true,
      duration: 1,
    });
  }, [shouldRender, linePoints, map]);

  useEffect(() => {
    if (call.status !== 'IDLE') return;

    const me = users.find((u) => u.id === currentUser?.id);
    if (!me?.latitude || !me?.longitude) return;

    map.flyTo([Number(me.latitude), Number(me.longitude)], 6, {
      animate: true,
      duration: 1.2,
    });
  }, [call.status]);

  if (!shouldRender) return null;

  return (
    <Polyline
      positions={linePoints}
      pathOptions={{
        color: '#22c55e',
        weight: 3,
        dashArray: '12 12',
        className: 'call-line',
      }}
    />
  );
}
