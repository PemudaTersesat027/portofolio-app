import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { cn } from 'cn';

export default function Modal({
    children,
    show = false,
    maxWidth = '2xl',
    closeable = true,
    onClose = () => {},
    title = 'Dialog',
    description = 'Dialog window',
}) {
    const maxWidthClass = {
        sm: 'sm:max-w-sm',
        md: 'sm:max-w-md',
        lg: 'sm:max-w-lg',
        xl: 'sm:max-w-xl',
        '2xl': 'sm:max-w-2xl',
    }[maxWidth];

    return (
        <Dialog
            open={show}
            onOpenChange={(open) => {
                if (!open && closeable) {
                    onClose();
                }
            }}
        >
            <DialogContent
                showCloseButton={closeable}
                className={cn('p-6', maxWidthClass)}
            >
                <DialogTitle className="sr-only">{title}</DialogTitle>
                <DialogDescription className="sr-only">
                    {description}
                </DialogDescription>
                {children}
            </DialogContent>
        </Dialog>
    );
}
