export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-slate-600 dark:text-slate-300 flex items-center justify-between">
        <p>
          &copy; {new Date().getFullYear()} React + Tailwind Starter
        </p>
        <div className="flex gap-4">
          <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:underline text-slate-700 dark:text-slate-200">
            React Docs
          </a>
          <a href="https://tailwindcss.com/docs" target="_blank" rel="noreferrer" className="hover:underline text-slate-700 dark:text-slate-200">
            Tailwind Docs
          </a>
        </div>
      </div>
    </footer>
  );
}
