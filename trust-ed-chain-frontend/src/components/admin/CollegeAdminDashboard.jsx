import { useEffect, useState } from 'react';
import { useStudentStore } from '../../store/student';

export default function CollegeAdminDashboard() {
  const [mentors, setMentors] = useState([{ id: 'men-101', name: 'Dr. Rao' }]);
  const [name, setName] = useState('');
  const { students, loans, fetchStudents, fetchLoans, adminUpdateSEF, adminApproveLoan } = useStudentStore();

  useEffect(() => {
    fetchStudents();
    fetchLoans();
  }, [fetchStudents, fetchLoans]);

  const bigLoans = loans.filter(l => l.isBigLoan && l.mentorApproved && !l.adminApproved);

  const addMentor = (e) => {
    e.preventDefault();
    if (!name) return;
    setMentors([{ id: `men-${Math.floor(Math.random()*1000)}`, name }, ...mentors]);
    setName('');
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Add Mentor</h3>
          <form onSubmit={addMentor} className="flex gap-2">
            <input className="input flex-1" placeholder="Mentor name" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="btn-primary" type="submit">Add</button>
          </form>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Mentors</h3>
          <div className="space-y-2">
            {mentors.map((m) => (
              <div key={m.id} className="flex items-center justify-between border border-gray-200 dark:border-gray-800 rounded-lg p-3">
                <div>
                  <div className="font-medium">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.id}</div>
                </div>
                <button className="btn-secondary" onClick={() => setMentors(mentors.filter(x => x.id !== m.id))}>Remove</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-4">
        <h3 className="font-semibold mb-3">Manage Student SEF</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="p-2">Student</th>
                <th className="p-2">Balance</th>
                <th className="p-2">Limit</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="p-2">{s.name}</td>
                  <td className="p-2">
                    <input className="input" type="number" defaultValue={s.sefBalance} onChange={(e) => { s.__newBalance = Number(e.target.value); }} />
                  </td>
                  <td className="p-2">
                    <input className="input" type="number" defaultValue={s.sefWithdrawalLimit} onChange={(e) => { s.__newLimit = Number(e.target.value); }} />
                  </td>
                  <td className="p-2">
                    <button className="btn-secondary" onClick={() => adminUpdateSEF({ studentId: s.id, sefBalance: s.__newBalance ?? s.sefBalance, sefWithdrawalLimit: s.__newLimit ?? s.sefWithdrawalLimit })}>Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card p-4">
        <h3 className="font-semibold mb-3">Big Loans Awaiting Approval</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {bigLoans.length === 0 && <div className="text-sm text-gray-500">No big loans pending.</div>}
          {bigLoans.map((l) => (
            <div key={l.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{l.purpose}</div>
                <div className="text-xs text-gray-500">₹ {l.amount.toLocaleString()} • {l.college}</div>
              </div>
              <button className="btn-primary" onClick={() => adminApproveLoan(l.id)}>Approve</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
