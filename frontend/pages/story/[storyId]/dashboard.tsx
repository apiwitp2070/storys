import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { editStory, getStoryById } from '../../api/story'
import { addPlot, getPlotById } from '../../api/plot'
import Background from '../../components/Background'
import Header from '../../components/Header'
import Modal from '../../components/Modal'
import { ChevronRightIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const divStyle = 'bg-white border shadow-md rounded-md'
const divHeader = 'my-2 px-4 py-4 flex justify-between font-semibold'
const plotStyle =
  'select-none flex justify-between items-center border-b border-gray-300 px-4 py-2 transition hover:border-blue-500'
const plotItem = 'select-none border border-gray-200 rounded m-2 px-4 py-2'
const editButton = 'hover:text-blue-500 transition duration-300'

const Dashboard = () => {
  const router = useRouter()
  const [modal, setShowModal] = useState(0)
  const [showPlotItems, setShowPlotItems] = useState({ show: 0, plot: 0 })
  const [newValue, setNewValue] = useState('')
  const [story, setStory] = useState<any>()
  const [plotItems, setPlotItems] = useState<any>(null)

  const { storyId } = router.query

  useEffect(() => {
    fetchDashboard()
  }, [router.query])

  async function fetchDashboard() {
    if (Object.keys(router.query).length == 0) return
    const res = await getStoryById(storyId)
    setStory(res)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (modal == 1) handleEditStory(storyId)
    else if (modal == 2) handleAddPlot()
  }

  const handleEditStory = async (storyId: any) => {
    await editStory({
      storyId: storyId,
      title: newValue,
    })
    setShowModal(0)
    fetchDashboard()
  }

  const handleAddPlot = async () => {
    await addPlot({
      category: newValue,
      storyId: storyId,
    })
    setShowModal(0)
    fetchDashboard()
  }

  const handleClickPlot = async (plotId: number) => {
    if (showPlotItems.plot != plotId) {
      const res = await getPlotById(plotId)
      setPlotItems(res)
      showPlotItems.plot = plotId
    }
    setShowPlotItems({
      ...showPlotItems,
      show: showPlotItems.show == plotId ? 0 : plotId,
    })
  }

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Storys {story?.title ? `| ${story.title}` : ''}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Background />

      <div className="flex justify-between h-16 bg-white border shadow-md rounded mx-4 mt-4 px-4 py-2">
        <p className="py-2">{story?.title}</p>
        <span className="flex space-x-4">
          <button className={editButton} onClick={() => setShowModal(1)}>
            Edit
          </button>
          <span className="border-l my-2"></span>
          <button>Delete</button>
        </span>
      </div>

      <main className="p-4 grid grid-cols-3 space-x-4 h-full">
        <div className={divStyle}>
          <div className={divHeader}>
            <p className="uppercase">Plots</p>
            <button className={editButton} onClick={() => setShowModal(2)}>
              New
            </button>
          </div>
          <div style={{height: '65vh'}} className="flex flex-col space-y-2 overflow-y-auto">
            {story?.plot?.map(({ id, category }: any) => (
              <div key={id}>
                <div className={plotStyle}>
                  <Link href={`/story/${storyId}/plot/${id}`}>
                    <p className="cursor-pointer hover:text-blue-500">
                      {category}
                    </p>
                  </Link>
                  <ChevronRightIcon
                    onClick={() => handleClickPlot(id)}
                    className={
                      showPlotItems.show == id
                        ? 'cursor-pointer w-5 rotate-90 transition translate-y-0.5'
                        : 'cursor-pointer w-5 transition'
                    }
                  />
                </div>
                {showPlotItems.show == id && (
                  <div>
                    {showPlotItems.show == id &&
                      plotItems?.plot_items?.map(
                        ({ id, itemName, description }: any) => (
                          <div key={id} className={plotItem}>
                            <p>{itemName}</p>
                            <p className="text-xs">{description}</p>
                          </div>
                        )
                      )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={divStyle}>
          <div className={divHeader}>
            <p className="uppercase">Write</p>
            <button className={editButton}>New</button>
          </div>
        </div>

        <div className={divStyle}>
          <div className={divHeader}>
            <p className="uppercase">Organize</p>
            <button className={editButton}>New</button>
          </div>
        </div>
      </main>

      {modal == 1 && (
        <Modal
          title="Edit Story Title"
          setShowModal={setShowModal}
          onConfirm={() => handleEditStory(storyId)}
        >
          <form onSubmit={(e) => handleFormSubmit(e)} className="flex">
            <input
              onChange={(e) => setNewValue(e.target.value)}
              defaultValue={story?.title}
              placeholder="Enter new value"
              className="w-full m-4 px-2 py-1 place-self-center border rounded-md"
            />
          </form>
        </Modal>
      )}

      {modal == 2 && (
        <Modal
          title="Add new Plot"
          setShowModal={setShowModal}
          onConfirm={() => handleAddPlot()}
        >
          <form onSubmit={(e) => handleFormSubmit(e)} className="flex">
            <input
              onChange={(e) => setNewValue(e.target.value)}
              placeholder="Enter new plot category"
              className="w-full m-4 px-2 py-1 place-self-center border rounded-md"
            />
          </form>
        </Modal>
      )}

      <footer></footer>
    </div>
  )
}

export default Dashboard
