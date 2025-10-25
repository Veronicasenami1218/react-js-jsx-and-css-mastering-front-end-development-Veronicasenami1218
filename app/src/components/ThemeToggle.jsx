import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      title="Toggle theme"
      aria-label="Toggle theme"
      className={`inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm motion-safe:transition-colors duration-200 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 ${className}`}
    >
      <span className="relative inline-block h-4 w-4">
        {/* Sun */}
        <span
          className={`absolute inset-0 rounded-full bg-yellow-400 shadow-sm motion-safe:transition-transform duration-300 ${isDark ? 'scale-0 rotate-90' : 'scale-100 rotate-0'}`}
        />
        {/* Moon */}
        <span
          className={`absolute inset-0 rounded-full bg-slate-200 dark:bg-slate-100 motion-safe:transition-transform duration-300 ${isDark ? 'scale-100 rotate-0' : 'scale-0 -rotate-90'}`}
          style={{ boxShadow: isDark ? 'inset -6px 0 0 0 #0f172a' : 'none' }}
        />
      </span>
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
}
