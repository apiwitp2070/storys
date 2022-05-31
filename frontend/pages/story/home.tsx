import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { addStory, getUserStories } from '../api/story'
import Header from '../components/Header'
import Modal from '../components/Modal'
import Background from '../components/Background'

const Home = () => {
  const [stories, setStories] = useState([])
  const [modal, setShowModal] = useState(false)
  const [title, setNewTitle] = useState('')

  useEffect(() => {
    fetchStories()
  }, [])

  async function fetchStories() {
    const res = await getUserStories()
    setStories(res)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    newStory()
  }

  const newStory = async () => {
    await addStory({
      title,
    })
    setShowModal(false)
    fetchStories()
  }

  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>Storys</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Background />

      <main className="my-4 place-self-center bg-white border rounded-md shadow-md w-2/5 h-full">
        <div className="flex justify-between items-center border-b">
          <p className="p-4 text-xl">Stories</p>
          <span className="p-4">
            <button
              className="hover:text-blue-500 hover:transition-100"
              onClick={() => setShowModal(true)}
            >
              New
            </button>
          </span>
        </div>
        <div className="p-4 space-y-2">
          {stories.map(({ id, title }: any) => (
            <Link key={id} href={`${id}/dashboard`}>
              <p className="cursor-pointer hover:text-blue-500 hover:translate-x-2 transition duration-300">
                {title}
              </p>
            </Link>
          ))}
        </div>
      </main>

      {modal && (
        <Modal
          title="Add new Story"
          setShowModal={setShowModal}
          onConfirm={newStory}
        >
          <form onSubmit={(e) => handleFormSubmit(e)} className="flex">
            <input
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter story name"
              className="w-full m-4 px-2 py-1 place-self-center border rounded-md"
            />
          </form>
        </Modal>
      )}

      <footer></footer>
    </div>
  )
}

export default Home
