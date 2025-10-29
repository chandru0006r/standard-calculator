import { useEffect } from 'react';
import { useStudentStore } from '../store/student';
import MentorList from '../components/mentor/MentorList.jsx';

export default function MentorDashboard() {
  const { loans, fetchLoans } = useStudentStore();
  useEffect(() => { fetchLoans(); }, [fetchLoans]);

  const pending = loans.filter(l => !l.mentorApproved);

  return (
    <div className="container-responsive space-y-6">
      <h1 className="text-2xl font-semibold">Mentor Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Pending Loan Approvals</h3>
          <MentorList loans={pending} />
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Notes & Remarks</h3>
          <textarea className="input h-40" placeholder="Add remarks (UI only)" />
        </div>
      </div>
    </div>
  );
}
