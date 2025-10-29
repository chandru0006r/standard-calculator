import Layout from '../components/Layout/Layout';
import { useAppStore } from '../store/useAppStore';
import { useEffect } from 'react';

export default function MentorDashboard() {
  const { loans, bootstrap } = useAppStore();
  useEffect(() => { bootstrap(); }, []);
  const pending = loans.filter(l => l.status === 'pending');
  const approved = loans.filter(l => l.status === 'approved');
  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card">
          <h3 className="mb-2 text-lg font-semibold">Pending Approvals</h3>
          <ul className="list-disc pl-5 text-sm">
            {pending.map(l => (<li key={l.id}>Loan {l.id} - ₹{l.amount} for {l.purpose}</li>))}
            {pending.length === 0 && <p className="text-sm text-gray-500">No pending loans.</p>}
          </ul>
        </div>
        <div className="card">
          <h3 className="mb-2 text-lg font-semibold">Approved Loans</h3>
          <ul className="list-disc pl-5 text-sm">
            {approved.map(l => (<li key={l.id}>Loan {l.id} - ₹{l.amount} for {l.purpose}</li>))}
            {approved.length === 0 && <p className="text-sm text-gray-500">No approved loans.</p>}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
