import { useEffect } from 'react';
import { useStudentStore } from '../store/student';
import TrustScoreChart from '../components/trust/TrustScoreChart.jsx';
import TrustBreakdownCard from '../components/trust/TrustBreakdownCard.jsx';

export default function Profile() {
  const { student, fetchStudent } = useStudentStore();
  useEffect(() => { fetchStudent('stu-001'); }, [fetchStudent]);

  return (
    <div className="container-responsive space-y-6">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-4">
          <div className="text-sm text-gray-500">Name</div>
          <div className="text-xl font-semibold">{student?.name}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">Email</div>
          <div className="text-xl font-semibold">{student?.email}</div>
        </div>
        <div className="card p-4">
          <div className="text-sm text-gray-500">CGPA</div>
          <div className="text-xl font-semibold">{student?.cgpa}</div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Trust Score</h3>
          <TrustScoreChart score={student?.trustScore ?? 0} />
        </div>
        <TrustBreakdownCard breakdown={student?.trustBreakdown ?? {}} />
      </div>
    </div>
  );
}
