'use client';
import Link from "next/link";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import {useEffect, useState} from "react";

export default function Hero() {
    gsap.registerPlugin(SplitText);
    function onHover(e: React.MouseEvent<HTMLAnchorElement>) {
        gsap.to(e.currentTarget, { y: -8, duration: 0.2, ease: "power2.out" });
    }
    function onLeave(e: React.MouseEvent<HTMLAnchorElement>) {
        gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out" });
    }

    function textSplit() {
    const splitText = new SplitText(".title",{type: 'chars,words'} );
    const paragraphSplit = new SplitText(".paragraph",{type: 'lines'} );



    splitText.chars.forEach((char ) => { char.classList.add('text.gradient')});
    splitText.chars.forEach((char ) => { char.classList.add('text.gradient')});



        gsap.from(splitText.chars, {
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06
    });

        gsap.from(paragraphSplit.lines, {
            yPercent: 100,
            duration: 1.8,
            ease: "expo.out",
            stagger: 0.06,
            delay: 1,
            opacity: 0,
        })
    }
    useEffect(() => {
        textSplit();

    }, []);

    return (
        <section className="h-screen bg-cover bg-center"style={{ backgroundImage: "url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }} >
            <div className="h-full bg-black/50 flex flex-col justify-center pt-32 p-16 text-white gap-4">
                <p className={"paragraph text-sm font-semibold"}>Hotell Chao</p>
                <h1 className={"title text-7xl italic font-bold"}>Pensionat</h1>
                <p className={"paragraph uppercase tracking-widest text-sm font-semibold"}>Mingle around</p>
                <div className="flex gap-4 mt-6 font-bold">
                <Link href={"/rooms"} onMouseEnter={onHover} onMouseLeave={onLeave} className={"bg-[#C0522B] text-white rounded-full px-6 py-3 gap-4"}>Boka övernattning</Link>
                <Link href={"/register"} onMouseEnter={onHover} onMouseLeave={onLeave} className={"border border-white text-white rounded-full px-6 py-3 gap-4"}>Skapa konto</Link>
                </div>
            </div>




        </section>
    )
}
