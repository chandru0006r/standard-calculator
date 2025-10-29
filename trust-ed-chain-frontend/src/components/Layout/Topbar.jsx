import ThemeToggle from '../ui/ThemeToggle';
import WalletConnect from '../ui/WalletConnect';
import { useAppStore } from '../../store/useAppStore';
import { Link } from 'react-router-dom';

export default function Topbar() {
  const { user, logout } = useAppStore();
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-950/60">
      <div className="container-responsive flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="text-lg font-semibold md:hidden">Trust-Ed-Chain</Link>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <WalletConnect />
          {user ? (
            <button className="btn-secondary" onClick={logout}>Logout</button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
