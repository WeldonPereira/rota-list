import { useState } from "react";
import ListQuantifier from "./components/ListQuantifier";

function App() {
  const [itemList, setItemList] = useState("");
  const [submittedList, setSubmittedList] = useState("");
  const [showInfo, setShowInfo] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmittedList(itemList.trim());
    setItemList("");
  };

  const resetList = () => {
    setSubmittedList("");
  };

  if (submittedList) {
    return <ListQuantifier list={submittedList} onReset={resetList} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-zinc-800">
          Contador de Trajetos
        </h1>
        <button
          onClick={() => setShowInfo(true)}
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Sobre o projeto
        </button>
      </header>

      {showInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white max-w-lg w-full m-4 rounded-xl p-6 shadow-lg relative">
            <h2 className="text-xl font-semibold mb-4">📋 Sobre o Projeto</h2>
            <p className="text-zinc-700 text-sm mb-4">
              Esta ferramenta contabiliza automaticamente o número de pessoas
              que vão e voltam de dois destinos:
              <strong> UFPE</strong> e <strong>DERBY</strong>. Ela reconhece
              diferentes formas de escrita, mesmo com erros e abreviações, e
              exibe um resumo claro para facilitar a organização do transporte.
            </p>
            <button
              onClick={() => setShowInfo(false)}
              className="absolute top-3 right-3 text-zinc-500 hover:text-zinc-800 text-xl"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto">
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <label
            htmlFor="itemListInput"
            className="block text-sm font-semibold text-zinc-700 mb-2"
          >
            Insira a lista (em uma única linha):
          </label>
          <input
            id="itemListInput"
            type="text"
            name="itemList"
            value={itemList}
            onChange={(e) => setItemList(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-zinc-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: 1-Maria (ida/volta)UFPE, 2-João ida DERBY..."
          />

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-blue-600 text-white text-base font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Calcular
          </button>
        </form>
      </section>
    </div>
  );
}

export default App;
