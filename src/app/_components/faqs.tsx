import React, { useState, useEffect, useRef } from "react";
import { Plus, X } from "lucide-react";

const faqs = [
    {
        name: "What area are you based in?",
        description:
            "We primarily serve London and the surrounding areas, but depending on the project, we can travel further. Contact us to discuss your location and requirements.",
    },
    {
        name: "How long does a typical project take?",
        description:
            "Project timelines vary depending on size and complexity. We'll provide an estimated schedule during your consultation and keep you updated throughout the process.",
    },
    {
        name: "Do you offer free quotes?",
        description:
            "Yes, we offer free, no-obligation quotes. Our team will visit your property, assess your needs, and provide a detailed breakdown.",
    },
    {
        name: "Will I need planning permission for my project?",
        description:
            "This depends on the type and scope of your project. We can guide you through local regulations and help with applications if needed.",
    },
    {
        name: "Do you provide a guarantee for your work?",
        description:
            "Absolutely. All of our work is backed by a guarantee for quality and durability, giving you peace of mind",
    },
    {
        name: "Can I stay in my home while the work is being done?",
        description:
            "In most cases, yes—though it may depend on the scope of work and areas affected. We'll discuss options to minimise disruption.",
    },
    {
        name: "How do I get started with a project?",
        description:
            "Simply get in touch with our team. We'll arrange a consultation, discuss your ideas, and prepare a tailored plan and quote.",
    },
];

export default function FAQs() {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState({
        pill: false,
        title: false,
        button: false,
    });

    const pillRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const toggleFaq = (index: number) => {
        setActiveFaq(activeFaq === index ? null : index);
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
    };

    useEffect(() => {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    if (target === pillRef.current) {
                        setIsVisible((prev) => ({ ...prev, pill: true }));
                    } else if (target === titleRef.current) {
                        setTimeout(() => {
                            setIsVisible((prev) => ({ ...prev, title: true }));
                        }, 200);
                    } else if (target === buttonRef.current) {
                        setTimeout(() => {
                            setIsVisible((prev) => ({ ...prev, button: true }));
                        }, 400);
                    }
                }
            });
        }, observerOptions);

        if (pillRef.current) observer.observe(pillRef.current);
        if (titleRef.current) observer.observe(titleRef.current);
        if (buttonRef.current) observer.observe(buttonRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className="w-full 3xl:px-[260px] px-10">
            <div className="max-w-[1440px] py-[120px] 2xl:px-20 xl:px-10 flex 2xl:flex-row xs:flex-col xs:items-center 2xl:items-start gap-20">
                <div className="w-full 2xl:max-w-[400px] flex flex-col 2xl:justify-start 2xl:items-start xs:justify-center xs:items-center gap-14">
                    <div className="flex flex-col 2xl:items-start 2xl:justify-start xs:justify-center xs:items-center gap-4">
                        <div className="flex flex-col 2xl:items-start 2xl:justify-start xs:justify-center xs:items-center gap-2">
                            <div
                                ref={pillRef}
                                className={`w-fit text-white px-3 py-2 rounded-3xl bg-[#28282C] transition-all duration-200 ease-out ${
                                    isVisible.pill
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                <p className="font-semibold">FAQs</p>
                            </div>
                            <p
                                ref={titleRef}
                                className={`text-5xl 2xl:text-start xs:text-center font-medium leading-[120%] tracking-[-0.8px] text-[#101014] transition-all duration-300 ease-out ${
                                    isVisible.title
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-8"
                                }`}
                            >
                                Answering Your Questions
                            </p>
                        </div>
                        <p
                            className={`text-xl 2xl:text-start xs:text-center text-[#3D3D47] leading-[170%] tracking-[-0.3px] transition-all duration-300 ease-out ${
                                isVisible.title
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                            }`}
                        >
                            Got more questions? Send us your enquiry below
                        </p>
                    </div>
                    <div
                        ref={buttonRef}
                        className={`w-fit rounded-3xl py-2.5 px-4 transition-all duration-200 ease-out ${
                            isVisible.button
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-12"
                        }`}
                        style={{
                            background:
                                "linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(0deg, rgba(16, 16, 20, 0.1), rgba(16, 16, 20, 0.1))",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        <div
                            onClick={() => scrollToSection("contact")}
                            className="flex gap-6 items-center cursor-pointer hover:scale-105 transition-transform duration-200"
                        >
                            <p className="text-[#101014] font-medium leading-[20.8px]">
                                Get in touch
                            </p>
                            <div className="rounded-full bg-black h-10 w-10 flex items-center justify-center">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    color="white"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="transform -rotate-45"
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
                <div className="flex flex-col gap-5 2xl:w-[800px] w-full">
                    {faqs.map((val, i) => (
                        <div
                            key={i}
                            className="flex flex-col justify-center border bg-[#FAFAFA] border-[#E6E6E6] rounded-[12px] px-5"
                        >
                            <div
                                className="flex justify-between items-center py-6 cursor-pointer hover:bg-gray-50/50 transition-colors duration-200 rounded-lg"
                                onClick={() => toggleFaq(i)}
                            >
                                <div className="flex gap-2.5 items-center">
                                    <p className="text-xl font-medium leading-[120%] tracking-[-0.2px] text-[#101014]">
                                        {val.name}
                                    </p>
                                </div>
                                <div className="relative w-6 h-6 flex items-center justify-center">
                                    <Plus
                                        className={`absolute w-6 h-6 text-[#101014] transition-all duration-300 ease-in-out ${
                                            activeFaq === i
                                                ? "rotate-45 opacity-0 scale-75"
                                                : "rotate-0 opacity-100 scale-100"
                                        }`}
                                    />
                                    <X
                                        className={`absolute w-6 h-6 text-[#101014] transition-all duration-300 ease-in-out ${
                                            activeFaq === i
                                                ? "rotate-0 opacity-100 scale-100"
                                                : "rotate-45 opacity-0 scale-75"
                                        }`}
                                    />
                                </div>
                            </div>
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                                    activeFaq === i
                                        ? "opacity-100"
                                        : "max-h-0 opacity-0"
                                }`}
                            >
                                <div
                                    className={`pb-8 transition-all duration-500 ease-out ${
                                        activeFaq === i
                                            ? "translate-x-0 opacity-100"
                                            : "translate-x-8 opacity-0"
                                    }`}
                                    style={{
                                        transitionDelay:
                                            activeFaq === i ? "200ms" : "0ms",
                                    }}
                                >
                                    <div>
                                        <p className="text-[#3D3D47] leading-[170%] tracking-[-0.1px]">
                                            {val.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
