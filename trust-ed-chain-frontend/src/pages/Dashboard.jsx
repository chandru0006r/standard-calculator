import { useEffect } from 'react';
import { useStudentStore } from '../store/student';
import { useAuthStore } from '../store/auth';
import TrustScoreChart from '../components/trust/TrustScoreChart.jsx';

export default function Dashboard() {
  const { role } = useAuthStore();
  const { student, loans, fetchStudent, fetchLoans } = useStudentStore();

  useEffect(() => {
    if (role === 'student') fetchStudent('stu-001');
    fetchLoans();
  }, [role, fetchStudent, fetchLoans]);

  return (
    <div className="container-responsive space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {role === 'student' && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="text-sm text-gray-500">SEF Balance</div>
            <div className="text-2xl font-semibold mt-1">₹ {student?.sefBalance?.toLocaleString() ?? '—'}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-gray-500">CGPA</div>
            <div className="text-2xl font-semibold mt-1">{student?.cgpa ?? '—'}</div>
          </div>
          <div className="card p-4">
            <div className="text-sm text-gray-500">Mentor</div>
            <div className="text-2xl font-semibold mt-1">{student?.mentorId ?? '—'}</div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="card p-4 lg:col-span-1">
          <h3 className="font-semibold mb-3">Trust Score</h3>
          <TrustScoreChart score={student?.trustScore ?? 0} />
        </div>
        <div className="card p-4 lg:col-span-2">
          <h3 className="font-semibold mb-3">Recent Loans</h3>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {loans.slice(0,5).map((l) => (
              <div key={l.id} className="py-2 flex items-center justify-between">
                <div>
                  <div className="font-medium">{l.purpose}</div>
                  <div className="text-xs text-gray-500">{l.id}</div>
                </div>
                <div className="text-sm">₹ {l.amount.toLocaleString()} <span className="ml-2 px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">{l.status}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
