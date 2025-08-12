import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        text: "Refit transformed our outdoor space with a beautiful garden path. The work was completed on time, and the finish is excellent. A great team to work with!",
        name: "Emily Carter",
        image: "/assets/person.png",
    },
    {
        id: 2,
        text: "The kitchen renovation exceeded our expectations. Professional service, quality materials, and excellent attention to detail. Highly recommend LifetimeArt!",
        name: "Michael Johnson",
        image: "/assets/person-2.png",
    },
    {
        id: 3,
        text: "Outstanding bathroom renovation! The team was professional, clean, and delivered exactly what we wanted. The quality of work is exceptional.",
        name: "Sarah Williams",
        image: "/assets/person.png",
    },
    {
        id: 4,
        text: "From consultation to completion, the service was top-notch. Our new living room looks amazing and the attention to detail is impressive.",
        name: "David Brown",
        image: "/assets/person-2.png",
    },
    {
        id: 5,
        text: "Excellent craftsmanship and customer service. The team went above and beyond to ensure we were completely satisfied with our home renovation.",
        name: "Jessica Davis",
        image: "/assets/person.png",
    },
];

export default function Testimonials() {
    const [headerInView, setHeaderInView] = useState<boolean>(false);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
    const [direction, setDirection] = useState<"next" | "prev">("next");

    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeaderInView(true);
                }
            },
            { threshold: 0.3, rootMargin: "-50px 0px -50px 0px" }
        );

        if (headerRef.current) headerObserver.observe(headerRef.current);

        return () => {
            headerObserver.disconnect();
        };
    }, []);

    const goToSlide = (slideIndex: number) => {
        if (slideIndex === currentSlide) return;

        setIsTransitioning(true);
        setDirection(slideIndex > currentSlide ? "next" : "prev");

        setTimeout(() => {
            setCurrentSlide(slideIndex);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 50);
        }, 250);
    };

    return (
        <section className="w-full flex flex-col gap-24 lg:pt-[120px] lg:px-10 2xl:px-0 2xl:pb-[120px]">
            <div
                ref={headerRef}
                className="flex flex-col gap-4 justify-center items-center"
            >
                <div className="flex flex-col gap-2 items-center">
                    <div
                        className={`w-fit text-white px-3 py-2 rounded-3xl bg-[#28282C] transition-all duration-300 ease-out ${
                            headerInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: "200ms" }}
                    >
                        <p className="font-semibold">Testimonials</p>
                    </div>
                    <p
                        className={`text-5xl text-center font-medium leading-[120%] tracking-[-0.8px] text-[#101014] transition-all duration-300 ease-out ${
                            headerInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-6"
                        }`}
                        style={{ transitionDelay: "300ms" }}
                    >
                        Hear from our clients
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
                    {" "}
                    Hear from our happy clients about their experience working{" "}
                    <br /> with Refit and the quality of our craftsmanship.
                </p>
            </div>
            <div className="w-full lg:flex hidden flex-col gap-12 overflow-hidden">
                <div className="overflow-hidden">
                    <div className="flex items-center gap-8 animate-testimonial-scroll">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={`first-row-first-${i}`}
                                className={`w-[342px] h-[315px] min-h-[315px] max-h-[315px] flex-shrink-0 rounded-xl border border-[#E6E6E6] ${
                                    i % 2 !== 0
                                        ? "bg-[#FAFAFA]"
                                        : "bg-[#E9ECF2]"
                                } flex flex-col justify-between p-8`}
                            >
                                <div className="flex flex-col gap-[9px]">
                                    <div className="flex gap-1 items-center">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <div
                                                className="relative aspect-square h-5 w-5"
                                                key={starIndex}
                                            >
                                                <Image
                                                    src={
                                                        "/icons/black-star.svg"
                                                    }
                                                    alt="star"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="leading-[170%] tracking-[-0.1px]">
                                        {
                                            testimonials[
                                                i % testimonials.length
                                            ].text
                                        }
                                    </p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="relative">
                                        <Image
                                            src={
                                                testimonials[
                                                    i % testimonials.length
                                                ].image
                                            }
                                            alt="person"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <p className="tracking-[-0.1px] text-[#101014]">
                                        {
                                            testimonials[
                                                i % testimonials.length
                                            ].name
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={`first-row-second-${i}`}
                                className={`w-[342px] h-[315px] min-h-[315px] max-h-[315px] flex-shrink-0 rounded-xl border border-[#E6E6E6] ${
                                    i % 2 === 0
                                        ? "bg-[#FAFAFA]"
                                        : "bg-[#E9ECF2]"
                                } flex flex-col justify-between p-8`}
                            >
                                <div className="flex flex-col gap-[9px]">
                                    <div className="flex gap-1 items-center">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <div
                                                className="relative aspect-square h-5 w-5"
                                                key={starIndex}
                                            >
                                                <Image
                                                    src={
                                                        "/icons/black-star.svg"
                                                    }
                                                    alt="star"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="leading-[170%] tracking-[-0.1px]">
                                        {
                                            testimonials[
                                                i % testimonials.length
                                            ].text
                                        }
                                    </p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="relative">
                                        <Image
                                            src={
                                                testimonials[
                                                    i % testimonials.length
                                                ].image
                                            }
                                            alt="person"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <p className="tracking-[-0.1px] text-[#101014]">
                                        {
                                            testimonials[
                                                i % testimonials.length
                                            ].name
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="overflow-hidden">
                    <div className="flex items-center gap-8 animate-testimonial-scroll-reverse">
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={`second-row-first-${i}`}
                                className={`w-[342px] h-[315px] min-h-[315px] max-h-[315px] flex-shrink-0 rounded-xl border border-[#E6E6E6] ${
                                    i % 2 !== 0
                                        ? "bg-[#FAFAFA]"
                                        : "bg-[#E9ECF2]"
                                } flex flex-col justify-between p-8`}
                            >
                                <div className="flex flex-col gap-[9px]">
                                    <div className="flex gap-1 items-center">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <div
                                                className="relative aspect-square h-5 w-5"
                                                key={starIndex}
                                            >
                                                <Image
                                                    src={
                                                        "/icons/black-star.svg"
                                                    }
                                                    alt="star"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="leading-[170%] tracking-[-0.1px]">
                                        {
                                            testimonials[
                                                (i + 2) % testimonials.length
                                            ].text
                                        }
                                    </p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="relative">
                                        <Image
                                            src={
                                                testimonials[
                                                    (i + 2) %
                                                        testimonials.length
                                                ].image
                                            }
                                            alt="person"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <p className="tracking-[-0.1px] text-[#101014]">
                                        {
                                            testimonials[
                                                (i + 2) % testimonials.length
                                            ].name
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                        {[...Array(5)].map((_, i) => (
                            <div
                                key={`second-row-second-${i}`}
                                className={`w-[342px] h-[315px] min-h-[315px] max-h-[315px] flex-shrink-0 rounded-xl border border-[#E6E6E6] ${
                                    i % 2 === 0
                                        ? "bg-[#FAFAFA]"
                                        : "bg-[#E9ECF2]"
                                } flex flex-col justify-between p-8`}
                            >
                                <div className="flex flex-col gap-[9px]">
                                    <div className="flex gap-1 items-center">
                                        {[...Array(5)].map((_, starIndex) => (
                                            <div
                                                className="relative aspect-square h-5 w-5"
                                                key={starIndex}
                                            >
                                                <Image
                                                    src={
                                                        "/icons/black-star.svg"
                                                    }
                                                    alt="star"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="leading-[170%] tracking-[-0.1px]">
                                        {
                                            testimonials[
                                                (i + 2) % testimonials.length
                                            ].text
                                        }
                                    </p>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="relative">
                                        <Image
                                            src={
                                                testimonials[
                                                    (i + 2) %
                                                        testimonials.length
                                                ].image
                                            }
                                            alt="person"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <p className="tracking-[-0.1px] text-[#101014]">
                                        {
                                            testimonials[
                                                (i + 2) % testimonials.length
                                            ].name
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-6 xs:flex lg:hidden">
                <div className="relative overflow-hidden">
                    <div className="w-full flex justify-center px-2">
                        <div
                            className={`w-full max-w-[342px] h-[315px] min-h-[315px] max-h-[315px] rounded-xl border border-[#E6E6E6] bg-[#E9ECF2] flex flex-col justify-between p-6 transition-all duration-300 ease-out ${
                                isTransitioning
                                    ? direction === "next"
                                        ? "opacity-0 translate-x-8 scale-95"
                                        : "opacity-0 -translate-x-8 scale-95"
                                    : "opacity-100 translate-x-0 scale-100"
                            }`}
                        >
                            <div className="flex flex-col gap-[9px]">
                                <div className="flex gap-1 items-center">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <div
                                            className="relative aspect-square h-5 w-5"
                                            key={starIndex}
                                        >
                                            <Image
                                                src={"/icons/black-star.svg"}
                                                alt="star"
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p className="leading-[170%] tracking-[-0.1px] text-sm">
                                    {testimonials[currentSlide].text}
                                </p>
                            </div>
                            <div className="flex gap-4 items-center">
                                <div className="relative">
                                    <Image
                                        src={testimonials[currentSlide].image}
                                        alt="person"
                                        width={50}
                                        height={50}
                                        className="rounded-full"
                                    />
                                </div>
                                <p className="tracking-[-0.1px] text-[#101014]">
                                    {testimonials[currentSlide].name}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={`dot-${index}`}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 transform hover:scale-125 ${
                                currentSlide === index
                                    ? "bg-[#101014] scale-110"
                                    : "bg-[#E6E6E6] hover:bg-[#CCCCCC]"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes testimonial-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-${(342 + 32) * 5}px);
                    }
                }

                @keyframes testimonial-scroll-reverse {
                    0% {
                        transform: translateX(-${(342 + 32) * 5}px);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-testimonial-scroll {
                    animation: testimonial-scroll 25s linear infinite;
                    width: ${(342 + 32) * 10}px;
                }

                .animate-testimonial-scroll-reverse {
                    animation: testimonial-scroll-reverse 25s linear infinite;
                    width: ${(342 + 32) * 10}px;
                }
            `}</style>
        </section>
    );
}
