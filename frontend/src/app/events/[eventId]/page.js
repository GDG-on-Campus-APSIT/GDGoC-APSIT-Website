"use client"

import EventDetails from '@/components/eventdetails'
import { useParams } from 'next/navigation';
import { NavbarComponent } from '@/components/navbar';

export default function eventDetailsPage() {
    const { eventId } = useParams();

    return (
        <>  
            <NavbarComponent/>
            <EventDetails eventId={eventId} />
        </>
    )
}
