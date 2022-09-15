import axios from "axios";
import { useEffect, useState } from "react";
import { Categoria } from "../entities/Categoria";
import { BASE_URL } from "../utils/requests";

export default function useTableEntity(pagePath: string, showModal: boolean) {
  const [entities, setEntities] = useState<[]>([]);
  console.log(pagePath);
  useEffect(() => {
    if (showModal == false) {
      buscarEntities();
    }
  }, [showModal]);

  async function buscarEntities() {
    await axios
      .get(`${BASE_URL}/${pagePath}`)
      .then((categorias) => setEntities(categorias.data));
  }

  async function deletarEntity(id: number) {
    if (id) {
      await axios
        .delete(`${BASE_URL}/${pagePath}/${id}`)
        .then(() => buscarEntities())
        .catch((error) => alert(error));
    }
  }

  return { entities, deletarEntity };
}
