import Header from "./components/Header";
import PeriodoCard from "./components/PeriodoCard";

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="section-cards">
          <PeriodoCard />
        </section>
      </main>
    </>
  );
}

export default App;
