import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppContext } from '../providers/AppProvider';
import { getPlots } from './api/plot';
import { logout } from './api/auth';
import Header from './components/Header'

const ButtonStyle = "p-1 border border-black rounded w-3/5 mx-auto transition ease-out duration-300 hover:border-blue-600 hover:text-blue-600"
const divStyle = 'border shadow-md rounded-md'
const itemStyle = 'rounded border shadow-md mx-4 px-4 py-2'

const Dashboard = () => {
  const { user, setUser } = useAppContext();
  const router = useRouter();
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    async function fetchPlots() {
      console.log('hello')
      const res = await getPlots();
      setPlots(res)
    }
    fetchPlots();
    console.log('fetch')
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    router.push('/');
  };
  
  return (
    <div className='h-screen flex flex-col'>
      <Head>
        <title>Storys</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main className='p-4 grid grid-cols-3 space-x-4 h-full'>

        <div className={divStyle}>
          <div className='mt-2 px-4 py-4 flex justify-between'>
            <p className='uppercase'>Plots</p>
            <span className='space-x-4'>
              <button>New</button>
              <button>Edit</button>
            </span>
          </div>
          <div className='flex flex-col space-y-2'>
            {plots.map(({id, names, items}: any) => (
              <div key={id} className={itemStyle}>
                <p>{names}</p>
                <div>
                  {items.map(({id, itemName, desc}: any) => (
                    <div key={id} className={itemStyle}>
                      <p>{itemName}</p>
                      <p>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={divStyle}>
          <div className='mt-2 px-4 py-4 flex justify-between'>
            <p className='uppercase'>Write</p>
            <span className='space-x-4'>
              <button>New</button>
              <button>Edit</button>
            </span>
          </div>
        </div>

        <div className={divStyle}>
          <div className='mt-2 px-4 py-4 flex justify-between'>
            <p className='uppercase'>Organize</p>
            <span className='space-x-4'>
              <button>New</button>
              <button>Edit</button>
            </span>
          </div>
        </div>
      </main>

      <footer>

      </footer>
    </div>
  )
}

export default Dashboard
