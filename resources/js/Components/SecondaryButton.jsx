import { Button } from '@/components/ui/button';

export default function SecondaryButton({ type = 'button', ...props }) {
    return <Button type={type} variant="outline" {...props} />;
}
