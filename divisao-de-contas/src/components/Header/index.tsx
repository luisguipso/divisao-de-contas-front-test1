import logo from '../../assets/logo.png'
import './styles.css'

function Header(){
    return(
        <header>
            <img src={logo} alt="Divisão de Contas" />
            <div>
                <h1>Divisao de Contas</h1>
            </div>
        </header>
    )
}

export default Header