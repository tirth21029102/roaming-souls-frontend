export default function ProfileHoverCard({
  visible,
  friendsCount,
  visitedCitiesCount,
  currentCity,
  rank,
}) {
  return (
    <div
      className={`absolute bottom-full left-1/2 z-50 mb-3 w-64 -translate-x-1/2 rounded-xl bg-white p-4 shadow-xl ring-1 ring-green-200 transition-all duration-200 ease-out ${
        visible
          ? 'translate-y-0 scale-100 opacity-100'
          : 'pointer-events-none translate-y-3 scale-95 opacity-0'
      } `}
    >
      <div className="space-y-2 text-sm text-green-900">
        <InfoRow label="Friends" value={friendsCount ?? '—'} />
        <InfoRow label="Visited Cities" value={visitedCitiesCount ?? '—'} />
        <InfoRow label="Current Location" value={currentCity || 'Unknown'} />
        <InfoRow
          label="Rank"
          value={rank ? `#${rank}` : 'Unranked'}
          highlight
        />
      </div>
    </div>
  );
}

function InfoRow({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-green-700">{label}</span>
      <span
        className={`font-semibold ${
          highlight ? 'text-green-600' : 'text-green-900'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
