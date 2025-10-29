import { useTheme } from '../../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button aria-label="Toggle theme" onClick={toggleTheme} className="btn-secondary">
      {theme === 'dark' ? '🌙 Dark' : '🌞 Light'}
    </button>
  );
}
