import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Contact() {
    const [isVisible, setIsVisible] = useState({
        leftContent: false,
        rightForm: false,
    });

    const leftContentRef = useRef(null);
    const rightFormRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px",
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const target = entry.target;

                    if (target === leftContentRef.current) {
                        setIsVisible((prev) => ({
                            ...prev,
                            leftContent: true,
                        }));
                    } else if (target === rightFormRef.current) {
                        setTimeout(() => {
                            setIsVisible((prev) => ({
                                ...prev,
                                rightForm: true,
                            }));
                        }, 200);
                    }
                }
            });
        }, observerOptions);

        if (leftContentRef.current) observer.observe(leftContentRef.current);
        if (rightFormRef.current) observer.observe(rightFormRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <section className="w-full 3xl:px-[260px]">
            <div className="max-w-[1440px] mx-auto px-5">
                <div className="flex flex-col lg:flex-row bg-black gap-[100px] 2xl:p-20 xs:px-5 xs:py-[60px] rounded-[12px]">
                    <div
                        ref={leftContentRef}
                        className={`lg:w-1/2 w-full flex flex-col gap-12 transition-all duration-300 ease-out ${
                            isVisible.leftContent
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-16"
                        }`}
                    >
                        <div className="flex flex-col gap-5">
                            <div className="w-fit text-white px-3 py-2 rounded-3xl bg-[#28282C]">
                                <p className="font-semibold">Contact</p>
                            </div>
                            <p className="text-5xl font-medium leading-[120%] tracking-[-0.8px] text-white">
                                Get in touch
                            </p>
                            <p className="text-xl text-[#D0D1DB] leading-[170%] tracking-[-0.3px]">
                                For any inquiries or to explore your vision
                                further, we invite you to contact our
                                professional team using the details provided
                                below.
                            </p>
                        </div>
                        <div className="border-b border-b-[#D0D1DB1A] flex flex-col gap-4 pb-[30px]">
                            <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                                <p className="text-[18px] font-semibold text-white leading-[170%] tracking-[-0.1px]">
                                    Office
                                </p>
                                <p className="text-[#D0D1DB] text-[18px] leading-[170%] tracking-[-0.1px]">
                                    150 Old Park Ln, London W1K 1QZ
                                </p>
                            </div>
                            <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                                {" "}
                                <p className="text-[18px] font-semibold text-white leading-[170%] tracking-[-0.1px]">
                                    Email
                                </p>
                                <p className="text-[#D0D1DB] text-[18px] leading-[170%] tracking-[-0.1px]">
                                    hello@refit.com
                                </p>
                            </div>
                            <div className="flex lg:flex-row flex-col gap-3 lg:items-center">
                                {" "}
                                <p className="text-[18px] font-semibold text-white leading-[170%] tracking-[-0.1px]">
                                    Telephone
                                </p>
                                <p className="text-[#D0D1DB] text-[18px] leading-[170%] tracking-[-0.1px]">
                                    07716 534984
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <p className="font-semibold text-[18px] leading-[170%] tracking-[-0.1px] text-white">
                                Follow us
                            </p>
                            <div className="flex items-center gap-5">
                                <Image
                                    src={"/icons/instagram.svg"}
                                    alt="instagram"
                                    width={24}
                                    height={24}
                                />
                                <Image
                                    src={"/icons/tiktok.svg"}
                                    alt="tiktok"
                                    width={24}
                                    height={24}
                                />
                                <Image
                                    src={"/icons/twitter.svg"}
                                    alt="twitter"
                                    width={24}
                                    height={24}
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        ref={rightFormRef}
                        className={`lg:w-1/2 w-full rounded-[12px] p-5 border border-[#E6E6E6] bg-white flex flex-col gap-5 transition-all duration-300 ease-out ${
                            isVisible.rightForm
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-16"
                        }`}
                    >
                        <div className="w-full flex flex-col gap-[7px]">
                            <label>
                                Name
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="w-full py-[13px] px-[12px] border rounded-[6px] border-[#DBDAD9] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                                placeholder="John Smith"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-[7px]">
                            <label>
                                Email
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="w-full py-[13px] px-[12px] border rounded-[6px] border-[#DBDAD9] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                                placeholder="johnsmith@gmail.com"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-[7px]">
                            <label>
                                Phone Number
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="w-full py-[13px] px-[12px] border rounded-[6px] border-[#DBDAD9] bg-[#FAFAFA] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                                placeholder="+44789 123456"
                            />
                        </div>
                        <div className="w-full flex flex-col gap-[7px]">
                            <label>
                                Message
                                <span className="text-red-500">*</span>
                            </label>
                            <Textarea
                                className="w-full min-h-[150px] border-[#DBDAD9] bg-[#FAFAFA] py-[13px] px-[12px] border rounded-[6px] focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                                placeholder="Hello, I'd like to enquire about..."
                            />
                        </div>
                        <button className="w-full bg-[#101014BF] py-[11px] rounded-md hover:bg-[#101014] transition-colors duration-200">
                            <p className="text-white font-medium">
                                Send message
                            </p>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
