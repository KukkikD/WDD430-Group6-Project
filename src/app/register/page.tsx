'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the registration choice page
    router.push('/register-choice');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="text-center">
        <p className="text-stone-600">Redirecting to registration...</p>
      </div>
    </div>
  );
}
