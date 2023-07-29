import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { Pessoa } from "../../../entities/Pessoa";
import ViewButton from "../../../components/ViewButton/ViewButton";
import DeleteButton from "../../../components/DeleteButton/DeleteButton";
import useEntity from "../../../customHooks/useEntity";
import useModalEntity from "../../../customHooks/useModalEntity";
import renderModal from "../../../components/Modal/Modal";
import PessoaForm from "../PessoaForm/PessoaForm";

const novaPessoa: Pessoa = { nome: "" };

export default function PessoaComponent() {
  console.log("renderizou a pagina");
  const pagePath = "/pessoa";
  const [pessoaParaAlterar, setPessoaParaAlterar] =
    useState<Pessoa>(novaPessoa);
  const { showModal, handleShowModal, handleCloseModal } =
    useModalEntity(setPessoaParaAlterar);
  const {
    entities: pessoas,
    buscarEntities: buscarPessoas,
    deletarEntity: deletarPessoa,
  } = useEntity(pagePath);

  useEffect(() => {
    console.log("chegou no useeffect, valor de showmodal: " + showModal);
    if (showModal === false) {
      buscarPessoas();
    }
  }, [showModal]);

  return (
    <div className="pages-container">
      <div className="cards">
        <Button onClick={() => handleShowModal(novaPessoa)}>Cadastrar</Button>
        {renderTablePessoa(pessoas, handleShowModal, deletarPessoa)}
        {renderModal(
          "pessoas",
          showModal,
          handleCloseModal,
          pessoaParaAlterar,
          PessoaForm
        )}
      </div>
    </div>
  );
}

function renderTablePessoa(
  pessoas: Pessoa[],
  handleShowModal: Function,
  deletarPessoa: Function
) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Visualizar</th>
          <th>Excluir</th>
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
  );
}
