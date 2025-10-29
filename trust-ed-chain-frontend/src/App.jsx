import './index.css';
import AppRoutes from './routes/AppRoutes';
import ToastProvider from './components/ui/ToastProvider';
import './mock/mockApi';

export default function App() {
  return (
    <>
      <ToastProvider />
      <AppRoutes />
    </>
  );
}
