import MicroPollCard from './MicroPollCard';
import { useAppStore } from '../store/useAppStore';

export default function CommunityCard({ community }) {
  const { user, joinCommunity } = useAppStore();
  const isMember = community.members.includes(user?.id);
  return (
    <div className="card space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{community.name}</h3>
          <p className="text-sm text-gray-500">{community.description}</p>
        </div>
        {!isMember ? (
          <button className="btn-primary" onClick={() => joinCommunity(community.id)}>Join</button>
        ) : (
          <span className="rounded-md bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">Member</span>
        )}
      </div>
      <div>
        <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-300">Micro Polls</div>
        <div className="grid gap-3 sm:grid-cols-2">
          {community.microPolls.map(p => (
            <MicroPollCard key={p.id} poll={p} />
          ))}
          {community.microPolls.length === 0 && <p className="text-sm text-gray-500">No polls yet.</p>}
        </div>
      </div>
    </div>
  );
}
