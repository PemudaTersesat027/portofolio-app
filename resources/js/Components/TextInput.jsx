import { Input } from '@/components/ui/input';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { isFocused = false, ...props },
    ref,
) {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => inputRef.current, []);

    useEffect(() => {
        if (isFocused) {
            inputRef.current?.focus();
        }
    }, [isFocused]);

    return <Input ref={inputRef} {...props} />;
});
