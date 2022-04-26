import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import BgGenerator from '../providers/ts/bg-gen';

const ButtonStyle = "p-1 border border-black bg-white rounded w-3/5 mx-auto transition ease-out duration-300 hover:border-blue-600 hover:text-blue-600"

const Homepage = () => {

  const [bg, setBg] = useState('');

  useEffect(() => {
    BgGenerator(setBg);
  }, []);

  return (
    <div>
      <Head>
        <title>Storys</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`-z-50 absolute top-0 h-screen w-screen ${bg}`}/>

      <main>
        <div className='flex flex-col mt-48 py-12 w-4/5 md:w-2/5 mx-auto space-y-12 border rounded-md bg-white'>
          <h1 className='text-4xl font-light text-center'>Storys</h1>
          <Link href='/auth/login'>
            <button className={ButtonStyle}>Login</button>
          </Link>
          <Link href='/auth/register'>
            <button className={ButtonStyle}>Regis</button>
          </Link>
        </div>
      </main>

      <footer>

      </footer>
    </div>
  )
}

export default Homepage