import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/requests";

export default function useEntity(pagePath: string) {
  const [entities, setEntities] = useState<[]>([]);

  function buscarEntities() {
    axios
      .get(`${BASE_URL}${pagePath}`)
      .then((entities) => setEntities(entities.data))
      .catch((error) => alert(error));
  }

  async function deletarEntity(id: number) {
    if (id) {
      await axios
        .delete(`${BASE_URL}${pagePath}/${id}`)
        .then(() => buscarEntities())
        .catch((error) => alert(error));
    }
  }

  return { entities, buscarEntities, deletarEntity };
}
