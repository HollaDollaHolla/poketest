import Axios from "axios";

const api = Axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const createApiRequest = async (
  url: string
) => {
  try {
    const response = await api({
      url,
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
    return response.data;
  } catch (err: any) {
    console.error(err);
    throw new Error(err);
  }
};

export default api;
