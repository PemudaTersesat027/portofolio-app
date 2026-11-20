import { Link } from '@inertiajs/react';
import { cn } from 'cn';

export default function ResponsiveNavLink({
    active = false,
    className,
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={cn(
                'flex w-full items-start border-l-4 py-2 pe-4 ps-3 text-base font-medium transition-colors focus:outline-none',
                active
                    ? 'border-primary bg-accent text-accent-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border hover:bg-accent hover:text-accent-foreground',
                className,
            )}
        >
            {children}
        </Link>
    );
}
