import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children, direction = 'up' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.15 });

        if (ref.current) {
            observer.observe(ref.current)
        };

        return () => observer.disconnect();
    }, []);

    const getVariant = () => {
        switch (direction) {
            case 'left':
                return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20';
            case 'right':
                return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20';
            case 'up':
            default:
                return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20';
        }
    };

    return (
        <div ref={ref} className={`transition-all duration-1000 ease-out ${getVariant()}`}>
            {children}
        </div>
    );
};

export default ScrollReveal;