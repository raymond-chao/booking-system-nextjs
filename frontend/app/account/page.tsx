'use client';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';

type BookingStatus = 'CONFIRMED' | 'CANCELLED' | 'PENDING';
type Booking = {
    id: number;
    checkInDate: string;
    checkOutDate: string;
    bookingConfirmation: string;
    customerEmail: string;
    bookingStatus: BookingStatus;
    room: {
        id: number;
        roomNumber: string;
        imgUrl: string;
    }
}
type Customer = {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
}


export default function AccountPage() {
    const router = useRouter();
    const [booking, setBooking] = useState<Booking[]>([]);


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    useEffect(() => {
        const email = localStorage.getItem('customerEmail');
        fetch(`http://localhost:8080/api/bookings/customer/${email}`)
            .then(res => res.json())
        .then(data => setBooking(data));

    }, []);

    const [customer, setCustomer] = useState<Customer | null>(null);
    useEffect(() => {
        const id = localStorage.getItem('customerId');
        if(!id) return;
        fetch(`http://localhost:8081/api/customers/${id}`)
        .then(res => res.json())
        .then(data => setCustomer(data));
    }, []);

    async function deleteBooking(id: number) {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:8080/api/bookings/${id}`, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${token}`}
        });
        if (res.status === 401) {
            alert('Din session har gått ut, logga in igen');
            localStorage.clear();
            router.push('/login');
            return;
        }
        if (res.ok) {
            setBooking(booking.filter(b => b.id !== id));
        }
    }
    function logout() {
        localStorage.clear();
        router.push('/');
    }
    async function deleteAccount() {
        const id = localStorage.getItem('customerId');
        const res = await fetch(`http://localhost:8081/api/customers/${id}`, {
            method: 'DELETE'
        });
        if (res.ok) {
            localStorage.clear();
            router.push('/');
        }
    }



    return (
        <main className="min-h-screen bg-[#F5F0E8] pt-24 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-[#C0522B] text-3xl font-bold mb-6">Mitt konto</h1>
                {customer && (
                    <div className="bg-white text-[#C0522B] rounded-2xl p-6 mb-6 flex justify-between">
                        <div>
                        <p>{customer.name}</p>
                        <p>{customer.email}</p>
                        <p>{customer.phoneNumber}</p>
                    </div>
                    <button onClick={logout} className="bg-red-600 text-white px-6 py-2 rounded-full">Logga ut</button>
                    </div>
                )}
            </div>
            <h2 className="text-[#C0522B] text-2xl font-bold mb-4">Mina bokningar</h2>
            {booking.map(b => (
                <div key={b.id} className="bg-white rounded-2xl p-6 mb-4 flex justify-between items-center">
                    <img src={b.room.imgUrl} className="w-32 h-24 object-cover rounded-lg" />
                    <div>
                        <p className="text-sm text-gray-500">Incheckning</p>
                        <p className="font-bold text-lg text-[#C0522B]">{b.checkInDate}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Utcheckning</p>
                        <p className="font-bold text-lg text-[#C0522B]">{b.checkOutDate}</p>
                    </div>
                    <span className="bg-[#C0522B] text-white px-4 py-1 rounded-full text-sm">{b.bookingStatus}</span>
                    <button onClick={() => deleteBooking(b.id)} className="bg-red-600 text-white px-4 py-2 rounded-full">Ta bort</button>
                </div>
            ))}
            <div className="bg-white rounded-2xl p-4 mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-500">Radera ditt konto permanent</p>
                <button onClick={deleteAccount} className="bg-red-600 text-white px-4 py-2 rounded-full text-sm">Ta bort konto</button>
            </div>

        </main>

    )
}