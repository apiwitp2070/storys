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
    <div className='border-b px-8 py-4 text-right'>
      {user ? (
        <div className="space-x-2 font-bold">
          <Link href='/dashboard'>
            <a>
              <span className="hover:opacity-70">
                FYNSPACE ID: {user.username}
              </span>
            </a>
          </Link>
          <span className="border-l border-gray-300" />
          <button onClick={handleLogout} className="font-bold hover:opacity-70">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="space-x-2 font-bold">
          <Link href="/auth/register">
            <span className="cursor-pointer hover:opacity-70">Sign Up</span>
          </Link>
          <span className="border-l border-gray-300" />
          <Link href="/auth/login">
            <span className="cursor-pointer hover:opacity-70">Sign In</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;