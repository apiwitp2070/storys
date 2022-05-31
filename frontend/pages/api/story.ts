import axios from 'axios'
import Cookies from 'js-cookie'
import { getMyId } from './auth'

const API_URL = 'http://localhost:1337/api'

export async function getStories() {
  const response = await axios.get(`${API_URL}/stories`)
  return response.data.data.map(({ id, attributes }: any) => ({
    id,
    title: attributes.title,
  }))
}

export async function getUserStories() {
  const user = await getMyId()
  return user?.stories
}

export const getStoryById = async (storyId: any) => {
  const {
    data: { data },
  } = await axios.get(`${API_URL}/stories/${storyId}?populate=*`)
  return {
    id: data.id,
    title: data?.attributes?.title,
    plot: data?.attributes?.plots?.data?.map(({ id, attributes }: any) => ({
      id,
      category: attributes.category,
    })),
  }
}

export const addStory = async ({ title }: any) => {
  const token = Cookies.get('token')
  const user = await getMyId()
  await axios.post(
    `${API_URL}/stories`,
    {
      data: {
        title,
        user: user.id,
        createdBy: '',
        updatedBy: '',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}

export const editStory = async ({ storyId, title }: any) => {
  const token = Cookies.get('token')
  await axios.put(
    `${API_URL}/stories/${storyId}`,
    {
      data: {
        title,
        createdBy: '',
        updatedBy: '',
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
}
