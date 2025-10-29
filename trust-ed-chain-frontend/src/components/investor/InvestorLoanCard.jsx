export default function InvestorLoanCard({ loan, onFund }) {
  return (
    <div className="card p-4">
      <div className="font-semibold">{loan.purpose}</div>
      <div className="text-sm text-gray-500">{loan.id}</div>
      <div className="mt-2 text-lg font-semibold">₹ {loan.amount.toLocaleString()}</div>
      <div className="mt-2 text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 inline-block">{loan.status}</div>
      <div className="mt-4">
        <button className="btn-primary" onClick={onFund} disabled={loan.status === 'funded'}>
          {loan.status === 'funded' ? 'Funded' : 'Fund Loan'}
        </button>
      </div>
    </div>
  );
}
