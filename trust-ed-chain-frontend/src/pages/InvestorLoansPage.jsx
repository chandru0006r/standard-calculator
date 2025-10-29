import Layout from '../components/Layout/Layout';
import InvestorLoanCard from '../components/InvestorLoanCard';
import LoanApplicationForm from '../components/LoanApplicationForm';
import { useAppStore } from '../store/useAppStore';
import { useEffect } from 'react';

export default function InvestorLoansPage() {
  const { user, loans, bootstrap } = useAppStore();
  useEffect(() => { bootstrap(); }, []);
  const role = user?.role || 'student';
  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-3">
        {role === 'student' ? (
          <div>
            <LoanApplicationForm />
          </div>
        ) : (
          <div className="card">
            <h3 className="text-lg font-semibold">Investor Panel</h3>
            <p className="text-sm text-gray-500">Browse and fund approved loans</p>
          </div>
        )}
        <div className="md:col-span-2 grid gap-4">
          {loans.map(ln => (
            <InvestorLoanCard key={ln.id} loan={ln} studentName={ln.studentId} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
