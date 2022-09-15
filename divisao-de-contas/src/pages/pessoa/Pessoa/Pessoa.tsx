import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Pessoa } from "../../../entities/Pessoa";
import axios from "axios";
import { BASE_URL } from "../../../utils/requests";
import { Modal } from "react-bootstrap";
import PessoaForm from "../PessoaForm/PessoaForm";
import ViewButton from "../../../components/ViewButton/ViewButton";
import DeleteButton from "../../../components/DeleteButton/DeleteButton";

function PessoaComponent() {
  const [showModal, setShowModal] = useState(false);
  const [pessoaParaAlterar, setPessoaParaAlterar] = useState<Pessoa>();
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    if (showModal == false) {
      buscarPessoas();
    }
  }, [showModal]);

  console.log("Renderizou");

  function handleCloseModal() {
    setShowModal(false);
  }

  function handleShowModal(pessoa: Pessoa) {
    if (pessoa) {
      setPessoaParaAlterar(pessoa);
    }
    setShowModal(true);
  }

  async function deletarPessoa(id: any) {
    if (id) {
      await axios
        .delete(`${BASE_URL}/pessoa/${id}`)
        .then(() => buscarPessoas())
        .catch((error) => alert(error));
    }
  }

  async function buscarPessoas() {
    await axios
      .get(`${BASE_URL}/pessoa`)
      .then((pessoas) => setPessoas(pessoas.data));
  }

  return (
    <>
      <div className="pages-container">
        <div className="cards">
          <Button onClick={() => handleShowModal({ nome: "" })}>
            Cadastrar
          </Button>
          <Table striped responsive>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Visualizar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {pessoas.map((pessoa) => {
                return (
                  <tr key={pessoa.id}>
                    <td>{pessoa.nome}</td>
                    <td>
                      <ViewButton handle={() => handleShowModal(pessoa)} />
                    </td>
                    <td>
                      <DeleteButton handle={() => deletarPessoa(pessoa.id)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
        <div>
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Cadastro de pessoas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <PessoaForm
                showModal={setShowModal}
                pessoaParam={pessoaParaAlterar}
              />
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default PessoaComponent;
