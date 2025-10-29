import Layout from '../components/Layout/Layout';
import { useAppStore } from '../store/useAppStore';
import CreateCommunityForm from '../components/CreateCommunityForm';
import CommunityCard from '../components/CommunityCard';
import { useEffect } from 'react';

export default function CommunityFundPage() {
  const { communities, bootstrap } = useAppStore();
  useEffect(() => { bootstrap(); }, []);
  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <CreateCommunityForm />
        </div>
        <div className="md:col-span-2 space-y-4">
          {communities.map(c => (<CommunityCard key={c.id} community={c} />))}
        </div>
      </div>
    </Layout>
  );
}
