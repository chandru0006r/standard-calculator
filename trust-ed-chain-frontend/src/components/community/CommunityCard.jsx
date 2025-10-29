import MicroPollCard from './MicroPollCard.jsx';

export default function CommunityCard({ community }) {
  return (
    <div className="card p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold">{community.name}</h3>
          <p className="text-sm text-gray-500">{community.description}</p>
        </div>
        <div className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">{community.members.length} members</div>
      </div>
      <div className="space-y-3">
        {community.posts.slice(0,3).map((p) => (
          <MicroPollCard key={p.id} poll={p} />
        ))}
      </div>
    </div>
  );
}
