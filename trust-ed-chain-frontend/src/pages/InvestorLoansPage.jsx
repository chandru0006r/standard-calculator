import { useEffect, useState } from 'react';
import { useStudentStore } from '../store/student';
import InvestorLoanCard from '../components/investor/InvestorLoanCard.jsx';
import FundLoanModal from '../components/investor/FundLoanModal.jsx';
import ConnectWalletButton from '../components/web3/ConnectWalletButton.jsx';

export default function InvestorLoansPage() {
  const { loans, fetchLoans } = useStudentStore();
  const [selectedLoan, setSelectedLoan] = useState(null);

  useEffect(() => { fetchLoans(); }, [fetchLoans]);

  return (
    <div className="container-responsive space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Investor Loan Opportunities</h1>
        <ConnectWalletButton />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loans.filter(l => l.status !== 'repaid').map((l) => (
          <InvestorLoanCard key={l.id} loan={l} onFund={() => setSelectedLoan(l)} />
        ))}
      </div>

      <FundLoanModal loan={selectedLoan} open={!!selectedLoan} onClose={() => setSelectedLoan(null)} />
    </div>
  );
}
