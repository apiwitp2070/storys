import axios from "axios";

const API_URL = "http://localhost:1337/api";

export async function getPlots () {
  const response = await axios.get(`${API_URL}/plots?populate=*`);
  console.log(response.data.data)
  return response.data.data.map(({ id, attributes }: any) => ({
    id,
    names: attributes.category,
    items: attributes.item.map(({id, itemName, description}: any) => ({
        id,
        itemName: itemName,
        desc: description,
      })
    ),
  }));
};