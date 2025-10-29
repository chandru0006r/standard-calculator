import { useState } from 'react';
import WithdrawModal from './WithdrawModal';
import { useAppStore } from '../store/useAppStore';

export default function SEFCard() {
  const { student } = useAppStore();
  const [open, setOpen] = useState(false);
  if (!student) return null;
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">SEF Balance</div>
          <div className="text-3xl font-bold">₹{student.sefBalance.toLocaleString('en-IN')}</div>
          <div className="mt-1 text-xs text-gray-500">Withdrawal limit per semester: ₹{(student.sefWithdrawalLimit||0).toLocaleString('en-IN')}</div>
        </div>
        <button className="btn-primary" onClick={() => setOpen(true)}>Withdraw</button>
      </div>
      <WithdrawModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
