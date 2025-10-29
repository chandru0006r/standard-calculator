import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStudentStore } from '../../store/student';
import toast from 'react-hot-toast';

const schema = z.object({
  amount: z.coerce.number().min(1000, 'Min ₹1000').max(100000, 'Max ₹100000'),
  purpose: z.string().min(3, 'Purpose required'),
});

export default function LoanApplicationForm() {
  const applyLoan = useStudentStore((s) => s.applyLoan);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await applyLoan({ ...data, studentId: 'stu-001' });
    toast.success('Loan application submitted');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-4">
      <h3 className="font-semibold mb-3">Apply for Investor-backed Loan</h3>
      <label className="label">Amount (₹)</label>
      <input className="input" type="number" {...register('amount')} />
      {errors.amount && <p className="text-sm text-red-600">{errors.amount.message}</p>}
      <label className="label mt-3">Purpose</label>
      <input className="input" placeholder="e.g., Laptop repair" {...register('purpose')} />
      {errors.purpose && <p className="text-sm text-red-600">{errors.purpose.message}</p>}
      <div className="mt-4">
        <button className="btn-primary" type="submit" disabled={isSubmitting}>Submit</button>
      </div>
    </form>
  );
}
