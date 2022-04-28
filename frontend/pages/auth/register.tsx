import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { registerUser } from '../api/auth';
import { useAppContext } from '../../providers/AppProvider';
import Head from 'next/head';

const formInput = 'border w-full px-2 py-1 focus:outline-none';

export default function register() {
  const router = useRouter();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAppContext();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await registerUser(username, email, password);
      // set authed user in global context object
      console.log(`user`, user);
      setUser(user);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
    router.push('/');
  };

  return (
    <div>
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mt-24 flex justify-center lg:mb-40 2xl:container 2xl:mx-auto">
        <div className="w-4/5 md:w-3/5">
          <div className="justify-between lg:flex items-center">
            <h1 className="text-2xl text-gray-700">
              Create Account
            </h1>
            <p className="text-sm text-gray-500">
              Already member?{' '}
              <span className="text-blue-600 hover:underline">
                <Link href="/auth/login">Sign In</Link>
              </span>{' '}
              here.
            </p>
          </div>
          <form
            className="border p-8 mt-6 shadow-md grid lg:grid-cols-2"
            onSubmit={handleRegister}
          >
            <div className="space-y-4 lg:pr-8">
              <div>
                <label className="block">Username</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="username"
                  className={formInput}
                />
              </div>
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
              <div>
                <label className="block">Confirm Password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className={formInput}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center mt-6 lg:mt-0 lg:border-l lg:pl-8">
              <div>
                <button
                  type="submit"
                  className="p-1 border border-black bg-white rounded mx-auto block w-full transition ease-out duration-100 hover:border-blue-600 hover:text-blue-600"
                >
                  {loading ? 'Loading..' : 'Sign Up'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}