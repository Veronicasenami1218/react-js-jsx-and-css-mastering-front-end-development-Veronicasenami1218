import PropTypes from 'prop-types';
import { cn } from '../utils/cn';

const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants = {
  primary: 'bg-primary text-primary-foreground hover:bg-blue-600 focus:ring-blue-400',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-slate-600 focus:ring-slate-400',
  danger: 'bg-danger text-danger-foreground hover:bg-red-700 focus:ring-red-400',
  ghost: 'bg-transparent hover:bg-slate-100 text-slate-900',
};

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-11 px-6 text-lg',
};

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

Button.propTypes = {
  as: PropTypes.elementType,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  children: PropTypes.node,
};
