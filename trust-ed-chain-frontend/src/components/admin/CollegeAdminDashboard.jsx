import { useState } from 'react';

export default function CollegeAdminDashboard() {
  const [mentors, setMentors] = useState([{ id: 'men-101', name: 'Dr. Rao' }]);
  const [name, setName] = useState('');

  const addMentor = (e) => {
    e.preventDefault();
    if (!name) return;
    setMentors([{ id: `men-${Math.floor(Math.random()*1000)}`, name }, ...mentors]);
    setName('');
  };

  return (
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
  );
}
