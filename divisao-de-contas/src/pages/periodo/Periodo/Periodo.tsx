import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import arrowDown from "../../../assets/arrow-down.png";
import { useEffect, useState } from "react";
import { Periodo } from "../../../entities/Periodo";
import { BASE_URL } from "../../../utils/requests";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import useModalEntity from "../../../customHooks/useModalEntity";
import renderModal from "../../../components/Modal/Modal";
import PeriodoForm from "../PeriodoForm/PeriodoForm";
import { PERIODO_PATH } from "../path";
import useEntity from "../../../customHooks/useEntity";

const novoPeriodo: Periodo = {
  mes: new Date(),
  inicio: new Date(),
  valorAtual: 0,
  isFechado: false,
  pagadores: [],
};

export default function PeriodoComponent() {
  const hoje = new Date();
  const umAnoAtras = new Date(new Date().setDate(hoje.getDate() - 365));
  const [dataInicio, setDataInicio] = useState(umAnoAtras);
  const [dataFim, setDataFim] = useState(hoje);

  const [periodoParaAlterar, setPeridoParaAlterar] =
    useState<Periodo>(novoPeriodo);
  const { showModal, handleShowModal, handleCloseModal } =
    useModalEntity(setPeridoParaAlterar);
  const {
    entities: periodos,
    buscarEntities: buscarPeriodos,
    deletarEntity: deletarPeriodo,
  } = useEntity(PERIODO_PATH);

  useEffect(() => {
    if (showModal === false) {
      buscarPeriodos();
    }
  }, [showModal]);

  return (
    <div className="pages-container">
      <div className="cards">
        <h2 className="periodos-title">Periodos</h2>
        <div>
          <Button onClick={() => handleShowModal(novoPeriodo)}>
            Cadastrar
          </Button>
          {renderModal(
            "periodos",
            showModal,
            handleCloseModal,
            periodoParaAlterar,
            PeriodoForm
          )}
          {renderFiltroPeriodos(dataInicio, setDataInicio, dataFim, setDataFim)}
          {renderTablePeriodos(periodos, handleShowModal, deletarPeriodo)}
        </div>
      </div>
    </div>
  );
}

function getMesFormatado(data: Date) {
  data = new Date(data);
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return monthNames[data.getMonth()] + "/" + data.getFullYear().toString();
}

function getValorDoPeriodoFormatado(periodo: Periodo) {
  const valor = periodo.isFechado ? periodo.valorTotal : periodo.valorAtual;
  if (valor) return valor.toFixed(2);

  return 0;
}
function renderFiltroPeriodos(
  dataInicio: Date,
  setDataInicio: Function,
  dataFim: Date,
  setDataFim: Function
) {
  return (
    <div>
      <div className="periodo-form-control-container">
        <label htmlFor="inicio">Inicio</label>
        <DatePicker
          id="fim"
          className="periodo-form-control"
          dateFormat="dd/MM/yyyy"
          selected={dataInicio}
          onChange={(date: Date) => setDataInicio(date)}
        />
      </div>
      <div className="periodo-form-control-container">
        <label htmlFor="fim">Fim</label>
        <DatePicker
          id="fim"
          className="periodo-form-control"
          dateFormat="dd/MM/yyyy"
          selected={dataFim}
          onChange={(date: Date) => setDataFim(date)}
        />
      </div>
    </div>
  );
}
function renderTablePeriodos(
  periodos: Periodo[],
  handleShowModal: Function,
  deletarPeriodo: Function
) {
  return (
    <Table striped responsive>
      <thead>
        <tr>
          <th>Periodo</th>
          <th className="column-hide-on-medium-sizes">Status</th>
          <th>Valor</th>
          <th className="column-hide-on-small-sizes">Visualizar</th>
        </tr>
      </thead>
      <tbody>
        {periodos.map((periodo) => {
          return (
            <tr key={periodo.id}>
              <td>{getMesFormatado(periodo.mes)}</td>
              <td className="column-hide-on-medium-sizes">
                {periodo.isFechado ? "Fechado" : "Aberto"}
              </td>
              <td>{getValorDoPeriodoFormatado(periodo)}</td>
              <td className="column-hide-on-small-sizes">
                <div className="view-button-container">
                  <div className="view-button">
                    <img src={arrowDown} alt="Visualizar" />
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
