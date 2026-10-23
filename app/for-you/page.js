'use client';
// The old "For you" tab now lives inside Help.
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ForYou() {
  const router = useRouter();
  useEffect(() => router.replace('/help'), [router]);
  return <div className="page" />;
}
