'use client';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import gsap from "gsap";


export default function ConfirmationPage() {
    const router = useRouter();
    function onHover(e: React.MouseEvent<HTMLButtonElement>) {
        gsap.to(e.currentTarget, { y: -8, duration: 0.2, ease: "power2.out" });
    }
    function onLeave(e: React.MouseEvent<HTMLButtonElement>) {
        gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out" });
    }


    const [booking, setBooking] = useState<any>(null);



    useEffect(() => {
        const data = localStorage.getItem('lastBooking');
        if (data) setBooking(JSON.parse(data));
    }, []);
    if (!booking) return <p>Laddar...</p>;



    return (
        <main className="min-h-screen bg-[#F5F0E8] pt-24 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6">
                <h1 className="text-[#C0522B] text-3xl font-bold mb-2">Bokningsbekräftelse</h1>
                <p className="text-gray-500 mb-4">Bekräftelsenr: {booking.bookingConfirmation}</p>
                <img src={booking.room.imgUrl} className="w-full h-48 object-cover rounded-xl mb-4" />
                <h2 className="text-2xl font-bold text-[#C0522B]">
                    {booking.room.roomType === 'DOUBLE' ? 'Dubbelrum' : 'Enkelrum'}
                </h2>
                <div className="flex justify-between mt-4 text-gray-700">
                    <span>Incheckning</span>
                    <span>{booking.checkInDate}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Utcheckning</span>
                    <span>{booking.checkOutDate}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Gäster</span>
                    <span>{booking.numOfGuests}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Kontakt</span>
                    <span>{booking.customerEmail}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                    <span>Extrasäng</span>
                    <span>{booking.extraBed ? 'Ja' : 'Nej'}</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t text-xl font-bold text-[#C0522B]">
                    <span>Pris/natt</span>
                    <span>{booking.room.pricePerNight} SEK</span>
                </div>
                <button onMouseEnter={onHover} onMouseLeave={onLeave} onClick={() => router.push('/account')} className="bg-[#C0522B] text-white px-6 py-2 rounded-full mt-4">Se bokningar</button>

            </div>
        </main>
    )


}