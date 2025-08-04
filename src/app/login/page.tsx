'use client';

import { useState, FormEvent} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, password}),
      });

      const data = await res.json();

      if (res.ok) {
        // Here we need to save the token in localstorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Then we redirect to the user profile or home page.
        router.push('/profile');

      } else {
        setError(data.message || 'There is an error in your request');
      }
    }catch (eror) {
      setError('It was not possible to login, please try again.');
    }finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          {error && (
              <p className={`mt-4 text-center font-medium ${error === 'Login successful!' ? 'text-green-600' : 'text-red-600'}`}> </p>
          )}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md transition-colors"
            >
              {isLoading ? 'Login ...' : 'Login'}
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-gray-600">
           Don&#39;t have and account yet?{' '}
          <Link href="/register" className="font-medium text-purple-600 hover:underline">
            Create One
          </Link>
        </div>


          {/*<button*/}
          {/*  type="submit"*/}
          {/*  className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-md transition-colors"*/}
          {/*>*/}
          {/*  Log In*/}
          {/*</button>*/}

        {/*{message && (*/}
        {/*  <div className={`mt-4 text-center font-medium ${message === 'Login successful!' ? 'text-green-600' : 'text-red-600'}`}>*/}
        {/*    {message}*/}
        {/*  </div>*/}
        {/*)}*/}


      </div>
    </div>
  );
} 