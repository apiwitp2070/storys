import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppContext } from '../../providers/AppProvider';
import { logout } from '../api/auth';

const Header = () => {
  const router = useRouter();
  const { user, setUser } = useAppContext();
  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };

  return (
    <div className='bg-white border-b px-4 py-4 text-right'>
      {user ? (
        <div className="space-x-2 font-semibold">
          <span>
            USER: {user.username}
          </span>
          <span className="border-l border-gray-300" />
          <Link href="/story/home">
            <span className="cursor-pointer hover:text-blue-500 transition duration-100">
              Home
            </span>
          </Link>
          <span className="border-l border-gray-300" />
          <button onClick={handleLogout} className="hover:text-blue-500 font-semibold transition duration-100">
            LOGOUT
          </button>
        </div>
      ) : (
        <div className="space-x-2 font-semibold uppercase">
          <Link href="/auth/login">
            <span className="cursor-pointer hover:text-blue-500 transition duration-100">Login</span>
          </Link>
          <span className="border-l border-gray-300" />
          <Link href="/auth/register">
            <span className="cursor-pointer hover:text-blue-500 transition duration-100">Register</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;