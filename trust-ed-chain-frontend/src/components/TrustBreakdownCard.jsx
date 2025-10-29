export default function TrustBreakdownCard({ breakdown = { academics: 0, repayments: 0, mentor: 0 } }) {
  return (
    <div className="card">
      <h3 className="mb-3 text-lg font-semibold">Trust Breakdown</h3>
      <div className="space-y-3">
        {Object.entries(breakdown).map(([label, value]) => (
          <div key={label} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="capitalize text-gray-600 dark:text-gray-400">{label}</span>
              <span className="font-medium">{value}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-800">
              <div
                className="h-2 rounded-full bg-indigo-500"
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
