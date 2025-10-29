import { useAppStore } from '../store/useAppStore';

export default function MicroPollCard({ poll }) {
  const { votePoll } = useAppStore();
  return (
    <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-800">
      <div className="text-sm font-medium">{poll.title}</div>
      <div className="mt-1 text-xs text-gray-500">₹{poll.amount} requested</div>
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <span>For: {poll.votesFor}</span>
        <span>Against: {poll.votesAgainst}</span>
      </div>
      <div className="mt-3 flex gap-2">
        <button className="btn-secondary" onClick={() => votePoll(poll.id, 'for')}>Vote For</button>
        <button className="btn-secondary" onClick={() => votePoll(poll.id, 'against')}>Vote Against</button>
      </div>
    </div>
  );
}
