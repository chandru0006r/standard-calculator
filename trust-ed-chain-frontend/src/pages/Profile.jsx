import Layout from '../components/Layout/Layout';
import { useAppStore } from '../store/useAppStore';
import StudentTrustCard from '../components/StudentTrustCard';

export default function Profile() {
  const { student } = useAppStore();
  return (
    <Layout>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card">
          <h3 className="mb-2 text-lg font-semibold">Profile</h3>
          <div className="space-y-1 text-sm">
            <div><span className="text-gray-500">Name:</span> <span className="font-medium">{student?.name}</span></div>
            <div><span className="text-gray-500">Email:</span> <span className="font-medium">{student?.email}</span></div>
            <div><span className="text-gray-500">College:</span> <span className="font-medium">{student?.college}</span></div>
            <div><span className="text-gray-500">CGPA:</span> <span className="font-medium">{student?.cgpa}</span></div>
          </div>
        </div>
        <div className="md:col-span-2">
          {student && <StudentTrustCard student={student} />}
        </div>
      </div>
    </Layout>
  );
}
