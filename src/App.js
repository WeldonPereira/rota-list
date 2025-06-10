import { useState } from "react";
import ListQuantifier from "./components/ListQuantifier";

function App() {
  const [itemList, setItemList] = useState("");
  const [submittedList, setSubmittedList] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSubmittedList(itemList);
    setItemList("");
  };

  if (submittedList) {
    return <ListQuantifier list={submittedList} />;
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-2xl mb-6 text-left text-zinc-950">
        Insira abaixo a versão mais atualizada da lista:
      </h1>
      <div className="mt-8">
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <label htmlFor="itemListInput" className="block mb-4 font-semibold">
            Lista:
            <input
              id="itemListInput"
              type="text"
              name="itemList"
              value={itemList}
              onChange={(e) => setItemList(e.target.value)}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg bg-gray-50 text-base focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </label>
          <input
            type="submit"
            value="Calcular"
            className="w-full mt-4 p-3 bg-blue-600 text-white font-semibold text-base rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          />
        </form>
      </div>
    </div>
  );
}

export default App;
