import { useEffect } from 'react';
import { useStudentStore } from '../store/student';
import { useAuthStore } from '../store/auth';
import MentorList from '../components/mentor/MentorList.jsx';

export default function MentorDashboard() {
  const { user } = useAuthStore();
  const { loans, students, fetchLoans, fetchStudents } = useStudentStore();

  useEffect(() => {
    fetchLoans();
    if (user?.id) fetchStudents(user.id);
  }, [fetchLoans, fetchStudents, user?.id]);

  const pending = loans.filter(l => !l.mentorApproved);

  return (
    <div className="container-responsive space-y-6">
      <h1 className="text-2xl font-semibold">Mentor Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Assigned Students</h3>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {students.length === 0 && <div className="text-sm text-gray-500">No students assigned.</div>}
            {students.map((s) => (
              <div key={s.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-gray-500">{s.department} • {s.college}</div>
                </div>
                <div className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-800">Trust {s.trustScore}%</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Upcoming Loan Approvals</h3>
          <MentorList loans={pending} />
        </div>
      </div>

      <div className="card p-4">
        <h3 className="font-semibold mb-3">Notes & Remarks</h3>
        <textarea className="input h-40" placeholder="Add remarks (UI only)" />
      </div>
    </div>
  );
}
