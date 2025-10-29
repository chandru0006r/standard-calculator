import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const ROLES = ['student', 'mentor', 'admin', 'investor'];

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [role, setRole] = useState('student');
  const [name, setName] = useState('Demo User');

  const onSubmit = async (e) => {
    e.preventDefault();
    await login({ role, name, id: role === 'student' ? 'stu-001' : `${role}-0001` });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gray-50 dark:bg-gray-950 p-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm card p-6">
        <h1 className="text-2xl font-semibold mb-4">Welcome to Trust-Ed-Chain</h1>
        <label className="label" htmlFor="name">Name</label>
        <input id="name" className="input mb-3" value={name} onChange={(e) => setName(e.target.value)} />
        <label className="label" htmlFor="role">Role</label>
        <select id="role" className="input mb-6" value={role} onChange={(e) => setRole(e.target.value)}>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
        <button className="btn-primary w-full" type="submit">Login</button>
      </form>
    </div>
  );
}
