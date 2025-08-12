import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    const headlineLines = [
        "Your trusted partner",
        "for quality home improvement",
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 200);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <section className="w-full relative 3xl:px-[260px] xs:py-10 xs:px-5 xs:pt-48 lg:pt-96 lg:pb-10 2xl:py-8 bg-black overflow-hidden lg:px-5 2xl:px-0">
            <div className="absolute 2xl:hidden inset-5">
                <div className="w-full aspect-video px-5">
                    <Image
                        src={"/assets/hero-mobile.png"}
                        alt="hero image"
                        fill
                        className="object-cover rounded-xl"
                    />{" "}
                    <div className="absolute 2xl:hidden inset-0 bg-black/80" />
                </div>
            </div>
            <div className="flex 2xl:justify-center mx-auto xs:justify-start xs:items-end 2xl:items-center gap-20 2xl:max-w-[1440px] xs:px-5 2xl:px-20">
                <div className="xl:w-full 2xl:w-1/2 flex flex-col gap-14">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <div
                                className={`w-fit py-2 px-3 flex items-center gap-1.5 rounded-3xl bg-[#28282C] transition-all  ease-out ${
                                    isVisible
                                        ? "opacity-100 scale-100 translate-y-0"
                                        : "opacity-0 scale-95 translate-y-2"
                                }`}
                            >
                                <div className="relative bg-white/30 h-4 w-4 rounded-full">
                                    <div
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-white rounded-full transition-all duration-1000 ease-out ${
                                            isVisible ? "scale-100" : "scale-0"
                                        }`}
                                        style={{ transitionDelay: "400ms" }}
                                    ></div>
                                </div>
                                <p className="text-center text-[14px] text-[#D0D1DB] font-normal">
                                    Available for work
                                </p>
                            </div>
                            <div className="flex items-center">
                                <div className="font-medium lg:text-[56px] xs:text-[40px] text-white leading-[120%] tracking-[-1px]">
                                    {headlineLines.map((line, index) => (
                                        <div
                                            key={index}
                                            className={`transition-all duration-1000 ease-out ${
                                                isVisible
                                                    ? "opacity-100 translate-y-0"
                                                    : "opacity-0 translate-y-8"
                                            }`}
                                            style={{
                                                transitionDelay: `${
                                                    600 + index * 300
                                                }ms`,
                                            }}
                                        >
                                            {line}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <p
                                className={`text-xl leading-[170%] tracking-[0.3px] text-[#D0D1DB] transition-all duration-300 ease-out ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }`}
                                style={{ transitionDelay: "1400ms" }}
                            >
                                LifetimeArt delivers expert home improvements,
                                <br />
                                creating beautiful and functional spaces with
                                quality craftsmanship.
                            </p>
                        </div>
                    </div>
                    <div
                        className={`w-fit rounded-3xl py-2.5 px-4 bg-white/10 cursor-pointer group transition-all duration-300 ease-out ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                        style={{
                            transitionDelay: "1800ms",
                            transition: "all 0.3s ease-out",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                                "translateY(-4px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0px)";
                            e.currentTarget.style.boxShadow = "none";
                        }}
                    >
                        <div className="flex gap-6 items-center">
                            <p className="text-white font-medium leading-[20.8px] group-hover:text-white transition-colors duration-300">
                                Work with us
                            </p>
                            <div className="rounded-full bg-white h-10 w-10 flex items-center justify-center  transition-all duration-300">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transform -rotate-45 transition-transform duration-300 group-hover:translate-x-1"
                                >
                                    <path
                                        d="M5 12H19M19 12L12 5M19 12L12 19"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`sm:hidden 2xl:flex 2xl:w-1/2 h-full relative aspect-[3/4] transition-all duration-1200 ease-out ${
                        isVisible
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95"
                    }`}
                    style={{
                        transitionDelay: "1000ms",
                        transform: `translateY(${scrollY * 0.1}px) scale(${
                            isVisible ? 1 : 0.95
                        })`,
                    }}
                >
                    <div className="relative w-full h-full">
                        <div className="text-white text-center">
                            <Image
                                src={"/assets/decor-hero.png"}
                                alt="hero image"
                                fill
                                className="object-cover rounded-xl"
                            />
                        </div>
                        <div
                            className={`hidden 2xl:absolute bottom-4 right-4 rounded-lg p-6 2xl:flex flex-col gap-[9px] shadow-lg max-w-60 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                                isVisible
                                    ? "opacity-100 translate-x-0 translate-y-0 scale-100"
                                    : "opacity-0 translate-x-12 translate-y-12 scale-90"
                            }`}
                            style={{
                                backgroundColor: "#1010144D",
                                backdropFilter: "blur(15px)",
                                transitionDelay: "1600ms",
                            }}
                        >
                            <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        className={`relative aspect-square h-5 w-5 transition-all duration-300 ease-out`}
                                        key={i}
                                        style={{
                                            transitionDelay: `${
                                                1800 + i * 100
                                            }ms`,
                                        }}
                                    >
                                        <div
                                            className={`w-full h-full bg-white transition-all duration-500 ease-out ${
                                                isVisible
                                                    ? "scale-100 rotate-0"
                                                    : "scale-0 rotate-180"
                                            }`}
                                            style={{
                                                clipPath:
                                                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                                                transitionDelay: `${
                                                    1800 + i * 100
                                                }ms`,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/80 text-xs">
                                &quot;LifetimeArt has been a game-changer for my
                                home. Their ability to blend functionality with
                                exquisite design is unparalleled.&quot;
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
