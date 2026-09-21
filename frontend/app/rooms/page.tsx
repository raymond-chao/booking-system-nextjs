'use client';
import { DayPicker, DateRange } from "react-day-picker"
import "react-day-picker/style.css"
import {useEffect, useState} from "react";
import {useRouter} from 'next/navigation';

import gsap from "gsap";

type Room = {
    id: number;
    roomNumber: string;
    beds: number;
    pricePerNight: number;
    description: string;
    imgUrl: string;
}

export default function RoomsPage() {
    const router = useRouter();
    const [period, setPeriod] = useState<DateRange | undefined>(undefined);
    const[rooms, setRooms] = useState<Room[]>([] );
    const[hasSearched, setSearched] = useState(false);
    const formatDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const nights = period?.from && period?.to
        ? Math.round((period.to.getTime() - period.from.getTime()) / (1000 * 60 * 60 * 24))
        : 0;
    const cap = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
    useEffect(() => {
        fetch("http://localhost:8080/api/rooms")
            .then(res => res.json())
            .then(data => console.log(data))
    }, []);
    async function search() {
        if (!period?.from || !period?.to) return;
        fetch(`http://localhost:8080/api/rooms/available?checkIn=${formatDate(period.from!)}&checkOut=${formatDate(period.to!)}`)
            .then(res => res.json())
            .then(data => setRooms(data))
            .then(() => setSearched(true))
    }
    function choose(roomId: number) {
        router.push(`/rooms/${roomId}?checkIn=${formatDate(period!.from!)}&checkOut=${formatDate(period!.to!)}`);
    }

    function onHover(e: React.MouseEvent<HTMLButtonElement>) {
        gsap.to(e.currentTarget, { y: -8, duration: 0.2, ease: "power2.out" });
    }
    function onLeave(e: React.MouseEvent<HTMLButtonElement>) {
        gsap.to(e.currentTarget, { y: 0, duration: 0.2, ease: "power2.out" });
    }

    return (
        <main className="relative min-h-screen flex items-center justify-center pt-24 bg-cover bg-center " style={{ backgroundImage: "url('https://images.unsplash.com/photo-1709809328185-ba9ee5a06121?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            <div className="absolute inset-0 bg-white/50" />
            <div className="relative pt-24 p-8 flex gap-8">
            {hasSearched? (
                <div className={"flex gap-8 w-full p-8 items-start"}>
                    <div className={"bg-[#C0522B] text-white rounded-2xl p-6 w-80"}>
                    <p className={"text-xl border-b border-white/40 pb-3 mb-4"}>Du har sökt</p>
                    <div className="flex gap-4">
                        <div className="bg-[#F5F0E8] text-[#C0522B] rounded-xl p-4 text-center flex-1">
                            <p className="bg-[#E8A090] -mx-4 -mt-4 px-4 py-2 rounded-t-xl mb-4">Incheckning</p>
                            <p className="text-3xl text-black">
                                {period?.from?.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
                            </p>
                            <p>{cap(period?.from?.toLocaleDateString('sv-SE', { weekday: 'long' }) ?? '')}</p>

                        </div>
                        <div className="bg-[#F5F0E8] text-[#C0522B] rounded-xl p-4 text-center flex-1">
                            <p className="bg-[#E8A090] -mx-4 -mt-4 px-4 py-2 rounded-t-xl mb-4">Utcheckning</p>
                            <p className="text-3xl text-black">
                                {period?.to?.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}
                            </p>
                            <p>{cap(period?.to?.toLocaleDateString('sv-SE', { weekday: 'long' }) ?? '')}</p>
                        </div>
                    </div>
                    <div className="flex justify-between text-sm mt-4">
                        <p>Antal nätter:</p>
                        <p>{nights} natt</p>
                    </div>
                    <div className="flex justify-between text-sm">
                        <p>Antal rum:</p>
                        <p>1 rum, 2 gäster</p>
                    </div>
                    <button onMouseEnter={onHover} onMouseLeave={onLeave} onClick={() => setSearched(false)} className="w-full mt-4 py-3 bg-white text-[#C0522B] rounded-full">Ändra sökning</button>
                    </div>
                    <div className={"flex-1"}>
                        {rooms.map(room => (
                            <div key={room.id} className={"bg-[#F5F0E8] rounded-2xl mb-4 flex overflow-hidden"}>
                                    <img src={room.imgUrl} className="w-64 h-48 object-cover flex-shrink-0" />
                                <div className={"p-6 flex flex-col justify-between flex-1"}>
                                    <div>
                                        <h2 className={"text-[#C0522B] text-2xl font-bold"}>Rum {room.roomNumber}</h2>
                                        <p className={"text-[#C0522B] text-sm mt-1"}>{room.description}</p>
                                    </div>
                                    <div className={"flex justify-between times-end"}>
                                        <div>
                                            <p className={"text-[#C0522B] text-xl font-bold mt-4 "}>Från {room.pricePerNight} SEK</p>
                                            <p className={"text-sm"}> för {nights}</p>
                                        </div>
                                        <button onMouseEnter={onHover} onMouseLeave={onLeave} onClick={() => choose(room.id)} className={"bg-[#C0522B] text-white px-6 py-2 rounded-full mt-2"}>Välj</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) :(
            <div className={"bg-[#C0522B] text-white rounded-2xl p-6 w-fit justify-center"}>
                <DayPicker
                    selected={period}
                    onSelect={setPeriod}
                    mode="range"
                    today={new Date()}
                    disabled={{ before: new Date() }}
                    style={{
                        '--rdp-accent-color': '#C0522B',
                        '--rdp-accent-background-color': 'rgba(192, 82, 43, 0.3)',
                    } as React.CSSProperties}
                />
                <div className="flex justify-between text-sm mt-4">
                    <p>{nights > 0 ? `${nights} nätter` : "Inget datum valt"}</p>
                    <p>Priser visas i SEK</p>
                </div>

                <select className={"w-full mt-4 p-3 rounded-lg bg-white text-gray-800"}>
                    <option>1 rum, 2 gäster</option>
                    <option>1 rum, 1 gäst</option>
                </select>

                <div className={"flex gap-2 mt-3 justify-center"}>
                    <button onMouseEnter={onHover} onMouseLeave={onLeave} onClick={search} className={"bg-[#E8A090] text-white px-10 rounded-full"}>Sök</button>
                </div>

            </div>
            )}
            </div>
        </main>
    )
}
