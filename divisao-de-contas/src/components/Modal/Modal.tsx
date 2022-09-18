import { Modal } from "react-bootstrap";
import { Pessoa } from "../../entities/Pessoa";
import PessoaForm from "../../pages/pessoa/PessoaForm/PessoaForm";

export default function renderModal(
  tipoDeEntidades: string,
  showModal: boolean,
  handleCloseModal: any,
  entity: object,
  CustomForm: any
) {
  console.log("renderizou o modal");

  return (
    <div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de {tipoDeEntidades}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomForm
            handleCloseModal={handleCloseModal}
            entityParaAlterar={entity}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
