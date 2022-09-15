import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, Table } from "react-bootstrap";
import DeleteButton from "../../../components/DeleteButton/DeleteButton";
import ViewButton from "../../../components/ViewButton/ViewButton";
import { Categoria } from "../../../entities/Categoria";
import { BASE_URL } from "../../../utils/requests";
import CategoriaForm from "../CategoriaForm/CategoriaForm";

export default function CategoriaConponent() {
  const [categoriaParaAlterar, setCategoriaParaAlterar] = useState<Categoria>();
  const { showModal, handleShowModal, handleCloseModal } = useModal(
    setCategoriaParaAlterar
  );
  const { categorias, deletarCategoria } = useTable(showModal);

  console.log("Renderizou");

  return (
    <div className="pages-container">
      <div className="cards">
        <Button onClick={() => handleShowModal({ nome: "" })}>Cadastrar</Button>
        {renderModal(showModal, handleCloseModal, categoriaParaAlterar)}
        {renderTableCategoria(categorias, handleShowModal, deletarCategoria)}
      </div>
    </div>
  );
}

function useModal(setCategoriaParaAlterar: any) {
  const [showModal, setShowModal] = useState(false);

  function handleShowModal(categoria: Categoria) {
    if (categoria) {
      setCategoriaParaAlterar(categoria);
    }
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return { showModal, handleShowModal, handleCloseModal };
}

function renderModal(
  showModal: boolean,
  handleCloseModal: any,
  categoria: any
) {
  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de categorias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CategoriaForm
            handleCloseModal={handleCloseModal}
            categoriaParam={categoria}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

function useTable(showModal: boolean) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    if (showModal == false) {
      buscarCategorias();
    }
  }, [showModal]);

  async function buscarCategorias() {
    await axios
      .get(`${BASE_URL}/categoria`)
      .then((categorias) => setCategorias(categorias.data));
  }

  async function deletarCategoria(id: number) {
    if (id) {
      await axios
        .delete(`${BASE_URL}/categoria/${id}`)
        .then(() => buscarCategorias())
        .catch((error) => alert(error));
    }
  }

  return { categorias, deletarCategoria };
}

function renderTableCategoria(
  categorias: Categoria[],
  handleShowModal: Function,
  deletarCategoria: Function
) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Categoria</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => {
          return (
            <tr key={categoria.id}>
              <td>{categoria.nome}</td>
              <td>
                <ViewButton handle={() => handleShowModal(categoria)} />
              </td>
              <td>
                <DeleteButton handle={() => deletarCategoria(categoria.id)} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
