import { Navbar } from "react-bootstrap";
import logo from "../../assets/logo.png";
import "./styles.css";

export default function NavBar() {
  return (
    <Navbar bg="light">
      <img src={logo} alt="Divisão de Contas" />
      <div>
        <h1>Divisao de Contas</h1>
      </div>
    </Navbar>
  );
}
