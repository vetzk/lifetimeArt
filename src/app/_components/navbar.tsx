import Image from "next/image";
import React, { useEffect, useState } from "react";

const navMenu = [
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Our Work", id: "works" },
    { name: "FAQs", id: "faqs" },
    { name: "Contact", id: "contact" },
];

const darkBackgroundSections = [
    "about",
    "services",
    "works",
    "faqs",
    "contact",
];

export default function Navbar() {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>("");
    const [shouldHaveDarkBg, setShouldHaveDarkBg] = useState<boolean>(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        const allSections = [{ name: "Hero", id: "hero" }, ...navMenu];

        allSections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            setActiveSection(id);
                            const shouldBeDark =
                                darkBackgroundSections.includes(id);
                            setShouldHaveDarkBg(shouldBeDark);
                        }
                    },
                    {
                        threshold: 0.1,
                        rootMargin: "-10% 0px -80% 0px",
                    }
                );
                observer.observe(element);
                observers.push(observer);
            }
        });

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;

            for (const { id } of allSections) {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + scrollY;
                    const elementBottom = elementTop + rect.height;

                    if (
                        scrollY >= elementTop - windowHeight * 0.3 &&
                        scrollY < elementBottom - windowHeight * 0.3
                    ) {
                        setActiveSection(id);
                        const shouldBeDark =
                            darkBackgroundSections.includes(id);
                        setShouldHaveDarkBg(shouldBeDark);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            observers.forEach((observer) => observer.disconnect());
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.offsetTop - navHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: "smooth",
            });
        }

        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <div
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-out ${
                    isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-8"
                } ${
                    shouldHaveDarkBg
                        ? "2xl:bg-black/90 bg-black/90"
                        : "2xl:bg-transparent bg-black/90"
                } transition-colors duration-300 ease-in-out`}
            >
                <div className="max-w-[1440px] px-5 lg:px-[30px] xs:px-10 2xl:px-20 py-6 lg:py-8 2xl:py-10 2xl:top-[1px] mx-auto flex justify-between items-center">
                    <div
                        className={`flex items-center gap-[5px] cursor-pointer transition-all duration-400 ease-out ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: "100ms" }}
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    >
                        <div className="relative">
                            <Image
                                src="/icons/Logo.svg"
                                alt="logo"
                                width={32}
                                height={32}
                            />
                        </div>
                        <p className="font-medium text-[23px] leading-[28px] tracking-[-0.4px] text-white">
                            LifetimeArt
                        </p>
                    </div>
                    <div className="hidden lg:flex items-center text-white gap-[30px]">
                        {navMenu.map((item, i) => (
                            <div
                                key={i}
                                className={`relative group cursor-pointer transition-all duration-300 ease-out ${
                                    isVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }`}
                                style={{
                                    transitionDelay: `${200 + i * 100}ms`,
                                }}
                                onClick={() => scrollToSection(item.id)}
                            >
                                <p
                                    className={`relative font-medium transition-all duration-300 ease-out transform hover:scale-105 ${
                                        activeSection === item.id
                                            ? "text-white"
                                            : "text-white/80 hover:text-white"
                                    }`}
                                >
                                    {item.name}
                                    <span
                                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-white to-white transition-all duration-300 ease-out ${
                                            activeSection === item.id
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }`}
                                    ></span>
                                </p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={toggleMobileMenu}
                        className={`lg:hidden flex flex-col justify-center items-center w-8 h-8 transition-all duration-300 ease-out hover:scale-110 ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: "200ms" }}
                        aria-label="Toggle mobile menu"
                    >
                        <span
                            className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${
                                isMobileMenuOpen
                                    ? "rotate-45 translate-y-1.5"
                                    : "translate-y-0"
                            }`}
                        ></span>
                        <span
                            className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out mt-1 ${
                                isMobileMenuOpen ? "opacity-0" : "opacity-100"
                            }`}
                        ></span>
                        <span
                            className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out mt-1 ${
                                isMobileMenuOpen
                                    ? "-rotate-45 -translate-y-1.5"
                                    : "translate-y-0"
                            }`}
                        ></span>
                    </button>
                </div>
            </div>
            <div
                className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                        ? "opacity-100 visible"
                        : "opacity-0 invisible pointer-events-none"
                }`}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-center px-5 xs:px-10 py-6">
                        <div
                            className={`flex items-center gap-[5px] transition-all duration-300 ease-out cursor-pointer ${
                                isMobileMenuOpen
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4"
                            }`}
                            style={{ transitionDelay: "200ms" }}
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            <div className="relative">
                                <Image
                                    src="/icons/Logo.svg"
                                    alt="logo"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <p className="font-medium text-lg leading-[28px] tracking-[-0.4px] text-white">
                                LifetimeArt
                            </p>
                        </div>
                        <button
                            onClick={toggleMobileMenu}
                            className={`flex flex-col justify-center items-center w-8 h-8 transition-all duration-300 ease-out hover:scale-110 ${
                                isMobileMenuOpen
                                    ? "opacity-100 rotate-0"
                                    : "opacity-0 rotate-180"
                            }`}
                            style={{ transitionDelay: "200ms" }}
                            aria-label="Close mobile menu"
                        >
                            <span className="block h-0.5 w-6 bg-white rotate-45 translate-y-0.5"></span>
                            <span className="block h-0.5 w-6 bg-white -rotate-45 -translate-y-0.5"></span>
                        </button>
                    </div>
                    <div
                        className={`flex flex-col items-start justify-center flex-1 px-5 xs:px-10 space-y-8 transition-all duration-300 ease-out ${
                            isMobileMenuOpen
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }`}
                    >
                        {navMenu.map((item, i) => (
                            <div
                                key={i}
                                className={`transition-all duration-300 ease-out ${
                                    isMobileMenuOpen
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4"
                                }`}
                                style={{
                                    transitionDelay: isMobileMenuOpen
                                        ? `${300 + i * 100}ms`
                                        : "0ms",
                                }}
                            >
                                <p
                                    className={`text-2xl leading-[120%] tracking-[-1px] cursor-pointer transition-all duration-300 transform hover:scale-105 hover:translate-x-2 ${
                                        activeSection === item.id
                                            ? "text-white"
                                            : "text-white/80 hover:text-white"
                                    }`}
                                    onClick={() => scrollToSection(item.id)}
                                >
                                    {item.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
