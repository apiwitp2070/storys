import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { addPlotItem, editPlot, getPlotById, getPlotItemById } from '../../../api/plot';
import Background from '../../../components/Background';
import Header from '../../../components/Header'
import Modal from '../../../components/Modal';
import { ChevronRightIcon } from '@heroicons/react/solid';

const divStyle = 'bg-white border shadow-md rounded-md';
const divHeader = 'my-2 px-4 py-4 flex justify-between font-semibold';
const plotStyle = 'select-none cursor-pointer flex justify-between items-center border-b border-gray-300 px-4 py-2 transition hover:border-blue-500';
const plotItem = 'select-none border border-gray-200 rounded m-2 px-4 py-2';
const editButton = 'hover:text-blue-500 transition duration-300';
const inputBox = 'border-b border-gray-400 focus:outline-none';

const Dashboard = () => {
  const router = useRouter();

  const [modal, setShowModal] = useState(0);
  const [newName, setNewName] = useState('');
  const [plot, setPlot] = useState<any>();
  const [newValue, setNewValue] = useState(
    {itemName: '', description: '', detail: '', note: '', tags: []});
  const [item, setItem] = useState(
    {id: 0, itemName: '', description: '', detail: '', note: '', tags: []});

  const { plotId } = router.query;

  async function fetchDashboard() {
    if (Object.keys(router.query).length == 0) return;
    const res = await getPlotById(plotId);
    setPlot(res);
  }

  useEffect(() => {
    fetchDashboard();
  }, [router.query]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (modal == 1) handleEditPlot(plotId);
    else if (modal == 3) handleAddPlotItem(plotId);
  }

  const handleEditPlot = async (plotId: any) => {
    await editPlot({
      plotId: plotId,
      category: newName,
    });
    setShowModal(0);
    fetchDashboard();
  }

  const handleSelectItem = async (itemId: number) => {
    if (itemId != item.id) {
      const res = await getPlotItemById(itemId);
      setItem(res);
      setShowModal(2);
      fetchDashboard();
    }
    else {
      setShowModal(modal == 0 ? 2 : 0);
    }
  }

  const handleAddPlotItem = async (plotId: any) => {
    await addPlotItem({
      itemName: newValue.itemName,
      description: newValue.description,
      note: newValue.note,
      detail: newValue.detail,
      plotId: plotId
    });
    fetchDashboard();
  }

  return (
    <div className='h-screen flex flex-col'>
      <Head>
        <title>Edit PLot {plot?.category ? `| ${plot.category}` : ''}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header/>

      <Background/>

      <div className='flex justify-between h-16 bg-white border shadow-md rounded mx-4 mt-4 px-4 py-2'>
        <span className='flex space-x-2 items-center'>
          <button 
            onClick={() => router.back()}
            className='scale-125 hover:text-blue-500'
          >
            &larr;
          </button>
          <p className='py-2'>
            {plot?.category}
          </p>
        </span>
        <span className='flex space-x-4'>
          <button className={editButton} onClick={() => setShowModal(1)}>Edit</button>
          <span className='border-l my-2'></span>
          <button>Delete</button>
        </span>
        
      </div>

      <main className='p-4 grid grid-cols-3 space-x-4 h-full'>
        <div className={divStyle}>
          <div className={divHeader}>
            <p className='uppercase'>Items</p>
            <button className={editButton} onClick={() => setShowModal(3)}>New</button>
          </div>
          <div className='flex flex-col space-y-2'>
            {plot?.plot_items?.map(({id, itemName, description}: any) => (
              <div key={id} className={plotItem} onClick={() => handleSelectItem(id)}>
                <p>{itemName}</p>
                <p className='text-xs'>{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={divStyle}>
          <div className={divHeader}>
            <p className='uppercase'>ITEM DETAIL</p>
          </div>
          {modal == 2 && 
            <>
              <span className='flex flex-row space-x-4'>
                {item.tags.map(({ id, tag }: any) => (
                  <p key={id}>{tag}</p>
                ))}
              </span>
              <p>{item.itemName}</p>
              <p>{item.description}</p>
              <p>{item.note}</p>
              <p>{item.detail}</p>
            </>
          }
        </div>

        {modal == 3 &&
          <div className={divStyle}>
            <div className={divHeader}>
              <p className='uppercase'>NEW ITEM</p>
            </div>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <p>Item Name</p>
              <input onChange={(e) => newValue.itemName = e.target.value} className={inputBox}></input>
              <p>Description</p>
              <input onChange={(e) => newValue.description = e.target.value} className={inputBox}></input>
              <p>Note</p>
              <input onChange={(e) => newValue.note = e.target.value} className={inputBox}></input>
              <p>Detail</p>
              <input onChange={(e) => newValue.detail = e.target.value} className={inputBox}></input>
              <button onClick={() => handleAddPlotItem(plotId)}>Add New Item</button>
            </form>
          </div>
        }
      </main>

      {modal == 1 &&
        <Modal
          title='Edit Plot Category Name'
          setShowModal={setShowModal}
          onConfirm={() => handleEditPlot(plotId)}
        >
          <form onSubmit={(e) => handleFormSubmit(e)} className='flex'>
            <input
              onChange={(e) => setNewName(e.target.value)}
              defaultValue={plot.category}
              placeholder='Enter new value'
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