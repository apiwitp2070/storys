import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { loginUser } from '../api/auth';
import { useAppContext } from '../../providers/AppProvider';
import Head from 'next/head';

const formInput = 'border w-full px-2 py-1 focus:outline-none';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const { setUser, isAuthenticated } = useAppContext();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      setUser(user);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    router.push('/story/home');
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/story/home'); // redirect if you're already logged in
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="mt-24 flex justify-center lg:mb-48 2xl:container 2xl:mx-auto">
        <div className="w-4/5 md:w-3/5">
          <div className="justify-between lg:flex items-center">
            <h1 className="text-2xl text-gray-700">
              Sign in
            </h1>
            <p className="text-sm text-gray-500">
              No account?{' '}
              <span className="text-blue-600 hover:underline">
                <Link href="/auth/register">Sign Up</Link>
              </span>{' '}
              here.
            </p>
          </div>
          <form
            className="border p-8 mt-6 shadow-md grid lg:grid-cols-2"
            onSubmit={handleLogin}
          >
            <div className="space-y-4 lg:pr-8">
              <div>
                <label className="block">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className={formInput}
                />
              </div>
              <div>
                <label className="block">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className={formInput}
                />
              </div>
              <div className="text-right text-sm text-blue-600 hover:underline">
                <Link href={'/auth/forgotpassword'}>
                  <a>Forgot Password</a>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-6 lg:mt-0 lg:border-l lg:pl-8">
              <button
                className="p-1 border border-black bg-white rounded mx-auto block w-full transition ease-out duration-100 hover:border-blue-600 hover:text-blue-600"
                type="submit"
              >
                {loading ? 'Loading..' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}