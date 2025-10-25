import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const linkBase = 'px-3 py-2 rounded-md text-sm font-medium';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="text-blue-600 font-bold">React + Tailwind</div>
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/posts"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'}`
              }
            >
              Posts
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'}`
              }
            >
              Tasks
            </NavLink>
            <ThemeToggle className="ml-2" />
          </div>
        </div>
      </div>
    </nav>
  );
}
