import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import {
  addPlotItem,
  editPlot,
  editPlotItem,
  getPlotById,
  getPlotItemById,
} from '../../../api/plot'
import { getTags } from '../../../api/tag'
import Background from '../../../components/Background'
import Header from '../../../components/Header'
import Modal from '../../../components/Modal'

const divStyle = 'p-4 bg-white border shadow-md rounded-md'
const divHeader = 'my-2 flex justify-between font-semibold'
const plotItem =
  'select-none border border-gray-200 rounded mt-2 px-4 py-2 hover:text-blue-500 hover:border-blue-500'
const itemSection = 'text-xs mt-3'
const editButton = 'hover:text-blue-500 transition duration-300'
const inputBox =
  'mb-4 py-1 border-b border-gray-400 focus:outline-none focus:border-blue-500'

const Dashboard = () => {
  const router = useRouter()

  const [modal, setShowModal] = useState(0)
  const [newName, setNewName] = useState('')
  const [plot, setPlot] = useState<any>()
  const [tags, setTags] = useState([{ id: 0, tag: '' }])
  const [filteredTags, setFilteredTags] = useState([{ id: 0, tag: '' }])
  const newValue = {
    itemName: '',
    description: '',
    detail: '',
    note: '',
    tags: [{ id: 0, tag: '' }],
  }
  const [item, setItem] = useState({
    id: 0,
    itemName: '',
    description: '',
    detail: [''],
    note: '',
    tags: [{ id: 0, tag: '' }],
  })

  const { plotId } = router.query

  useEffect(() => {
    fetchDashboard()
    fetchTags()
  }, [router.query])

  async function fetchDashboard() {
    if (Object.keys(router.query).length == 0) return
    const res = await getPlotById(plotId)
    setPlot(res)
  }

  async function fetchTags() {
    if (Object.keys(router.query).length == 0) return
    const res = await getTags()
    setTags(res)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (modal == 1) handleEditPlot(plotId)
    else if (modal == 3) handleAddPlotItem(plotId)
    else if (modal == 4) handleEditPlotItem(item.id)
  }

  const handleEditPlot = async (plotId: any) => {
    await editPlot({
      plotId: plotId,
      category: newName,
    })
    setShowModal(0)
    fetchDashboard()
  }

  const handleSelectItem = async (itemId: number) => {
    if (itemId != item.id) {
      const res = await getPlotItemById(itemId)
      setItem(res)
      setShowModal(2)
    } else {
      setShowModal(modal == 0 ? 2 : 0)
    }
  }

  const handleSelectEditItem = () => {
    setShowModal(4)
    handleSetTags()
  }

  const handleSetTags = () => {
    const newTagsArr = tags.filter((i) => !item.tags.find((f) => f.id === i.id))
    setFilteredTags(newTagsArr)
  }

  const handleAddPlotItem = async (plotId: any) => {
    await addPlotItem({
      itemName: newValue.itemName,
      description: newValue.description,
      note: newValue.note,
      detail: newValue.detail,
      plotId: plotId,
    })
    setShowModal(0)
    fetchDashboard()
  }

  const handleEditPlotItem = async (itemId: any) => {
    await editPlotItem({
      itemId: itemId,
      itemName: newValue.itemName ? newValue.itemName : item.itemName,
      description: newValue.description
        ? newValue.description
        : item.description,
      note: newValue.note ? newValue.note : item.note,
      detail: newValue.detail ? newValue.detail : item.detail,
    })
    setShowModal(0)
    fetchDashboard()
  }

  return (
    <div className="h-screen flex flex-col">
      <Head>
        <title>Edit PLot {plot?.category ? `| ${plot.category}` : ''}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Background />

      <div className="flex justify-between h-16 bg-white border shadow-md rounded mx-4 mt-4 px-4 py-2">
        <span className="flex space-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="scale-125 hover:text-blue-500"
          >
            &larr;
          </button>
          <p className="py-2">{plot?.category}</p>
        </span>
        <span className="flex space-x-4">
          <button className={editButton} onClick={() => setShowModal(1)}>
            Edit
          </button>
          <span className="border-l my-2"></span>
          <button>Delete</button>
        </span>
      </div>

      <main className="p-4 grid grid-cols-3 space-x-4 h-full overflow-auto">
        <div className={divStyle}>
          <div className={divHeader}>
            <p className="uppercase">Items</p>
            <button className={editButton} onClick={() => setShowModal(3)}>
              New
            </button>
          </div>
          <div className="flex flex-col space-y-2 h-112 overflow-auto">
            {plot?.plot_items
              ?.sort((a: any, b: any) => a.id - b.id)
              .map(({ id, itemName, description }: any) => (
                <div
                  key={id}
                  className={plotItem}
                  onClick={() => handleSelectItem(id)}
                >
                  <p>{itemName}</p>
                  <p className="text-xs">{description}</p>
                </div>
              ))}
          </div>
        </div>

        <div className={divStyle}>
          <div className={divHeader}>
            <p className="uppercase">ITEM DETAIL</p>
          </div>
          {modal == 2 ? (
            <div className="h-112 overflow-auto">
              <span className="mt-2 flex flex-row space-x-2">
                {item.tags.map(({ id, tag }: any) => (
                  <p key={id} className="px-2 border border-black rounded-full">
                    {tag}
                  </p>
                ))}
              </span>
              <div className="flex flex-col mt-4">
                <p className={itemSection}>Name</p>
                <p>{item.itemName ? item.itemName : '-'}</p>
                <p className={itemSection}>Description</p>
                <p>{item.description ? item.description : '-'}</p>
                <p className={itemSection}>Note</p>
                <p>{item.note ? item.note : '-'}</p>
                <p className={itemSection}>Detail</p>
                <p>{item.detail ? item.detail : '-'}</p>
                <button
                  className="mt-8 py-1 border border-black rounded-md hover:border-blue-500 hover:text-blue-500"
                  onClick={() => handleSelectEditItem()}
                >
                  Edit Item Detail
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-gray-500">
              Item details will be shown here
            </p>
          )}
        </div>

        {modal == 3 && (
          <div className={divStyle}>
            <div className={divHeader}>
              <p className="uppercase">NEW ITEM</p>
            </div>
            <form
              className="flex flex-col"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <p className={itemSection}>Item Name</p>
              <input
                onChange={(e) => (newValue.itemName = e.target.value)}
                className={inputBox}
              ></input>
              <p className={itemSection}>Description</p>
              <input
                onChange={(e) => (newValue.description = e.target.value)}
                className={inputBox}
              ></input>
              <p className={itemSection}>Note</p>
              <input
                onChange={(e) => (newValue.note = e.target.value)}
                className={inputBox}
              ></input>
              <p className={itemSection}>Detail</p>
              <input
                onChange={(e) => (newValue.detail = e.target.value)}
                className={inputBox}
              ></input>
              <button
                className="mt-8 py-1 border border-black rounded-md hover:border-blue-500 hover:text-blue-500"
                type="submit"
              >
                Add New Item
              </button>
            </form>
          </div>
        )}

        {modal == 4 && (
          <div className={divStyle}>
            <div className={divHeader}>
              <p className="uppercase">EDIT ITEM</p>
            </div>
            <form
              className="h-112 flex flex-col overflow-auto"
              onSubmit={(e) => handleFormSubmit(e)}
            >
              <p className={itemSection}>Item Name</p>
              <input
                defaultValue={item.itemName}
                onChange={(e) => (newValue.itemName = e.target.value)}
                className={inputBox}
              ></input>
              <p className={itemSection}>Description</p>
              <input
                defaultValue={item.description}
                onChange={(e) => (newValue.description = e.target.value)}
                className={inputBox}
              ></input>
              <p className={itemSection}>Note</p>
              <input
                defaultValue={item.note}
                onChange={(e) => (newValue.note = e.target.value)}
                className={inputBox}
              ></input>
              <p className={itemSection}>Detail</p>
              <input
                defaultValue={item.detail}
                onChange={(e) => (newValue.detail = e.target.value)}
                className={inputBox}
              ></input>
              <div>
                <p>Current Tags</p>
                <span className="mt-2 flex flex-row space-x-2">
                  {item.tags.map(({ id, tag }: any) => (
                    <p
                      key={id}
                      className="px-2 border border-black rounded-full"
                    >
                      {tag}
                    </p>
                  ))}
                </span>
                <p>Add Tags</p>
                <span className="mt-2 flex flex-row space-x-2">
                  {filteredTags.map(({ id, tag }: any) => (
                    <p
                      key={id}
                      className="px-2 border border-black rounded-full"
                    >
                      {tag}
                    </p>
                  ))}
                </span>
              </div>
              <button
                className="mt-8 py-1 border border-black rounded-md hover:border-blue-500 hover:text-blue-500"
                type="submit"
              >
                Update Item Details
              </button>
            </form>
          </div>
        )}
      </main>

      {modal == 1 && (
        <Modal
          title="Edit Plot Category Name"
          setShowModal={setShowModal}
          onConfirm={() => handleEditPlot(plotId)}
        >
          <form onSubmit={(e) => handleFormSubmit(e)} className="flex">
            <input
              onChange={(e) => setNewName(e.target.value)}
              defaultValue={plot.category}
              placeholder="Enter new value"
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
