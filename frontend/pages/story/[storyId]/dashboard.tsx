import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getStoryById } from '../../api/story';
import Header from '../../components/Header'

const divStyle = 'border shadow-md rounded-md'
const itemStyle = 'rounded border shadow-md mx-4 px-4 py-2'

const Dashboard = () => {
  const router = useRouter();
  const [story, setStory] = useState<any>();
  const [click, setClick] = useState(false);

  useEffect(() => {
    async function fetchDashboard() {
      const { storyId } = router.query;
      const res = await getStoryById(storyId);
      setStory(res);
    }
    fetchDashboard();
  }, []);
  
  const handleClickPlot = async () => {
    console.log('clicked')
    setClick(!click);
  }

  return (
    <div className='h-screen flex flex-col'>
      <Head>
        <title>Storys | {story?.title}</title>
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
            {story?.plot?.map(({id, category}: any) => (
              <div key={id} className={itemStyle}>
                <p onClick={handleClickPlot}>{category}</p>
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
