import MentorList from './MentorList';

export default function CollegeAdminDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <div className="text-sm text-gray-500">Total SEF Allocations</div>
          <div className="text-2xl font-semibold">₹5,00,000</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500">Active Loans</div>
          <div className="text-2xl font-semibold">12</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500">Communities</div>
          <div className="text-2xl font-semibold">7</div>
        </div>
      </div>
      <MentorList />
    </div>
  );
}
