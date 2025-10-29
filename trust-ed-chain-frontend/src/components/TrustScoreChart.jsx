import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

export default function TrustScoreChart({ score = 0 }) {
  const value = Math.max(0, Math.min(100, score));
  const data = [{ name: 'trust', value, fill: value >= 80 ? '#10b981' : value >= 60 ? '#6366f1' : value >= 40 ? '#f59e0b' : '#ef4444' }];
  return (
    <div className="card flex items-center gap-4">
      <RadialBarChart
        width={140}
        height={140}
        cx={70}
        cy={70}
        innerRadius={48}
        outerRadius={70}
        barSize={16}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar background clockWise dataKey="value" />
        <text x={70} y={70} textAnchor="middle" dominantBaseline="middle" className="fill-current text-xl font-bold">
          {value}%
        </text>
      </RadialBarChart>
      <div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Trust Score</div>
        <div className="text-2xl font-semibold">{value}%</div>
        <div className="text-xs text-gray-500">{value >= 80 ? 'Excellent' : value >= 60 ? 'Good' : value >= 40 ? 'Fair' : 'Poor'}</div>
      </div>
    </div>
  );
}
