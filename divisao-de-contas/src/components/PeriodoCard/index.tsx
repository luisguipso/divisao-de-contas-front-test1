import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";
import arrowDown from "../../assets/arrow-down.png";

function PeriodoCard() {
  return (
    <div className="periodos-container">
      <div className="cards">
        <h2 className="periodos-title">Periodos</h2>
        <div>
          <div className="periodo-form-control-container">
            <label htmlFor="inicio">Inicio</label>
            <DatePicker
              id="inicio"
              className="periodo-form-control"
              dateFormat="dd/MM/yyyy"
              selected={new Date()}
              onChange={(date: Date) => {}}
            />
          </div>
          <div className="periodo-form-control-container">
            <label htmlFor="fim">Fim</label>
            <DatePicker
              id="fim"
              className="periodo-form-control"
              dateFormat="dd/MM/yyyy"
              selected={new Date()}
              onChange={(date: Date) => {}}
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
              <tr>
                <td>Maio</td>
                <td className="column-hide-on-medium-sizes">Fechado</td>
                <td>1201,52</td>
                <td className="column-hide-on-small-sizes">
                  <div className="view-button-container">
                    <div className="view-button">
                      <img src={arrowDown} alt="Visualizar" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Junho</td>
                <td className="column-hide-on-medium-sizes">Fechado</td>
                <td>2351,90</td>
                <td className="column-hide-on-small-sizes">
                  <div className="view-button-container">
                    <div className="view-button">
                      <img src={arrowDown} alt="Visualizar" />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Julho</td>
                <td className="column-hide-on-medium-sizes">Aberto</td>
                <td>6584,52</td>
                <td className="column-hide-on-small-sizes">
                  <div className="view-button-container">
                    <div className="view-button">
                      <img src={arrowDown} alt="Visualizar" />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PeriodoCard;
