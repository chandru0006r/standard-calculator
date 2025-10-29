import Modal from './ui/Modal';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '../store/useAppStore';
import toast from 'react-hot-toast';

const schema = z.object({ amount: z.coerce.number().min(100, 'Minimum ₹100') });

export default function FundLoanModal({ open, onClose, loan }) {
  const { fundLoan } = useAppStore();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      await fundLoan(loan.id, Number(values.amount));
      toast.success('Mock transaction confirmed on-chain');
      reset();
      onClose();
    } catch {
      toast.error('Funding failed');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Fund Loan" actions={
      <>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button form="fund-loan-form" className="btn-primary" disabled={isSubmitting}>Fund</button>
      </>
    }>
      <p className="text-sm text-gray-500">Funding for loan <span className="font-medium">{loan?.id}</span></p>
      <form id="fund-loan-form" onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div>
          <label className="label" htmlFor="amount">Amount (₹)</label>
          <input id="amount" type="number" className="input" {...register('amount')} />
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
        </div>
      </form>
    </Modal>
  );
}
