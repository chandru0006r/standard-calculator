import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from './ui/Modal';
import { useAppStore } from '../store/useAppStore';
import toast from 'react-hot-toast';

const schema = z.object({
  amount: z.number({ invalid_type_error: 'Enter a valid amount' }).positive('Amount must be positive'),
});

export default function WithdrawModal({ open, onClose }) {
  const { student, withdrawFromSEF } = useAppStore();
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { amount: '' },
  });

  const onSubmit = async (values) => {
    const amount = Number(values.amount);
    if (amount > (student?.sefWithdrawalLimit || 0)) {
      toast.error('Exceeds semester limit');
      return;
    }
    if (amount > (student?.sefBalance || 0)) {
      toast.error('Exceeds current balance');
      return;
    }
    try {
      await withdrawFromSEF(amount);
      toast.success('Withdrawal successful');
      reset();
      onClose();
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed');
    }
  };

  return (
    <Modal open={open} onClose={onClose} title="Withdraw from SEF" actions={
      <>
        <button className="btn-secondary" onClick={onClose}>Cancel</button>
        <button form="withdraw-form" className="btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Withdraw'}
        </button>
      </>
    }>
      <form id="withdraw-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label" htmlFor="amount">Amount (₹)</label>
          <input id="amount" type="number" className="input" {...register('amount', { valueAsNumber: true })} />
          {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
        </div>
        <p className="text-xs text-gray-500">Limit this semester: ₹{(student?.sefWithdrawalLimit || 0).toLocaleString('en-IN')}</p>
      </form>
    </Modal>
  );
}
