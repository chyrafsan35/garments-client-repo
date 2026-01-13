import React, { useEffect, useRef, useState } from 'react';

const ScrollReveal = ({ children }) => {

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

    return (
        <div ref={ref} className={`transition-all duration-1000 ease-out 
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
            {children}
        </div>
    );
};

export default ScrollReveal;