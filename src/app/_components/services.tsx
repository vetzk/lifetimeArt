import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";

const services = [
    {
        name: "Kitchens",
        icons: "/icons/icons-service-3.svg",
        image: "/assets/service-image.png",
        description:
            "At LifetimeArt, we design and build stunning kitchens tailored to your style and needs. Whether you're after a sleek modern space or a classic, timeless look, our expert team delivers high-quality craftsmanship, functionality, and attention to detail to create the heart of your home.",
    },
    {
        name: "Loft Conversions",
        icons: "/icons/icons-service-5.svg",
        image: "/assets/Loft Conversions.png",
        description:
            "Transform unused loft space into a beautiful, practical part of your home. From cozy bedrooms to bright home offices, we handle everything from structural adjustments to finishing touches, ensuring your new space is safe, stylish, and seamlessly integrated with your existing home.",
    },
    {
        name: "Bathroom",
        icons: "/icons/icons-service-6.svg",
        image: "/assets/Bathroom.png",
        description:
            "We create bathrooms that balance relaxation and practicality, with designs ranging from spa-inspired retreats to minimalist, functional spaces. Our team sources high-quality fixtures and finishes, ensuring durability, elegance, and comfort for years to come.",
    },
    {
        name: "Extensions",
        icons: "/icons/icons-service-4.svg",
        image: "/assets/Extension.png",
        description:
            "Expand your living space without compromising on style. Whether it’s a kitchen extension, a new family room, or an entire additional floor, we work closely with you to design and build an extension that complements your home and adds value.",
    },
    {
        name: "Restorations",
        icons: "/icons/icons-service-2.svg",
        image: "/assets/Restoration.png",
        description:
            "Preserve the charm of your property while upgrading it for modern living. Our restoration work combines traditional craftsmanship with modern techniques to breathe new life into historic or worn-down spaces.",
    },
    {
        name: "External Works",
        icons: "/icons/icons-service-1.svg",
        image: "/assets/External Works.png",
        description:
            "Enhance the beauty and functionality of your outdoor areas. From garden landscaping to patios, pathways, and exterior lighting, we create inviting spaces that connect your home to nature.",
    },
];

export default function Services() {
    const [activeService, setActiveService] = useState<number>(0);
    const [headerInView, setHeaderInView] = useState<boolean>(false);
    const [imageInView, setImageInView] = useState<boolean>(false);
    const [imageKey, setImageKey] = useState<number>(0);

    const headerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const toggleService = (index: number) => {
        setActiveService(activeService === index ? 0 : index);
        setImageKey((prev) => prev + 1);
    };

    useEffect(() => {
        const headerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHeaderInView(true);
                }
            },
            { threshold: 0.3, rootMargin: "-50px 0px -50px 0px" }
        );

        const imageObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setImageInView(true);
                }
            },
            { threshold: 0.2, rootMargin: "-100px 0px -100px 0px" }
        );

        if (headerRef.current) headerObserver.observe(headerRef.current);
        if (imageRef.current) imageObserver.observe(imageRef.current);

        return () => {
            headerObserver.disconnect();
            imageObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        setImageKey((prev) => prev + 1);
    }, [activeService]);

    return (
        <section className="w-full bg-[#FAFAFA]">
            <div className="flex flex-col gap-24 xs:px-10 2xl:px-20 py-[120px] max-w-[1440px] mx-auto">
                <div
                    ref={headerRef}
                    className="flex flex-col gap-4 justify-center items-center"
                >
                    <div className="flex flex-col gap-2 items-center">
                        <div
                            className={`w-fit text-white px-3 py-2 rounded-3xl bg-[#28282C] transition-all duration-800 ease-out ${
                                headerInView
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-4"
                            }`}
                            style={{ transitionDelay: "200ms" }}
                        >
                            <p className="font-semibold">Services</p>
                        </div>
                        <p
                            className={`text-5xl font-medium leading-[120%] tracking-[-0.8px] text-[#101014] transition-all duration-1000 ease-out ${
                                headerInView
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-6"
                            }`}
                            style={{ transitionDelay: "400ms" }}
                        >
                            What we do
                        </p>
                    </div>
                    <p
                        className={`text-xl text-center text-[#3D3D47] leading-[170%] tracking-[-0.3px] transition-all duration-800 ease-out ${
                            headerInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                        }`}
                        style={{ transitionDelay: "600ms" }}
                    >
                        Find out which one of our services fit the needs of your
                        project
                    </p>
                </div>

                <div className="flex lg:flex-row xs:flex-col items-center gap-20">
                    <div
                        ref={imageRef}
                        className={`lg:w-1/2 xs:w-full h-full relative aspect-[3/3.5] overflow-hidden transition-all duration-1000 ease-out ${
                            imageInView
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: "300ms" }}
                    >
                        <div
                            className={`w-full h-full transition-all duration-500 rounded-[12px] ease-out`}
                        >
                            <Image
                                key={imageKey}
                                src={services[activeService].image}
                                alt="service-image"
                                fill
                                className="object-cover rounded-[12px]"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col lg:w-1/2 w-full">
                        {services.map((val, i) => (
                            <div
                                key={i}
                                className="flex flex-col gap-5 border-b border-gray-200 last:border-b-0"
                            >
                                <div
                                    className={`flex justify-between items-center py-5 cursor-pointer transition-all duration-300 px-2 rounded-lg group ${
                                        activeService === i
                                            ? "bg-gray-50/50"
                                            : "hover:bg-gray-50/30"
                                    }`}
                                    onClick={() => toggleService(i)}
                                >
                                    <div className="flex gap-2.5 items-center">
                                        <div className="relative aspect-square">
                                            <Image
                                                src={val.icons}
                                                alt="icons-service"
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <p
                                            className={`text-xl font-medium leading-[120%] tracking-[-0.2px] transition-colors duration-300 ${
                                                activeService === i
                                                    ? "text-[#101014]"
                                                    : "text-[#101014]/30 group-hover:text-[#000000]"
                                            }`}
                                        >
                                            {val.name}
                                        </p>
                                    </div>
                                    <div className="relative w-6 h-6 flex items-center justify-center">
                                        <Plus
                                            className={`absolute w-6 h-6 text-[#101014] transition-all duration-300 ease-in-out ${
                                                activeService === i
                                                    ? "rotate-45 opacity-0 scale-75"
                                                    : "rotate-0 opacity-100 scale-100"
                                            }`}
                                        />
                                        <X
                                            className={`absolute w-6 h-6 text-[#101014] transition-all duration-300 ease-in-out ${
                                                activeService === i
                                                    ? "rotate-0 opacity-100 scale-100"
                                                    : "rotate-45 opacity-0 scale-75"
                                            }`}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={`px-2 overflow-hidden transition-all duration-500 ease-in-out ${
                                        activeService === i
                                            ? "opacity-100"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <div
                                        className={`pb-8 transition-all duration-500 ease-out ${
                                            activeService === i
                                                ? "translate-x-0 opacity-100"
                                                : "translate-x-8 opacity-0"
                                        }`}
                                        style={{
                                            transitionDelay:
                                                activeService === i
                                                    ? "200ms"
                                                    : "0ms",
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

                <style jsx>{`
                    .animate-fadeInScale {
                        animation: fadeInScale 0.6s ease-out;
                    }
                `}</style>
            </div>
        </section>
    );
}
