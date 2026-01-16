import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.3,
    });

    const stats = [
        { id: 1, target: 5000, label: "Happy Customers", suffix: "+" },
        { id: 2, target: 120, label: "Artisans & Craftsmen", suffix: "+" },
        { id: 3, target: 45, label: "New Styles Monthly", suffix: "+" },
        { id: 4, target: 98, label: "Positive Feedback", suffix: "%" },
    ];

    return (
        <div ref={ref} className="mt-16 bg-white py-12 rounded-3xl shadow-sm border border-gray-100 max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
                {stats.map((stat) => (
                    <div key={stat.id} className="text-center">
                        <h3 className="text-3xl md:text-5xl font-black text-primary mb-2">
                            {inView ? (
                                <CountUp
                                    start={0}
                                    end={stat.target}
                                    duration={2.5}
                                    suffix={stat.suffix}
                                />
                            ) : (
                                0
                            )}
                        </h3>
                        <p className="text-gray-500 font-medium text-sm md:text-base uppercase tracking-wide">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StatsSection;