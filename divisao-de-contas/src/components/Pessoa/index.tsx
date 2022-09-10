import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Pessoa } from "../../entities/Pessoa";
import axios from "axios";
import { BASE_URL } from "../../utils/requests";

function PessoaComponent() {
  const pessoaInitialValue: Pessoa = {
    nome: "",
  };
  const [pessoa, setPessoa] = useState<Pessoa>(pessoaInitialValue);

  function onChange(event: any) {
    const { name, value } = event.target;
    console.log("nome: " + name + " valor: " + value);

    setPessoa({ ...pessoa, [name]: value });
    console.log(pessoa);
  }

  function onSubmit(event: any) {
    event.preventDefault();
    axios.post(`${BASE_URL}/pessoa`, pessoa);
  }

  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  useEffect(() => {
    axios.get(`${BASE_URL}/pessoa`).then((pessoas) => {
      setPessoas(pessoas.data);
    });
  }, []);

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
