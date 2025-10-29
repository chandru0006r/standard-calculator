import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import Layout from '../components/Layout/Layout';
import SEFCard from '../components/SEFCard';
import RepaymentTimeline from '../components/RepaymentTimeline';
import StudentTrustCard from '../components/StudentTrustCard';
import InvestorLoanCard from '../components/InvestorLoanCard';

export default function Dashboard() {
  const { user, student, loans, bootstrap, communities } = useAppStore();

  useEffect(() => { bootstrap(); }, []);

  const role = user?.role || 'student';

  return (
    <Layout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Welcome{student ? `, ${student.name.split(' ')[0]}` : ''}</h2>

        {role === 'student' && (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2 space-y-4">
                <SEFCard />
                <StudentTrustCard student={student || { cgpa: 0, trustScore: 0 }} />
              </div>
              <RepaymentTimeline />
            </div>
            <div className="card">
              <h3 className="mb-2 text-lg font-semibold">Your Communities</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">{communities.length} communities joined</div>
            </div>
          </>
        )}

        {role === 'investor' && (
          <div className="grid gap-4 md:grid-cols-2">
            {loans.map(ln => (
              <InvestorLoanCard key={ln.id} loan={ln} studentName={ln.studentId} />
            ))}
          </div>
        )}

        {role === 'mentor' && (
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Loans Pending Approval</h3>
            <ul className="list-disc pl-5 text-sm">
              {loans.filter(l => l.status === 'pending').map(l => (
                <li key={l.id}>Loan {l.id} for ₹{l.amount} - {l.purpose}</li>
              ))}
            </ul>
          </div>
        )}

        {role === 'admin' && (
          <div className="card">
            <h3 className="mb-2 text-lg font-semibold">Quick Analytics</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-indigo-50 p-4 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
                <div className="text-sm">Students</div>
                <div className="text-2xl font-semibold">2</div>
              </div>
              <div className="rounded-lg bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                <div className="text-sm">Communities</div>
                <div className="text-2xl font-semibold">{communities.length}</div>
              </div>
              <div className="rounded-lg bg-amber-50 p-4 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                <div className="text-sm">Loans</div>
                <div className="text-2xl font-semibold">{loans.length}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
