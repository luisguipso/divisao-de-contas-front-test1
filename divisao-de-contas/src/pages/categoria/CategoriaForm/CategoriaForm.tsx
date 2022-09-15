import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Categoria } from "../../../entities/Categoria";
import { BASE_URL } from "../../../utils/requests";

export default function categoriaForm({
  handleCloseModal,
  categoriaParam,
}: {
  handleCloseModal: any;
  categoriaParam: Categoria;
}) {
  const categoriaInitialValue: Categoria = categoriaParam
    ? categoriaParam
    : { nome: "" };
  const [categoria, setCategoria] = useState<Categoria>(categoriaInitialValue);

  function onChange(event: any) {
    const { name, value } = event.target;
    console.log("name " + name + " value " + value);
    setCategoria({ ...categoria, [name]: value });
  }

  function onSubmit(event: any) {
    event.preventDefault();
    cadastrarCategoria();
    handleCloseModal();
  }

  async function cadastrarCategoria() {
    await axios
      .post(`${BASE_URL}/categoria`, categoria)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o nome da categoria aqui."
          name="nome"
          onChange={onChange}
          value={categoria.nome}
        />
      </Form.Group>
      <Button type="submit">Salvar</Button>
    </Form>
  );
}
