'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SharePage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('🎉 Join the quiz challenge on Guhuza!');

  useEffect(() => {
    const raw = searchParams.get('msg');
    if (raw) {
      setMessage(decodeURIComponent(raw));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-900 p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Guhuza Score Share</h1>
      <p className="text-xl max-w-xl leading-relaxed">{message}</p>
      <a
        href="/quiz"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Try the Quiz
      </a>
    </div>
  );
}
