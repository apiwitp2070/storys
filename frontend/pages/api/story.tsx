import axios from "axios";
import { getMyId } from "./auth";

const API_URL = "http://localhost:1337/api";

export async function getStories () {
  const response = await axios.get(`${API_URL}/stories`);
  return response.data.data.map(({ id, attributes }: any) => ({
    id,
    title: attributes.title,
  }));
};

export async function getUserStories () {
  const user = await getMyId();
  return user?.stories;
};

export const getStoryById = async (storyId: any) => {
  const {
    data: {
      data,
    },
  } = await axios.get(`${API_URL}/stories/${storyId}?populate=*`);
  return {
    id: data.id,
    title: data.attributes.title,
    plot: data.attributes.plot.data.map(({ id, attributes }: any) => ({
      id,
      category: attributes.category,
    })),
  };
};