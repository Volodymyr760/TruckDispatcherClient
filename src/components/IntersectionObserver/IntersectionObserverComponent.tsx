import { useRef, useEffect, FC } from 'react'
import { IntersectionObserverProps } from './types'

export const IntersectionObserverComponent: FC<IntersectionObserverProps> = ({
    onIntersection,
    options,
}) => {
    const targetRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            onIntersection(entries);
        }, options);

        if (targetRef.current) observer.observe(targetRef.current);

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (targetRef.current) observer.unobserve(targetRef.current);
        };
    }, [onIntersection, options]);

    return <div ref={targetRef} style={{ height: '50px' }} />;
}
