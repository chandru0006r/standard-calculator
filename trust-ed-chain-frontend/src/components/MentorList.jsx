import { useState } from 'react';

export default function MentorList() {
  const [mentors, setMentors] = useState([
    { id: 'men-001', name: 'Dr. Meera Iyer' },
    { id: 'men-002', name: 'Prof. Raj Patel' },
  ]);
  const [name, setName] = useState('');

  const addMentor = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setMentors([{ id: `men-${Date.now()}`, name: name.trim() }, ...mentors]);
    setName('');
  };

  return (
    <div className="card space-y-3">
      <h3 className="text-lg font-semibold">Mentors</h3>
      <form onSubmit={addMentor} className="flex gap-2">
        <input className="input" placeholder="Add mentor" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="btn-primary">Add</button>
      </form>
      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {mentors.map(m => (
          <li key={m.id} className="py-2 text-sm">{m.name}</li>
        ))}
      </ul>
    </div>
  );
}
