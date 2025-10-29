import { useAppStore } from '../store/useAppStore';

export default function RepaymentTimeline() {
  const { sefTransactions } = useAppStore();
  return (
    <div className="card">
      <h3 className="mb-3 text-lg font-semibold">SEF Activity</h3>
      <ul className="space-y-2">
        {sefTransactions.map(tx => (
          <li key={tx.id} className="flex items-center justify-between text-sm">
            <div className="capitalize text-gray-600 dark:text-gray-400">{tx.type}</div>
            <div className={tx.type === 'repayment' ? 'text-emerald-600' : 'text-rose-600'}>
              {tx.type === 'repayment' ? '+' : '-'}₹{tx.amount}
            </div>
            <div className="text-gray-500">{new Date(tx.date).toLocaleDateString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
