import { NavLink } from 'react-router-dom';

const linkBase = 'px-3 py-2 rounded-md text-sm font-medium';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="text-blue-600 font-bold">React + Tailwind</div>
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100'}`
              }
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
