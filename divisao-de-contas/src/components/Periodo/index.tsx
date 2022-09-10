import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import arrowDown from "../../assets/arrow-down.png";
import { useEffect, useState } from "react";
import { Periodo } from "../../entities/Periodo";
import { BASE_URL } from "../../utils/requests";
import axios from "axios";

function PeriodoComponent() {
  const hoje = new Date();
  const umAnoAtras = new Date(new Date().setDate(hoje.getDate() - 365));

  const [dataInicio, setDataInicio] = useState(umAnoAtras);
  const [dataFim, setDataFim] = useState(hoje);

  const [periodos, setPeriodos] = useState<Periodo[]>([]);

  const getData = async () => {
    await axios.get(`${BASE_URL}/periodo`).then((response) => {
      setPeriodos(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="periodos-container">
      <div className="cards">
        <h2 className="periodos-title">Periodos</h2>
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
        <div>
          <table className="periodos-table">
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
                    <td>{periodo.isFechado ? "Fechado" : "Aberto"}</td>
                    <td>{getValorPeriodoFormatado(periodo)}</td>
                    <td className="column-hide-on-small-sizes">
                      <div className="view-button-container">
                        <div className="view-button">
                          <img src={arrowDown} alt="Visualizar" />
                        </div>
                      </div>
                    </td>
                  </tr>
                );

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
                  return (
                    monthNames[data.getMonth()] +
                    "/" +
                    data.getFullYear().toString()
                  );
                }
                function getValorPeriodoFormatado(periodo: Periodo) {
                  const valor = periodo.isFechado
                    ? periodo.valorTotal
                    : periodo.valorAtual;
                  return valor.toFixed(2);
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PeriodoComponent;
