import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  role: z.enum(['student','mentor','admin','investor']),
});

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAppStore();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: 'aarav@example.edu', role: 'student' },
  });

  const onSubmit = async (values) => {
    await login(values);
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-6 text-center text-2xl font-bold">Trust-Ed-Chain</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" className="input" placeholder="you@example.edu" {...register('email')} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="label" htmlFor="role">Role</label>
            <select id="role" className="input" {...register('role')}>
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="admin">College Admin</option>
              <option value="investor">Investor</option>
            </select>
            {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>}
          </div>
          <button className="btn-primary w-full" disabled={isSubmitting}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
