import axios from 'axios'
import Cookies from 'js-cookie'

const API_URL = 'http://localhost:1337/api'

export async function getPlots() {
  const response = await axios.get(`${API_URL}/plots?populate=*`)
  return response.data.data.map(({ id, attributes }: any) => ({
    id,
    names: attributes.category,
  }))
}

export const getPlotById = async (plotId: any) => {
  const {
    data: { data },
  } = await axios.get(`${API_URL}/plots/${plotId}?populate=*`)
  return {
    id: data.id,
    category: data.attributes.category,
    plot_items: data.attributes.plot_items.data.map(
      ({ id, attributes }: any) => ({
        id,
        itemName: attributes.itemName,
        description: attributes.description,
        note: attributes.note,
        detail: attributes.detail,
        createdAt: attributes.createdAt,
      })
    ),
  }
}

export const addPlot = async ({ category, storyId }: any) => {
  const token = Cookies.get('token')
  await axios.post(
    `${API_URL}/plots`,
    {
      data: {
        category,
        story: storyId,
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

export const editPlot = async ({ plotId, category }: any) => {
  const token = Cookies.get('token')
  await axios.put(
    `${API_URL}/plots/${plotId}`,
    {
      data: {
        category,
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

export const getPlotItemById = async (itemId: any) => {
  const {
    data: { data },
  } = await axios.get(`${API_URL}/plot-items/${itemId}?populate=*`)
  return {
    id: data.id,
    itemName: data.attributes.itemName,
    description: data.attributes.description,
    note: data.attributes.note,
    detail: data.attributes.detail,
    tags: data.attributes.tags.data.map(({ id, attributes }: any) => ({
      id: id,
      tag: attributes.tag,
    })),
  }
}

export const addPlotItem = async ({
  itemName,
  description,
  note,
  detail,
  plotId,
}: any) => {
  const token = Cookies.get('token')
  await axios.post(
    `${API_URL}/plot-items`,
    {
      data: {
        itemName,
        description,
        note,
        detail,
        plot: plotId,
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

export const editPlotItem = async ({
  itemName,
  description,
  note,
  detail,
  itemId,
}: any) => {
  const token = Cookies.get('token')
  await axios.put(
    `${API_URL}/plot-items/${itemId}`,
    {
      data: {
        itemName,
        description,
        note,
        detail,
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
