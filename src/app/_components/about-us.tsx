import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

const stats = [
    {
        number: "8",
        subtitle: "Years experience",
        description: "Improving homes with expert craftsmanship for years",
    },
    {
        number: "26",
        subtitle: "Projects completed",
        description:
            "Over 250 successful projects delivered with quality and care",
    },
    {
        number: "30",
        subtitle: "Skilled tradespeople",
        description: "Our team of 30 experts ensures top-quality results",
    },
    {
        number: "100%",
        subtitle: "Client satisfaction",
        description:
            "All of our clients are satisfied with our work and service",
    },
];

const images = [
    "/assets/about-us-1.png",
    "/assets/about-us-2.png",
    "/assets/about-us-3.png",
    "/assets/about-us-4.png",
    "/assets/about-us-5.png",
];

export default function AboutUs() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [headerInView, setHeaderInView] = useState<boolean>(false);
    const [statsInView, setStatsInView] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    const goToSlide = (index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const currentImage = `/assets/about-us-${currentIndex + 1}.png`;
    const nextImage = images[(currentIndex + 1) % images.length];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeaderInView(true);
                }
            },
            { threshold: 0.3, rootMargin: "-50px 0px -50px 0px" }
        );

        const statsObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsInView(true);
                }
            },
            { threshold: 0.2, rootMargin: "-100px 0px -100px 0px" }
        );

        if (headerRef.current) headerObserver.observe(headerRef.current);
        if (statsRef.current) statsObserver.observe(statsRef.current);

        return () => {
            headerObserver.disconnect();
            statsObserver.disconnect();
        };
    }, []);

    return (
        <section className="w-full flex flex-col">
            <div className=" py-[120px] max-w-[1440px] mx-auto xs:px-10 lg:px-0">
                <div
                    ref={headerRef}
                    className="flex xs:flex-col lg:flex-row items-start gap-20 lg:px-10 2xl:px-20"
                >
                    <div className="lg:w-1/2 xs:w-full flex flex-col justify-center gap-1">
                        <div
                            className={`w-fit text-white px-3 py-2 rounded-3xl bg-[#28282C] transition-all duration-300 ease-out ${
                                headerInView
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                            }`}
                            style={{ transitionDelay: "200ms" }}
                        >
                            <p className="font-semibold">About us</p>
                        </div>
                        <div className="overflow-hidden">
                            <p
                                className={`text-5xl leading-[55px] tracking-[-0.8px] font-medium text-[#101014] transition-all duration-1000 ease-out ${
                                    headerInView
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                                style={{ transitionDelay: "400ms" }}
                            >
                                Home <br /> Improvement <br /> Specialists
                            </p>
                        </div>
                    </div>
                    <div className="lg:w-1/2 xs:w-full">
                        <p
                            className={`leading-[170%] text-xl text-[#3D3D47] tracking-[-0.3px] transition-all duration-1000 ease-out ${
                                headerInView
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-12"
                            }`}
                            style={{ transitionDelay: "800ms" }}
                        >
                            Welcome to LifetimeArt, your trusted home
                            improvement experts, dedicated to transforming homes
                            with precision and care. With years of experience in
                            building kitchens, bathrooms, garages, and more, we
                            take pride in delivering top-quality craftsmanship
                            and a seamless customer experience. Our mission is
                            to bring your vision to life while ensuring clear
                            communication and expert guidance at every step.
                            Let&apos;s create a home you&apos;ll love!
                        </p>
                    </div>
                </div>
            </div>

            <div className="lg:block hidden overflow-hidden">
                <div className="flex items-center gap-8 animate-scroll">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={`first-${i}`}
                            style={{
                                transitionDelay: `${(i % 5) * 200}ms`,
                            }}
                            className={`relative w-[400px] h-[500px] aspect-[4/5] flex-shrink-0 transition-all duration-1000 ease-out ${
                                isVisible
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 translate-x-[-100px]"
                            }`}
                        >
                            <Image
                                src={`/assets/about-us-${i + 1}.png`}
                                alt={`about-us-image-${i + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={`second-${i}`}
                            className="relative w-[400px] h-[500px] aspect-[4/5] flex-shrink-0"
                        >
                            <Image
                                src={`/assets/about-us-${i + 1}.png`}
                                alt={`about-us-image-duplicate-${i + 1}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-full lg:hidden">
                <div className="relative overflow-hidden">
                    <div
                        className={`transition-all duration-500 ease-out ${
                            isTransitioning
                                ? "opacity-75 scale-98"
                                : "opacity-100 scale-100"
                        }`}
                    >
                        <div className="flex gap-4 px-4">
                            <div className="w-[320px] aspect-[1/1.5] relative overflow-hidden flex-shrink-0">
                                <Image
                                    src={currentImage}
                                    alt="work-image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="w-[320px] aspect-[1/1.5] relative overflow-hidden flex-shrink-0 opacity-60">
                                <Image
                                    src={nextImage}
                                    alt="next-work-image"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-2 items-center mt-6">
                    {[...Array(5)].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goToSlide(i)}
                            className={`rounded-full w-3 h-3 transition-all duration-300 ${
                                i === currentIndex
                                    ? "bg-[#101014] scale-125"
                                    : "bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="w-full max-w-[1440px] mx-auto py-[120px] xs:px-10 lg:px-0">
                <div
                    ref={statsRef}
                    className="2xl:flex gap-[120px] 2xl:items-center grid xs:grid-cols-1 lg:grid-cols-2 2xl:px-20 lg:px-10"
                >
                    {stats.map((val, i) => (
                        <div
                            key={i}
                            className={`2xl:max-w-[230px] flex flex-col justify-center gap-2 text-[#101014] transition-all duration-300 ease-out ${
                                statsInView
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-12"
                            }`}
                            style={{
                                transitionDelay: `${i * 150}ms`,
                            }}
                        >
                            <p className="font-light text-7xl leading-[120%] tracking-[-0.8px]">
                                {val.number}
                            </p>
                            <div className="flex flex-col justify-center gap-2">
                                <p className="font-semibold text-xl tracking-[-0.2px] leading-[30px]">
                                    {val.subtitle}
                                </p>
                                <p className="leading-[150%] tracking-[-0.1px] text-[#3D3D47]">
                                    {val.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-${(400 + 32) * 5}px);
                    }
                }

                .animate-scroll {
                    animation: scroll 20s linear infinite;
                    width: ${(400 + 32) * 10}px;
                }
            `}</style>
        </section>
    );
}
