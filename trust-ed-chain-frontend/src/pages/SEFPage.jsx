import Layout from '../components/Layout/Layout';
import SEFCard from '../components/SEFCard';
import RepaymentTimeline from '../components/RepaymentTimeline';

export default function SEFPage() {
  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <SEFCard />
        </div>
        <RepaymentTimeline />
      </div>
    </Layout>
  );
}
