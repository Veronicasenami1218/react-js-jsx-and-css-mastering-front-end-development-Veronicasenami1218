import PropTypes from 'prop-types';
import { cn } from '../utils/cn';

export default function Card({ title, children, footer, className }) {
  return (
    <div className={cn('rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900', className)}>
      {title && (
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-slate-900 dark:text-slate-100 font-semibold">{title}</h3>
        </div>
      )}
      <div className="px-4 py-4 text-slate-700 dark:text-slate-300">{children}</div>
      {footer && <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">{footer}</div>}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  className: PropTypes.string,
};
