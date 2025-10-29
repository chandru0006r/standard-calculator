import { useState } from 'react';
import FundLoanModal from './FundLoanModal';

export default function InvestorLoanCard({ loan, studentName }) {
  const [open, setOpen] = useState(false);
  const progress = Math.min(100, Math.round((loan.funded / loan.amount) * 100));
  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">Student</div>
          <div className="font-semibold">{studentName}</div>
        </div>
        <div className="text-sm">{loan.status}</div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-gray-500">Amount</div>
          <div className="font-medium">₹{loan.amount.toLocaleString('en-IN')}</div>
        </div>
        <div>
          <div className="text-gray-500">Funded</div>
          <div className="font-medium">₹{loan.funded.toLocaleString('en-IN')}</div>
        </div>
        <div>
          <div className="text-gray-500">Interest</div>
          <div className="font-medium">{loan.investorInterest}%</div>
        </div>
      </div>
      <div>
        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
          <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-1 text-xs text-gray-500">{progress}% funded</div>
      </div>
      <div className="flex justify-end">
        <button className="btn-primary" onClick={() => setOpen(true)}>Fund</button>
      </div>
      <FundLoanModal open={open} onClose={() => setOpen(false)} loan={loan} />
    </div>
  );
}
