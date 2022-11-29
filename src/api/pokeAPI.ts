import { createApiRequest } from "./axios";

class ApiCallCreator {
  private readonly entityType = "/pokemon"

  getPokemons(limit: number, offset?: number) {
    return createApiRequest(
      `${this.entityType}/?limit=${limit}&offset=${offset}`
    );
  }
  getPokemonByNameOrId(id: number | string) {
    return createApiRequest(`${this.entityType}/${id}/`);
  }
}

const pokeApi = new ApiCallCreator();
export default pokeApi;
