import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

const navItem = (
  to,
  label,
  roles = ['student', 'mentor', 'admin', 'investor']
) => ({ to, label, roles });

const NAV_ITEMS = [
  navItem('/dashboard', 'Dashboard'),
  navItem('/sef', 'SEF', ['student']),
  navItem('/community', 'Community Fund', ['student']),
  navItem('/investor', 'Investor', ['investor', 'admin']),
  navItem('/mentor', 'Mentor', ['mentor']),
  navItem('/college-admin', 'College Admin', ['admin']),
  navItem('/profile', 'Profile'),
];

export default function Sidebar() {
  const role = useAuthStore((s) => s.role);
  return (
    <aside className="hidden md:flex md:flex-col w-64 p-4 gap-2 border-r border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur">
      <div className="text-xl font-semibold mb-2">Trust-Ed-Chain</div>
      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.filter((n) => n.roles.includes(role || 'student')).map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`
            }
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
      <div className="text-xs text-gray-500">v0.1.0</div>
    </aside>
  );
}
