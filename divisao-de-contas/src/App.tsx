import Header from "./components/Header";
import PeriodoComponent from "./components/Periodo";
import PeriodoCard from "./components/PeriodoCard";
import PessoaComponent from "./components/Pessoa";
import "bootstrap/dist/css/bootstrap.min.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashCan, faEye } from "@fortawesome/free-solid-svg-icons";
library.add(faTrashCan, faEye);

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="section-cards">
          <PessoaComponent />
        </section>
      </main>
    </>
  );
}

export default App;
