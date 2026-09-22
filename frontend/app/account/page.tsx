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
        const email = localStorage.getItem('customerEmail');
        fetch(`http://localhost:8080/api/bookings/customer/${email}`)
            .then(res => res.json())
        .then(data => setBooking(data));

        console.log(customer);

    }, []);

    const [customer, setCustomer] = useState<Customer | null>(null);
    useEffect(() => {
        const id = localStorage.getItem('customerId');
        const email = localStorage.getItem('customerEmail');

        fetch(`http://localhost:8081/api/customers/${id}`)
        .then(res => res.json())
        .then(data => setCustomer(data));
    }, []);

    return (
        <main className="min-h-screen bg-[#F5F0E8] pt-24 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-[#C0522B] text-3xl font-bold mb-6">Mitt konto</h1>
                {customer && (
                    <div className="bg-white text-[#C0522B] rounded-2xl p-6 mb-6">
                        <p className="text-m text-gray-500">Namn</p>
                        <p className="font-bold text-2xl mb-3">{customer.name}</p>
                        <p className="text-m text-gray-500">Email</p>
                        <p className="font-bold text-2xl mb-3">{customer.email}</p>
                        <p className="text-m text-gray-500">Telefon</p>
                        <p className="font-bold text-2xl">{customer.phoneNumber}</p>
                    </div>
                )}
            </div>
            {booking.map(b => (
                <div key={b.id} className="bg-white rounded-2xl p-6 mb-4">
                    <p>Incheckning: {b.checkInDate}</p>
                    <p>Utcheckning: {b.checkOutDate}</p>
                    <p>Status: {b.bookingStatus}</p>
                </div>
            ))}
        </main>

    )
}