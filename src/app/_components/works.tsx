import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const works = [
    {
        image: "/assets/work-image.png",
        person: "/assets/person.png",
        name: "Rachel Morgan",
        testimony:
            "LifetimeArt completely transformed our kitchen, making it both beautiful and highly functional. The craftsmanship was outstanding, and the team was professional and communicative throughout. We couldn't be happier with the result!",
        firstTag: "Kitchens",
        secondTag: "4 Weeks",
        title: "Modern kitchen refit",
        description:
            "This kitchen transformation brought sleek, modern design and enhanced  functionality to our client's home. We installed custom cabinetry, high-quality worktops, and state-of-the-art appliances, creating a stylish yet practical space perfect for cooking and entertaining. With attention to every detail, we delivered a kitchen that balances aesthetics and usability.",
    },
    {
        image: "/assets/work-image-3.png",
        person: "/assets/person-3.png",
        name: "Michael Turner",
        testimony:
            "The team at LifetimeArt did an amazing job on our garden path. It's sturdy, looks fantastic, and has completely transformed our outdoor space. They listened to our vision and delivered exactly what we wanted—highly recommended!",
        firstTag: "External Works",
        secondTag: "6 Weeks",
        title: "External garden path build",
        description:
            "Our team designed and built a durable, visually appealing garden path to enhance the outdoor space. Using premium materials, we created a seamless walkway that blends naturally with the landscape, providing both functionality and aesthetic charm. The result is a stylish, well-crafted path that elevates the overall garden design.",
    },
    {
        image: "/assets/work-image-2.png",
        person: "/assets/person-2.png",
        name: "Laura Davies",
        testimony:
            "LifetimeArt completely transformed our kitchen, making it both beautiful and highly functional. The craftsmanship was outstanding, and the team was professional and communicative throughout. We couldn't be happier with the result!",
        firstTag: "Kitchen",
        secondTag: "4 Weeks",
        title: "Bathroom renovation",
        description:
            "We revitalized this bathroom with a fresh, modern design, incorporating high-end tiling, sleek fixtures, and efficient lighting. The layout was optimized to maximize space, creating a luxurious and relaxing atmosphere. The final result is a beautifully crafted bathroom that enhances both comfort and functionality.",
    },
];

export default function Works() {
    const [headerInView, setHeaderInView] = useState<boolean>(false);
    const [cardsInView, setCardsInView] = useState<boolean[]>(
        new Array(works.length).fill(false)
    );
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [carouselInView, setCarouselInView] = useState<boolean>(false);

    const headerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    const AUTO_SLIDE_INTERVAL = 4000;

    const goToSlide = (index: number) => {
        if (isTransitioning || index === currentIndex) return;

        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => {
            setIsTransitioning(false);
            setTimeout(() => {
                setIsPaused(false);
            }, 2000);
        }, 300);
    };

    const handleMouseEnter = () => {
        setIsPaused(true);
    };

    const handleMouseLeave = () => {
        setIsPaused(false);
    };

    useEffect(() => {
        const startAutoSlide = () => {
            if (autoSlideRef.current) {
                clearInterval(autoSlideRef.current);
            }

            autoSlideRef.current = setInterval(() => {
                if (!isPaused) {
                    setIsTransitioning(true);

                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev + 1) % works.length);
                        setTimeout(() => {
                            setIsTransitioning(false);
                        }, 300);
                    }, 150);
                }
            }, AUTO_SLIDE_INTERVAL);
        };

        startAutoSlide();

        return () => {
            if (autoSlideRef.current) {
                clearInterval(autoSlideRef.current);
            }
        };
    }, [isPaused]);

    const currentWork = works[currentIndex];

    useEffect(() => {
        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeaderInView(true);
                }
            },
            { threshold: 0.3, rootMargin: "-50px 0px -50px 0px" }
        );

        const carouselObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setCarouselInView(true);
                }
            },
            { threshold: 0.2, rootMargin: "-100px 0px -100px 0px" }
        );

        const cardObservers = cardRefs.current.map((cardRef, index) => {
            if (!cardRef) return null;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setCardsInView((prev) => {
                            const newState = [...prev];
                            newState[index] = true;
                            return newState;
                        });
                    }
                },
                {
                    threshold: 0.2,
                    rootMargin: "-100px 0px -100px 0px",
                }
            );

            observer.observe(cardRef);
            return observer;
        });

        if (headerRef.current) headerObserver.observe(headerRef.current);
        if (carouselRef.current) carouselObserver.observe(carouselRef.current);

        return () => {
            headerObserver.disconnect();
            carouselObserver.disconnect();
            cardObservers.forEach((observer) => observer?.disconnect());
        };
    }, []);

    return (
        <section className="w-full flex flex-col gap-24 xs:py-[120px] xs:px-10 xl:px-10 2xl:px-20 pt-[120px] max-w-[1440px] mx-auto">
            <div
                ref={headerRef}
                className="flex flex-col gap-4 justify-center items-center"
            >
                <div className="flex flex-col gap-2 items-center">
                    <div
                        className={`w-fit text-center text-white px-3 py-2 rounded-3xl bg-[#28282C] transition-all duration-300 ease-out ${
                            headerInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: "200ms" }}
                    >
                        <p className="font-semibold">Our work</p>
                    </div>
                    <p
                        className={`text-5xl text-center font-medium leading-[120%] tracking-[-0.8px] text-[#101014] transition-all duration-300 ease-out ${
                            headerInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-6"
                        }`}
                        style={{ transitionDelay: "300ms" }}
                    >
                        Get inspired by our work
                    </p>
                </div>
                <p
                    className={`text-xl text-center text-[#3D3D47] leading-[170%] tracking-[-0.3px] transition-all duration-300 ease-out ${
                        headerInView
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4"
                    }`}
                    style={{ transitionDelay: "300ms" }}
                >
                    See how we&apos;ve transformed homes with our expert <br />
                    craftsmanship and attention to detail.
                </p>
            </div>
            <div className="max-w-[1440px]">
                {works.map((val, i) => (
                    <div
                        key={`desktop-${i}`}
                        className="2xl:py-[230px] xl:py-5 hidden xl:block"
                    >
                        <div
                            ref={(el) => {
                                cardRefs.current[i] = el;
                            }}
                            className={`rounded-[12px] p-8 flex 2xl:gap-20 lg:gap-10 items-center transition-all duration-300 ease-out ${
                                cardsInView[i]
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-12"
                            } ${i % 2 !== 0 ? "bg-[#101014]" : "bg-[#E9ECF2]"}`}
                            style={{
                                transitionDelay: `${i * 150}ms`,
                            }}
                        >
                            <div className="w-1/2 h-[500px] relative">
                                <Image
                                    src={val.image}
                                    alt="work-image"
                                    fill
                                    className="object-cover h-full rounded-[10px]"
                                />
                            </div>
                            <div className="w-1/2 flex flex-col gap-6">
                                <div className="flex flex-col gap-[15px]">
                                    <p
                                        className={`font-medium text-[40px] ${
                                            i % 2 === 0
                                                ? "text-[#101014]"
                                                : "text-white"
                                        } leading-[120%] tracking-[-0.1px]`}
                                    >
                                        {val.title}
                                    </p>
                                    <p
                                        className={`leading-[170%]  ${
                                            i % 2 === 0
                                                ? "text-[#101014]"
                                                : "text-white"
                                        } tracking-[-0.1px]`}
                                    >
                                        {val.description}
                                    </p>
                                </div>
                                <div className="flex items-center gap-[15px]">
                                    <div className="w-fit text-white px-3 py-2 rounded-3xl bg-[#28282C]">
                                        <p className="font-semibold">
                                            {val.firstTag}
                                        </p>
                                    </div>
                                    <div className="w-fit text-white px-3 py-2 rounded-3xl bg-[#28282C]">
                                        <p className="font-semibold">
                                            {val.secondTag}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2">
                                    <div className="relative">
                                        <Image
                                            src={
                                                i % 2 !== 0
                                                    ? "/icons/quote-white.svg"
                                                    : "/icons/quote.svg"
                                            }
                                            alt="quote"
                                            width={85}
                                            height={85}
                                        />
                                    </div>
                                    <p
                                        className={`text-lg leading-[170%]  ${
                                            i % 2 === 0
                                                ? "text-[#3D3D47]"
                                                : "text-white"
                                        } tracking-[-0.2px]`}
                                    >
                                        {val.testimony}
                                    </p>
                                </div>
                                <div className="flex gap-4 items-center px-8">
                                    <div className="relative">
                                        <Image
                                            src={val.person}
                                            alt="person"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <p
                                        className={`tracking-[-0.1px]  ${
                                            i % 2 === 0
                                                ? "text-[#101014]"
                                                : "text-white"
                                        }`}
                                    >
                                        {val.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {works.map((val, i) => (
                    <div
                        key={`mobile-${i}`}
                        className="w-full py-5 lg:block xs:hidden xl:hidden"
                    >
                        <div
                            ref={(el) => {
                                if (!cardRefs.current[i + works.length]) {
                                    cardRefs.current[i + works.length] = el;
                                }
                            }}
                            className={`w-full rounded-[12px] p-8 flex flex-col gap-5 transition-all duration-300 ease-out ${
                                cardsInView[i + works.length]
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-12"
                            } ${i % 2 !== 0 ? "bg-[#101014]" : "bg-[#E9ECF2]"}`}
                            style={{
                                transitionDelay: `${i * 150}ms`,
                            }}
                        >
                            <div className="w-full flex items-start gap-10">
                                <div className="w-1/2 aspect-[4/3.5] relative flex items-center gap-5">
                                    <Image
                                        src={val.image}
                                        alt="work-image"
                                        fill
                                        className="object-cover rounded-[10px]"
                                    />
                                </div>
                                <div className="w-1/2 flex flex-col gap-[15px]">
                                    <p
                                        className={`font-medium text-[32px] lg:text-[40px] ${
                                            i % 2 === 0
                                                ? "text-[#101014]"
                                                : "text-white"
                                        } leading-[120%] tracking-[-0.1px]`}
                                    >
                                        {val.title}
                                    </p>
                                    <p
                                        className={`leading-[170%]  ${
                                            i % 2 === 0
                                                ? "text-[#101014]"
                                                : "text-white"
                                        } tracking-[-0.1px]`}
                                    >
                                        {val.description}
                                    </p>
                                    <div className="flex items-center gap-[15px] flex-wrap">
                                        <div className="w-fit text-white px-3 py-2 rounded-3xl bg-[#28282C]">
                                            <p className="font-semibold text-sm">
                                                {val.firstTag}
                                            </p>
                                        </div>
                                        <div className="w-fit text-white px-3 py-2 rounded-3xl bg-[#28282C]">
                                            <p className="font-semibold text-sm">
                                                {val.secondTag}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex flex-col gap-6">
                                <div className="flex items-start gap-2">
                                    <div className="relative flex-shrink-0">
                                        <Image
                                            src={
                                                i % 2 !== 0
                                                    ? "/icons/quote-white.svg"
                                                    : "/icons/quote.svg"
                                            }
                                            alt="quote"
                                            width={24}
                                            height={24}
                                        />
                                    </div>
                                    <p
                                        className={`text-base lg:text-lg leading-[170%]  ${
                                            i % 2 === 0
                                                ? "text-[#3D3D47]"
                                                : "text-white"
                                        } tracking-[-0.2px]`}
                                    >
                                        {val.testimony}
                                    </p>
                                </div>
                                <div className="flex gap-4 items-center px-4 lg:px-8">
                                    <div className="relative">
                                        <Image
                                            src={val.person}
                                            alt="person"
                                            width={50}
                                            height={50}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <p
                                        className={`tracking-[-0.1px]  ${
                                            i % 2 === 0
                                                ? "text-[#101014]"
                                                : "text-white"
                                        }`}
                                    >
                                        {val.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div
                    ref={carouselRef}
                    className={`w-full lg:hidden max-w-4xl mx-auto rounded-xl transition-all duration-500 ease-out ${
                        carouselInView
                            ? "opacity-100 translate-y-0 scale-100"
                            : "opacity-0 translate-y-8 scale-95"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="relative overflow-hidden rounded-xl">
                        <div
                            className={`transition-all duration-300 ease-out ${
                                isTransitioning
                                    ? "opacity-75 scale-98"
                                    : "opacity-100 scale-100"
                            }`}
                        >
                            <div
                                className={`w-full rounded-xl p-5 flex flex-col gap-6 ${
                                    currentIndex % 2 !== 0
                                        ? "bg-[#101014]"
                                        : "bg-[#E9ECF2]"
                                }`}
                            >
                                <div className="w-full aspect-square relative rounded-xl overflow-hidden">
                                    <Image
                                        src={currentWork.image}
                                        alt="work-image"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-4">
                                    <h3
                                        className={`font-medium text-2xl lg:text-3xl ${
                                            currentIndex % 2 === 0
                                                ? "text-[#101014]"
                                                : "text-white"
                                        } leading-tight tracking-tight`}
                                    >
                                        {currentWork.title}
                                    </h3>

                                    <p
                                        className={`leading-relaxed ${
                                            currentIndex % 2 === 0
                                                ? "text-[#101014]"
                                                : "text-white"
                                        } tracking-tight`}
                                    >
                                        {currentWork.description}
                                    </p>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <div className="w-fit text-white px-3 py-2 rounded-full bg-[#28282C]">
                                            <p className="font-semibold text-sm">
                                                {currentWork.firstTag}
                                            </p>
                                        </div>
                                        <div className="w-fit text-white px-3 py-2 rounded-full bg-[#28282C]">
                                            <p className="font-semibold text-sm">
                                                {currentWork.secondTag}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="relative flex-shrink-0">
                                            <Image
                                                src={
                                                    currentIndex % 2 !== 0
                                                        ? "/icons/quote-white.svg"
                                                        : "/icons/quote.svg"
                                                }
                                                alt="quote"
                                                width={24}
                                                height={24}
                                            />
                                        </div>
                                        <p
                                            className={`text-base lg:text-lg leading-relaxed ${
                                                currentIndex % 2 === 0
                                                    ? "text-[#3D3D47]"
                                                    : "text-white"
                                            } tracking-tight italic`}
                                        >
                                            {currentWork.testimony}
                                        </p>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="relative">
                                            <Image
                                                src={currentWork.person}
                                                alt="person"
                                                width={50}
                                                height={50}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <p
                                            className={`tracking-tight font-medium ${
                                                currentIndex % 2 === 0
                                                    ? "text-[#101014]"
                                                    : "text-white"
                                            }`}
                                        >
                                            {currentWork.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`flex justify-center gap-2 items-center mt-6 transition-all duration-500 ease-out ${
                            carouselInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: "400ms" }}
                    >
                        {works.map((_, i) => (
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
            </div>
        </section>
    );
}
