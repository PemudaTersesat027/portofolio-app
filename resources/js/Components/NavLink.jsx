import { Link } from '@inertiajs/react';
import { cn } from 'cn';

export default function NavLink({
    active = false,
    className,
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={cn(
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition-colors focus:outline-none',
                active
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
                className,
            )}
        >
            {children}
        </Link>
    );
}
