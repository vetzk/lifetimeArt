import React from "react";
import Image from "next/image";

export default function Footer() {
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

    return (
        <div className="mx-auto mt-4 max-w-[1440px] px-5">
            <div className="bg-black flex flex-col gap-10 rounded-tl-[12px] rounded-tr-[12px] 2xl:p-20 xs:px-5 xs:py-[60px]">
                <div className="flex lg:flex-row flex-col gap-10 lg:justify-between">
                    <div className="flex gap-[5px]">
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
                    <div className="flex flex-col gap-[17px]">
                        <p className="font-medium text-2xl text-white tracking-[-0.4px] leading-[26.4px]">
                            Quick links
                        </p>
                        <div className="flex text-[#D0D1DB] items-center gap-20">
                            <div className="flex flex-col gap-[13px]">
                                <p
                                    onClick={() => scrollToSection("about")}
                                    className="text-[18px] cursor-pointer tracking-[-0.1px] leading[-27px]"
                                >
                                    About us
                                </p>
                                <p
                                    onClick={() => scrollToSection("works")}
                                    className="text-[18px] cursor-pointer tracking-[-0.1px] leading[-27px]"
                                >
                                    Our work
                                </p>
                                <p
                                    onClick={() => scrollToSection("services")}
                                    className="text-[18px] cursor-pointer tracking-[-0.1px] leading[-27px]"
                                >
                                    Services
                                </p>
                            </div>
                            <div className="flex flex-col gap-[13px]">
                                <p
                                    onClick={() =>
                                        scrollToSection("testimonials")
                                    }
                                    className="text-[18px] cursor-pointer tracking-[-0.1px] leading[-27px]"
                                >
                                    Testimonials
                                </p>
                                <p
                                    onClick={() => scrollToSection("faqs")}
                                    className="text-[18px] cursor-pointer tracking-[-0.1px] leading[-27px]"
                                >
                                    FAQs
                                </p>
                                <p
                                    onClick={() => scrollToSection("contact")}
                                    className="text-[18px] cursor-pointer tracking-[-0.1px] leading[-27px]"
                                >
                                    Contact
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-[#D0D1DB1A]" />
                <div>
                    <p className="text-[18px] font-semibold leading-[170%] tracking-[-0.1px] text-white">
                        © 2025 LifetimeArt. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
