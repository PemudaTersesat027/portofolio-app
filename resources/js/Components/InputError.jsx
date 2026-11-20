import { cn } from 'cn';

export default function InputError({ message, className, ...props }) {
    return message ? (
        <p className={cn('text-sm text-destructive', className)} {...props}>
            {message}
        </p>
    ) : null;
}
