import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Pessoa } from "../../entities/Pessoa";
import axios from "axios";
import { BASE_URL } from "../../utils/requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PessoaComponent() {
  const pessoaInitialValue: Pessoa = {
    nome: "",
  };
  const [pessoa, setPessoa] = useState<Pessoa>(pessoaInitialValue);

  function onChange(event: any) {
    const { name, value } = event.target;
    setPessoa({ ...pessoa, [name]: value });
  }

  function onSubmit(event: any) {
    event.preventDefault();
    cadastrarPessoa();
  }

  async function cadastrarPessoa() {
    await axios.post(`${BASE_URL}/pessoa`, pessoa).then((response) => {
      console.log(response);
      buscarPessoas();
      setPessoa(pessoaInitialValue);
    });
  }

  async function deletarPessoa(id: any) {
    if (id) {
      await axios
        .delete(`${BASE_URL}/pessoa/${id}`)
        .then((response) => {
          console.log(response);
        })
        .then(() => buscarPessoas());
    }
  }

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    buscarPessoas();
  }, []);

  async function buscarPessoas() {
    await axios.get(`${BASE_URL}/pessoa`).then((pessoas) => {
      setPessoas(pessoas.data);
    });
  }

  return (
    <div className="periodos-container">
      <div className="cards">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da pessoa aqui."
              name="nome"
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Cadastrar
          </Button>
        </Form>

        <Table striped responsive>
          <thead>
            <tr>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((pessoa) => {
              return (
                <tr key={pessoa.id}>
                  <td>{pessoa.id}</td>
                  <td>{pessoa.nome}</td>
                  <td>
                    <Button variant="white" onClick={() => setPessoa(pessoa)}>
                      <FontAwesomeIcon icon="eye" />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="white"
                      onClick={() => deletarPessoa(pessoa.id)}
                    >
                      <FontAwesomeIcon icon="trash-can" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default PessoaComponent;
