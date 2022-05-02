import axios from "axios";

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