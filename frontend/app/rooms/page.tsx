'use client';
import { DayPicker, DateRange } from "react-day-picker"
import "react-day-picker/style.css"
import {useEffect, useState} from "react";

type Room = {
    id: number;
    roomNumber: string;
    beds: number;
    pricePerNight: number;
    description: string;
}

export default function RoomsPage() {
    const [period, setPeriod] = useState<DateRange | undefined>(undefined);
    const[rooms, setRooms] = useState<Room[]>([] );
    const[hasSearched, setSearched] = useState(false);
    const formatDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const nights = period?.from && period?.to
        ? Math.round((period.to.getTime() - period.from.getTime()) / (1000 * 60 * 60 * 24))
        : 0;
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

    return (
        <main className="min-h-screen flex items-center justify-center pt-24 bg-cover bg-center bg-black/60" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1709809328185-ba9ee5a06121?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
            {hasSearched? (
                <p>Du har Sökt!</p>
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
                    <button onClick={search} className={"bg-[#E8A090] text-white px-10 rounded-full"}>Sök</button>
                </div>

            </div>
            )}
        </main>
    )
}
