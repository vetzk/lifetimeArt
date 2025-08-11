"use client";
import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import AboutUs from "./about-us";
import Services from "./services";
import Works from "./works";
import Testimonials from "./testimonials";
import FAQs from "./faqs";
import Contact from "./contact";
import Footer from "./footer";

export default function HomeContent() {
    return (
        <div className="w-full p-0 m-0">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <Hero />
            <div id="about" className="scroll-smooth">
                <AboutUs />
            </div>
            <div id="services" className="scroll-smooth">
                <Services />
            </div>

            <div id="works" className="scroll-smooth">
                <Works />
            </div>
            <div id="testimonials" className="scroll-smooth">
                <Testimonials />
            </div>
            <div id="faqs" className="scroll-smooth">
                <FAQs />
            </div>
            <div id="contact" className="scroll-smooth">
                <Contact />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}
