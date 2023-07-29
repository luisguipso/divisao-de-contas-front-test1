import { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { Despesa } from "../../../entities/Despesa";

export default function DespesaComponent() {
  const { despesas, despesaParaAlterar } = useTableDespesas();
  return (
    <div className="pages-container">
      <div className="cards">{renderTableDespesas(despesas)}</div>
      <div>{renderModalDespesa(despesaParaAlterar)}</div>
    </div>
  );
}

function renderTableDespesas(despesas: Despesa[]) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Data</th>
          <th>Categoria</th>
          <th>Descricao</th>
          <th>Valor</th>
          <th className="column-hide-on-small-sizes">Tipo</th>
          <th className="column-hide-on-medium-sizes">Dono</th>
        </tr>
      </thead>
      <tbody></tbody>
    </Table>
  );
}

function renderModalDespesa(despesa: any) {
  return <Modal></Modal>;
}

function useTableDespesas() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [despesaParaAlterar, setDespesaParaAlterar] = useState<Despesa>();
  return { despesas, despesaParaAlterar };
}

function useModalDespesas() {
  const [showModal, setShowModal] = useState(false);
}
