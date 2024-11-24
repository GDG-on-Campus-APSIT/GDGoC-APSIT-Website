'use client';

import { useParams } from 'next/navigation';
import { EnhancedLeaderboard } from '@/components/leaderboard';
import { NavbarComponent } from '@/components/navbar';

export default function LeaderboardPage() {
  const { eventId } = useParams();
  
  return (
    <>
      <NavbarComponent/>
      <EnhancedLeaderboard 
        eventId={eventId} 
      />
    </>
  );
}
