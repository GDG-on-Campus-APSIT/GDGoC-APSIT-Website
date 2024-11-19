"use client"

import EventDetails from '@/components/eventdetails'
import { useParams } from 'next/navigation';
import { NavbarComponent } from '@/components/navbar';

export default function EventDetailsPage() {
    const { eventId } = useParams();

    return (
        <>  
            <NavbarComponent/>
            <EventDetails eventId={eventId} />
        </>
    )
}
