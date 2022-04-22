import Head from 'next/head'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getUserStories } from '../api/story';
import Header from '../components/Header';

const Home = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    async function fetchStories() {
      const res = await getUserStories();
      setStories(res)
    }
    fetchStories();
  }, []);

  return (
    <div>
      <Head>
        <title>Storys</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <main>
        {stories.map(({id, title}: any) => (
          <Link href={`${id}/dashboard`}>
            <p key={id}>{title}</p>
          </Link>
        ))}
      </main>

      <footer>

      </footer>
    </div>
  )
}

export default Home