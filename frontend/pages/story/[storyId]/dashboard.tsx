import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { editStory, getStoryById } from '../../api/story';
import { getPlotItemsById } from '../../api/plot';
import Background from '../../components/Background';
import Header from '../../components/Header'
import Modal from '../../components/Modal';
import { ChevronRightIcon } from '@heroicons/react/solid';

const divStyle = 'bg-white border shadow-md rounded-md';
const divHeader = 'my-2 px-4 py-4 flex justify-between';
const plotStyle = 'select-none cursor-pointer flex justify-between items-center border-b border-gray-300 px-4 py-2 transition hover:border-blue-500';
const plotItem = 'select-none border border-gray-200 rounded m-2 px-4 py-2';

const Dashboard = () => {
  const router = useRouter();
  const [editModal, setShowEditModal] = useState(false);
  const [showPlotItems, setShowPlotItems] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [story, setStory] = useState<any>();
  const [plotItems, setPlotItems] = useState<any>(null);

  const { storyId } = router.query;

  async function fetchDashboard() {
    if (Object.keys(router.query).length == 0) return;
    const res = await getStoryById(storyId);
    setStory(res);
  }

  useEffect(() => {
    fetchDashboard();
  }, [router.query]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleEditStory(storyId);
  }

  const handleEditStory = async (storyId: any) => {
    await editStory({
      storyId: storyId,
      title: newTitle
    });
    setShowEditModal(false);
    fetchDashboard();
  }

  const handleClickPlot = async (plotId: number) => {
    if (!plotItems) {
      const res = await getPlotItemsById(plotId);
      setPlotItems(res);
    }
    setShowPlotItems(!showPlotItems);
  }

  return (
    <div className='h-screen flex flex-col'>
      <Head>
        <title>Storys {story?.title ? `| ${story.title}` : ''}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <Background/>

      <div className='flex justify-between h-16 bg-white border shadow-md rounded mx-4 mt-4 px-4 py-2'>
        <p className='py-2'>{story?.title}</p>
        <span className='flex space-x-4'>
          <button onClick={() => setShowEditModal(true)}>Edit</button>
          <span className='border-l my-2'></span>
          <button>Delete</button>
        </span>
        
      </div>

      <main className='p-4 grid grid-cols-3 space-x-4 h-full'>
        <div className={divStyle}>
          <div className={divHeader}>
            <p className='uppercase'>Plots</p>
            <span className='space-x-4'>
              <button>New</button>
              <button>Edit</button>
            </span>
          </div>
          <div className='flex flex-col space-y-2'>
            {story?.plot?.map(({id, category}: any) => (
              <div key={id}>
                <div onClick={() => handleClickPlot(id)} className={plotStyle}>
                  <p>
                    {category}
                  </p>
                  <ChevronRightIcon className={showPlotItems ? 'w-5 rotate-90 transition translate-y-0.5' : 'w-5 transition'}/>
                </div>
                {showPlotItems && plotItems?.items?.map(({id, itemName, description}: any) => (
                  <div key={id} className={plotItem}>
                    <p>{itemName}</p>
                    <p className='text-xs'>{description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={divStyle}>
          <div className={divHeader}>
            <p className='uppercase'>Write</p>
            <span className='space-x-4'>
              <button>New</button>
              <button>Edit</button>
            </span>
          </div>
        </div>

        <div className={divStyle}>
          <div className={divHeader}>
            <p className='uppercase'>Organize</p>
            <span className='space-x-4'>
              <button>New</button>
              <button>Edit</button>
            </span>
          </div>
        </div>
      </main>

      {editModal &&
        <Modal
          title='Add new Story'
          setShowModal={setShowEditModal}
          onConfirm={() => handleEditStory(storyId)}
        >
          <form onSubmit={(e) => handleFormSubmit(e)} className='flex'>
            <input
              onChange={(e) => setNewTitle(e.target.value)}
              defaultValue={story?.title}
              placeholder='Enter new story name'
              className='w-full m-4 px-2 py-1 place-self-center border rounded-md'
            />
          </form>
        </Modal>
      }

      <footer>

      </footer>
    </div>
  )
}

export default Dashboard
