import { useState } from "react";

export default function useModal(setEntityParaAlterar: any) {
  const [showModal, setShowModal] = useState(false);

  function handleShowModal(entity: any) {
    if (entity) {
      setEntityParaAlterar(entity);
    }
    setShowModal(true);
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  return { showModal, handleShowModal, handleCloseModal };
}
