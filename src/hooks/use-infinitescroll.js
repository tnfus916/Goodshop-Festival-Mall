import { useCallback, useEffect, useRef } from 'react';

function useInfiniteScroll(onIntersect) {
    const ref = useRef(null);

    const handleIntersect = useCallback(([entry], observer) => {
        if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            onIntersect(entry, observer);
            // observer.observe(entry.target)
        }
    }, [onIntersect]);

    useEffect(() => {
        let observer;
        if (ref.current) {
            observer = new IntersectionObserver(handleIntersect, { threshold: 0.6, });
            observer.observe(ref.current);
        }
        return () => observer && observer.disconnect();
    }, [ref, handleIntersect]);

    return ref;
}

export default useInfiniteScroll;

