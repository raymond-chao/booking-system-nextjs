'use client';
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginPage(){
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");

    async function login(){

        const res = await fetch(`http://localhost:8081/api/customers/login?email=${email}&password=${password}`, {
        });
        if (res.ok) {
            const customer = await res.json();
            localStorage.setItem('customerId', customer.id);
            localStorage.setItem('customerEmail', customer.email);
            await router.push("/rooms")
        }


    }
    return (
        <main className="min-h-screen bg-[#F5F0E8] pt-24 p-8">
            <div className="max-w-2xl mx-auto">
                <h2 className={"text-center text-[#C0522B] text-2xl mb-6"}>Gästinformation</h2>
                <div className="bg-[#EDE8D8] rounded-2xl p-6">
                    <form className={"flex flex-wrap gap-4"} onSubmit={async e => {
                        e.preventDefault();
                        await login()
                    }}>
                        <input className={"flex-1 p-3 rounded-lg border border-[#C0522B]/30 bg-white text-[#C0522B]"}
                               value={email} onChange={e => setEmail(e.target.value)}
                               placeholder="example@hotmail.com"/>
                        <input className={"flex-1 p-3 rounded-lg border border-[#C0522B]/30 bg-white text-[#C0522B]"}
                               value={password} onChange={e => setPassword(e.target.value)} placeholder="*****"/>
                        <button
                            className={"w-full mt-6 py-3 bg-[#C0522B] text-white rounded-full hover:-translate-y-1 transition-transform"}
                            type="submit">Login
                        </button>

                    </form>
                </div>
            </div>
        </main>
    )
}