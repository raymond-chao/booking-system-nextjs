'use client';
import Link from "next/link";
import gsap from "gsap";


export default function Navbar() {
    function onHover(e: React.MouseEvent<HTMLAnchorElement>) {
        gsap.to(e.currentTarget, { y: -8, duration: 0.2, ease: "power2.out" });
    }
    function onLeave(e: React.MouseEvent<HTMLAnchorElement>) {
        gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out" });
    }
    return (
        <nav className={"flex items-center justify-between px-8 py-4 bg-[#F5F0E8] border-b-4 border-[#C0522B] rounded-xl fixed top-4 left-4 right-4 z-50"}>
            <div className="bg-[#C0522B] text-white rounded-full px-5 py-2 font-bold"> ≡ Meny </div>
            <Link href={"/"} className="flex items-center justify-between text-[#C0522B] font-bold">CHAO</Link>

            <Link  href={"/rooms"} onMouseEnter={onHover} onMouseLeave={onLeave} className="bg-[#C0522B] text-white rounded-full px-5 py-2">Boka</Link>

        </nav>
    )
}