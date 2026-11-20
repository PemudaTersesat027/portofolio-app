import { Label } from '@/components/ui/label';

export default function InputLabel({ value, children, ...props }) {
    return <Label {...props}>{value ?? children}</Label>;
}
