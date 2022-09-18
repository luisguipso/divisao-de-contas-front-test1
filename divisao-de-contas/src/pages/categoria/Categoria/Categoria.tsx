import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import DeleteButton from "../../../components/DeleteButton/DeleteButton";
import renderModal from "../../../components/Modal/Modal";
import ViewButton from "../../../components/ViewButton/ViewButton";
import useModalEntity from "../../../customHooks/useModalEntity";
import useTableEntity from "../../../customHooks/useTableEntity";
import { Categoria } from "../../../entities/Categoria";
import CategoriaForm from "../CategoriaForm/CategoriaForm";

export default function CategoriaConponent() {
  console.log("renderizou a pagina categoria");
  const pagePath = "categoria";
  const [categoriaParaAlterar, setCategoriaParaAlterar] = useState<Categoria>(
    {}
  );
  const { showModal, handleShowModal, handleCloseModal } = useModalEntity(
    setCategoriaParaAlterar
  );
  const {
    entities: categorias,
    buscarEntities: buscarCategorias,
    deletarEntity: deletarCategoria,
  } = useTableEntity(pagePath);

  useEffect(() => {
    console.log("chegou no useeffect, valor de showmodal: " + showModal);
    if (showModal === false) {
      buscarCategorias();
    }
  }, [showModal]);

  return (
    <div className="pages-container">
      <div className="cards">
        <Button onClick={() => handleShowModal({ nome: "" })}>Cadastrar</Button>
        {renderModal(
          "categorias",
          showModal,
          handleCloseModal,
          categoriaParaAlterar,
          CategoriaForm
        )}
        {renderTableCategoria(categorias, handleShowModal, deletarCategoria)}
      </div>
    </div>
  );
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
          <th>Visualizar</th>
          <th>Excluir</th>
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
