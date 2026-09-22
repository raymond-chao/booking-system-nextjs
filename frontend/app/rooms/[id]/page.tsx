'use client';
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";

import gsap from "gsap";

type Room = {
    id: number;
    roomNumber: string;
    beds: number;
    pricePerNight: number;
    description: string;
    imgUrl: string;
    roomType: string;
}




export default function RoomPage() {
    const params = useParams();
    const id = params.id;
    const router = useRouter();
    const [extraBed, setExtraBed] = useState(false);

    const searchParams = useSearchParams();
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');

    const checkInDate = checkIn ? new Date(checkIn): null;
    const checkOutDate = checkOut ? new Date(checkOut): null;

    const cap = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const nights = checkInDate && checkOutDate
        ? Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const[room, setRoom] = useState<Room | null>(null);
    useEffect(() => {
        fetch(`http://localhost:8080/api/rooms/${params.id}`)
            .then(res => res.json())
            .then(data => {setRoom(data);
            console.log(data)
            });
    }, []);

    function onHover(e: React.MouseEvent<HTMLButtonElement>) {
        gsap.to(e.currentTarget, { y: -8, duration: 0.2, ease: "power2.out" });
    }
    function onLeave(e: React.MouseEvent<HTMLButtonElement>) {
        gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out" });
    }

    async function book() {
        if(!room) return;
        const token = localStorage.getItem('token');
        if(!token) {
            localStorage.setItem('pendingBooking', JSON.stringify({
                roomId: room.id,
                checkIn,
                checkOut
            }));
            router.push('/login');
            return;
        }
        const email = localStorage.getItem('customerEmail');
        const res = await fetch('http://localhost:8080/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                checkInDate: checkIn,
                checkOutDate: checkOut,
                customerEmail: email,
                room: { id: room.id },
                numOfGuests: 1,
                extraBed: extraBed
            })
        });
        if (res.ok) alert('Bokning bekräftad!');
    }

    if (!room) return <p>Laddar...</p>
    return (
        <main className="min-h-screen bg-[#F5F0E8] pt-24 p-8 text-gray-800 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1444181476367-d11d5ac302a7?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className="flex gap-8">
                <div className={"bg-[#C0522B] text-white rounded-2xl p-6 w-80"}>
                    <p className={"text-xl border-b border-white/40 pb-3 mb-4"}>Du har sökt</p>
                    <div className="flex gap-4">
                        <div className="bg-[#F5F0E8] text-[#C0522B] rounded-xl p-4 text-center flex-1">
                            <p className="bg-[#E8A090] -mx-4 -mt-4 px-4 py-2 rounded-t-xl mb-4">Incheckning</p>
                            <p className="text-3xl text-black">
                                {cap(checkInDate?.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) ?? '')}

                            </p>
                            <p>{cap(checkInDate?.toLocaleDateString('sv-SE', { weekday: 'long' }) ?? '')}</p>

                        </div>
                        <div className="bg-[#F5F0E8] text-[#C0522B] rounded-xl p-4 text-center flex-1">
                            <p className="bg-[#E8A090] -mx-4 -mt-4 px-4 py-2 rounded-t-xl mb-4">Utcheckning</p>
                            <p className="text-3xl text-black">
                                {cap(checkOutDate?.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }) ?? '')}
                            </p>
                            <p>{cap(checkOutDate?.toLocaleDateString('sv-SE', { weekday: 'long' }) ?? '')}</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm mt-4">
                        <p>Antal nätter:</p>
                        <p>{nights} {nights === 1 ? 'natt' : 'nätter'}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                        <p>Antal rum:</p>
                        <p>1 rum, 2 gäster</p>
                    </div>
                    <button onMouseEnter={onHover} onMouseLeave={onLeave} onClick={() => router.push('/rooms')} className="w-full mt-4 py-3 bg-white text-[#C0522B] rounded-full">Ändra sökning</button>
                </div>

                <div className="flex-1 bg-white rounded-2xl p-6">  {/* höger - rum-info */}
                    <div className="w-64 bg-gray-300 flex-shrink-0"/>
                    <div className="p-6 flex-1">
                        <h1 className="text-[#C0522B] text-4xl font-bold mb-2">Rum {room.roomNumber}</h1>
                        <p className="text-gray-600 mb-4">{room.description}</p>
                        <div className="flex-1 bg-white rounded-2xl overflow-hidden flex">
                            <img src={room.imgUrl} className="w-64 h-full object-cover flex-shrink-0"/>
                            <div className="p-6 flex-1">
                                <p className="text-2xl font-bold mt-4">Från {room.pricePerNight} SEK</p>
                                <p className="text-2xl font-bold mt-4">Från {room.pricePerNight} SEK</p>
                                {room.roomType === 'DOUBLE' && (
                                    <label className="flex items-center gap-2 mt-2">
                                        <input type="checkbox" checked={extraBed} onChange={e => setExtraBed(e.target.checked)} />
                                        Lägg till extrasäng
                                    </label>
                                )}
                                <button onMouseEnter={onHover} onMouseLeave={onLeave} onClick={book} className="bg-[#C0522B] text-white px-8 py-3 rounded-full mt-4">Boka</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    )
}
