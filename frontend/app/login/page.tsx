'use client';
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function login() {
        const res = await fetch(`http://localhost:8081/api/customers/login?email=${email}&password=${password}`);
        if (res.ok) {
            const data = await res.json();
            localStorage.setItem('customerId', data.customer.id);
            localStorage.setItem('customerEmail', data.customer.email);
            localStorage.setItem('token', data.token);
            const pending = localStorage.getItem('pendingBooking');
            if (pending) {
                const b = JSON.parse(pending);
                await fetch('http://localhost:8080/api/bookings', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.token}`
                    },
                    body: JSON.stringify({
                        checkInDate: b.checkIn,
                        checkOutDate: b.checkOut,
                        customerEmail: data.customer.email,
                        room: { id: b.roomId },
                        numOfGuests: 1
                    })
                });
                localStorage.removeItem('pendingBooking');
            }
            router.push("/account");
        } else{
            setError("Fel email eller Lösenord!");
        }
    }

    return (
        <main className="min-h-screen bg-[#F5F0E8] pt-24 p-8">
            <div className="max-w-xl mx-auto">
                <h2 className={"text-center text-[#C0522B] text-2xl mb-6"}>Logga in</h2>
                <div className="bg-[#EDE8D8] rounded-2xl p-6">
                    <form className={"flex flex-wrap gap-4"} onSubmit={async e => {
                        e.preventDefault();
                        await login();
                    }}>
                        <input className={"flex-1 p-3 rounded-lg border border-[#C0522B]/30 bg-white text-[#C0522B]"}
                               value={email} onChange={e => setEmail(e.target.value)}
                               placeholder="example@hotmail.com"/>
                        <input className={"flex-1 p-3 rounded-lg border border-[#C0522B]/30 bg-white text-[#C0522B]"}
                               type="password"
                               value={password} onChange={e => setPassword(e.target.value)} placeholder="*****"/>
                        {error && <p className="text-red-600 w-full text-center">{error}</p>}

                        <button
                            className={"w-full mt-6 py-3 bg-[#C0522B] text-white rounded-full hover:-translate-y-1 transition-transform"}
                            type="submit">Logga in
                        </button>
                    </form>
                    <p className="text-center mt-4 text-[#C0522B]">
                        Har du inget konto?{" "}
                        <Link href="/register" className="underline font-bold">Registrera dig</Link>
                    </p>
                </div>
            </div>
        </main>
    )
}
