import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Pessoa } from "../../../entities/Pessoa";
import { BASE_URL } from "../../../utils/requests";
import React, { Dispatch, SetStateAction } from "react";

function PessoaForm({
  showModal,
  pessoaParam,
}: {
  showModal: React.Dispatch<React.SetStateAction<boolean>>;
  pessoaParam: any;
}) {
  const pessoaInitialValue: Pessoa = pessoaParam
    ? pessoaParam
    : {
        nome: "",
      };
  const [pessoa, setPessoa] = useState<Pessoa>(pessoaInitialValue);

  function onSubmit(event: any) {
    event.preventDefault();
    cadastrarPessoa();
    showModal(false);
  }

  async function cadastrarPessoa() {
    await axios.post(`${BASE_URL}/pessoa`, pessoa).then((response) => {
      console.log(response);
    });
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
