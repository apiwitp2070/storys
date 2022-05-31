import axios from "axios"

const API_URL = 'http://localhost:1337/api'

export async function getTags() {
  const response = await axios.get(`${API_URL}/tags`)
  return response.data.data.map(({ id, attributes }: any) => ({
    id,
    tag: attributes.tag,
  }))
}