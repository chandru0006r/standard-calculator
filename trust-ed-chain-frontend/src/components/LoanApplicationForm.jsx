import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '../store/useAppStore';
import toast from 'react-hot-toast';

const schema = z.object({
  amount: z.coerce.number().min(500, 'Minimum ₹500').max(500000, 'Maximum ₹5,00,000'),
  purpose: z.string().min(10, 'Please describe the purpose'),
});

export default function LoanApplicationForm() {
  const { applyForLoan } = useAppStore();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await applyForLoan(values);
      toast.success('Loan application submitted');
      reset();
    } catch {
      toast.error('Failed to submit');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card space-y-3">
      <h3 className="text-lg font-semibold">Loan Application</h3>
      <div>
        <label className="label" htmlFor="amount">Amount (₹)</label>
        <input id="amount" type="number" className="input" {...register('amount')} />
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
      </div>
      <div>
        <label className="label" htmlFor="purpose">Purpose</label>
        <textarea id="purpose" className="input" rows={3} {...register('purpose')} />
        {errors.purpose && <p className="mt-1 text-sm text-red-600">{errors.purpose.message}</p>}
      </div>
      <div className="flex justify-end">
        <button className="btn-primary" disabled={isSubmitting}>Submit</button>
      </div>
    </form>
  );
}
