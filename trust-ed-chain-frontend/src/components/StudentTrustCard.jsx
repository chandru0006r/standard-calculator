import TrustScoreChart from './TrustScoreChart';
import TrustBreakdownCard from './TrustBreakdownCard';

export default function StudentTrustCard({ student }) {
  const breakdown = {
    academics: Math.round((student.cgpa / 10) * 40),
    repayments: Math.min(40, Math.round(student.trustScore * 0.3)),
    mentor: 100 - Math.round((student.cgpa / 10) * 40) - Math.min(40, Math.round(student.trustScore * 0.3)),
  };
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <TrustScoreChart score={student.trustScore} />
      <TrustBreakdownCard breakdown={breakdown} />
    </div>
  );
}
