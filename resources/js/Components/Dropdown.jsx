import { Link } from '@inertiajs/react';
import { cn } from 'cn';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Dropdown = ({ children }) => {
    return <DropdownMenu>{children}</DropdownMenu>;
};

const Trigger = ({ children }) => {
    return <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>;
};

const Content = ({
    align = 'end',
    width = '48',
    contentClasses = '',
    children,
    ...props
}) => {
    return (
        <DropdownMenuContent
            align={align}
            className={cn(width === '48' && 'w-48', contentClasses)}
            {...props}
        >
            {children}
        </DropdownMenuContent>
    );
};

const DropdownLink = ({ className, children, ...props }) => {
    return (
        <DropdownMenuItem asChild className={className}>
            <Link {...props}>{children}</Link>
        </DropdownMenuItem>
    );
};

Dropdown.Trigger = Trigger;
Dropdown.Content = Content;
Dropdown.Link = DropdownLink;

export default Dropdown;
