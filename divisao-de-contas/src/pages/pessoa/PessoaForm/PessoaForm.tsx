import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Pessoa } from "../../../entities/Pessoa";
import { BASE_URL } from "../../../utils/requests";
import { PESSOA_PATH } from "../path";

const pessoaPath = "/pessoa";

function PessoaForm({
  handleCloseModal,
  entityParaAlterar,
}: {
  handleCloseModal: Function;
  entityParaAlterar: any;
}) {
  console.log("renderizou o form");

  const pessoaInitialValue: Pessoa = entityParaAlterar
    ? entityParaAlterar
    : {
        nome: "",
      };
  const [pessoa, setPessoa] = useState<Pessoa>(pessoaInitialValue);

  function onSubmit(event: any) {
    event.preventDefault();
    console.log(pessoa.nome);
    salvarPessoa();
    handleCloseModal();
  }

  function salvarPessoa() {
    axios
      .post(`${BASE_URL}${PESSOA_PATH}`, pessoa)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => alert(error));
  }

  function onChange(event: any) {
    const { name, value } = event.target;
    setPessoa({ ...pessoa, [name]: value });
  }

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nome:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o nome da pessoa aqui."
          name="nome"
          onChange={onChange}
          value={pessoa.nome}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Salvar
      </Button>
    </Form>
  );
}

export default PessoaForm;
