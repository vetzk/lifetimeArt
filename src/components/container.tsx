import React from "react";

export default function Container({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="max-w-screen manrope-text h-fit">
            <main className="max-w-[1960px] flex mx-auto w-full">
                {children}
            </main>
        </div>
    );
}
