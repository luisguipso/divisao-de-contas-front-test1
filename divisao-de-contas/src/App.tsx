import NavBar from "./components/NavBar/NavBar";
import PeriodoComponent from "./pages/periodo/Periodo/Periodo";
import PessoaComponent from "./pages/pessoa/Pessoa/Pessoa";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faEye } from "@fortawesome/free-solid-svg-icons";
library.add(faTrashCan, faEye);

function App() {
  return (
    <>
      <NavBar />
      <main>
        <section className="section-cards">
          <PessoaComponent />
          <PeriodoComponent />
        </section>
      </main>
    </>
  );
}

export default App;
