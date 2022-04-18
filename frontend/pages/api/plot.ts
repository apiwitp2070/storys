import axios from "axios";

export async function getPlots () {
  const response = await axios.get(`http://localhost:1337/api/plots?populate=*`);
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