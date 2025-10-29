import { NavLink } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', roles: ['student','mentor','admin','investor'] },
  { to: '/sef', label: 'SEF', roles: ['student'] },
  { to: '/community', label: 'Community', roles: ['student'] },
  { to: '/investor', label: 'Investor', roles: ['investor','student'] },
  { to: '/mentor', label: 'Mentor', roles: ['mentor'] },
  { to: '/college-admin', label: 'College Admin', roles: ['admin'] },
  { to: '/profile', label: 'Profile', roles: ['student','mentor','admin','investor'] },
];

export default function Sidebar() {
  const { user } = useAppStore();
  const role = user?.role || 'student';
  return (
    <aside className="hidden w-64 shrink-0 border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-950 md:block">
      <div className="mb-6 text-xl font-bold">Trust-Ed-Chain</div>
      <nav className="space-y-1">
        {navItems
          .filter(item => item.roles.includes(role))
          .map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm font-medium ${isActive ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300' : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}`}
            >
              {item.label}
            </NavLink>
          ))}
      </nav>
    </aside>
  );
}
