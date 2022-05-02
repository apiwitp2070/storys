import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:1337/api";

export async function getPlots () {
  const response = await axios.get(`${API_URL}/plots?populate=*`);
  return response.data.data.map(({ id, attributes }: any) => ({
    id,
    names: attributes.category,
  }));
};

export const getPlotItemsById = async (plotId: any) => {
  const {
    data: {
      data,
    },
  } = await axios.get(`${API_URL}/plots/${plotId}?populate=*`);
  return {
    id: data.id,
    items: data.attributes.items.map(({ id, itemName, description }: any) => ({
      id,
      itemName,
      description
    })),
  };
};

export const addPlot = async ({
  category,
  storyId
}: any) => {
  const token = Cookies.get('token');
  await axios.post(
    `${API_URL}/plots`,
    {
      data :{
        category,
        story: {
          date: {
            id: storyId
          }
        },
        createdBy: "",
        updatedBy: "",
      }
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const editPlot = async ({
  plotId,
  category,
}: any) => {
  const token = Cookies.get('token');
  await axios.put(
    `${API_URL}/plots/${plotId}`,
    {
      data :{
        category,
        createdBy: "",
        updatedBy: "",
      }
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};