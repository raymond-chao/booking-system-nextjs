import Link from "next/link";

export default function Navbar() {
    return (
        <nav className={"flex items-center justify-between px-8 py-4 bg-[#F5F0E8] border-b-4 border-[#C0522B] rounded-xl mx-4 mt-4"}>
            <div className="bg-[#C0522B] text-white rounded-full px-5 py-2"> ≡ Meny </div>
            <div className="flex items-center justify-between">CHAO</div>

            <Link href={"/rooms"} className="bg-[#C0522B] text-white rounded-full px-5 py-2">Boka</Link>

        </nav>
    )
}