'use client';
import Link from "next/link";
import gsap from "gsap";
import {useState} from "react";


export default function Navbar() {
    const [open, setOpen] = useState(false);

    function onHover(e: React.MouseEvent<HTMLAnchorElement>) {
        gsap.to(e.currentTarget, { y: -8, duration: 0.2, ease: "power2.out" });
    }
    function onLeave(e: React.MouseEvent<HTMLAnchorElement>) {
        gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out" });
    }

    return (
        <nav
            className={"flex items-center justify-between px-8 py-4 bg-[#F5F0E8] border-b-4 border-[#C0522B] rounded-xl fixed top-4 left-4 right-4 z-50"}>
            <div>
                <button onClick={() => setOpen(!open)}
                        className="bg-[#C0522B] text-white rounded-full px-5 py-2 font-bold"> ≡ Meny
                </button>
                {open && (
                    <div className={"absolute top-14 left-0 bg-[#F5F0E8] rounded-xl shadow-lg p-2 flex flex-col gap-2 w-64 h-80 justify-between"}>
                        <Link href="/" onClick={() => setOpen(false)} className="rounded-full px-4 py-2 text-center text-[#C0522B] hover:bg-[#C0522B] hover:text-white transition-colors mt-6">Hem</Link>
                        <Link href="/account" onClick={() => setOpen(false)} className="rounded-full px-4 py-2 text-center text-[#C0522B] hover:bg-[#C0522B] hover:text-white transition-colors mt-6">Mitt konto</Link>
                        <Link href="/login" onClick={() => setOpen(false)} className="rounded-full px-4 py-2 text-center text-[#C0522B] hover:bg-[#C0522B] hover:text-white transition-colors mt-6">Logga in</Link>

                        <Link href="/rooms" onClick={() => setOpen(false)} className="rounded-full px-4 py-2 text-center text-[#C0522B] hover:bg-[#C0522B] hover:text-white transition-colors mt-6">Boka övernattning</Link>


                    </div>
                )}

            </div>

        <nav className={"flex items-center justify-between px-8 py-4 bg-[#F5F0E8] border-b-4 border-[#C0522B] rounded-xl fixed top-4 left-4 right-4 z-50"}>
            <div className="bg-[#C0522B] text-white rounded-full px-5 py-2 font-bold"> ≡ Meny </div>
            <Link href={"/"} className="flex items-center justify-between text-[#C0522B] font-bold">CHAO</Link>

            <Link href={"/rooms"} onMouseEnter={onHover} onMouseLeave={onLeave}
                  className="bg-[#C0522B] text-white rounded-full px-5 py-2">Boka</Link>

        </nav>
    )
}