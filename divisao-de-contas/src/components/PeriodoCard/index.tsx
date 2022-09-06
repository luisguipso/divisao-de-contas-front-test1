import './styles.css'

function PeriodoCard(){
    return(
        <div className="periodos-container">
                <div className="periodos-card">
                    <h2 className="periodos-title">Periodos</h2>
                    <ul>
                        <li>
                            <div className="periodo-form-control-container">
                                <h5>março 2022</h5>
                                <h5>R$ 400,00</h5>
                            </div>
                        </li>
                        <li>
                            <div className="periodo-form-control-container">
                                <h5>março 2022</h5>
                                <h5>R$ 1200,00</h5>
                            </div>
                        </li>
                        <li>
                            <div className="periodo-form-control-container">
                                <h5>março 2022</h5>
                                <h5>R$ 1300,00</h5>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
    )
}

export default PeriodoCard