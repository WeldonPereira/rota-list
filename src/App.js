import { useState } from "react";
import ListQuantifier from "./components/ListQuantifier";
import "./App.css";

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
    <div className="App">
      <h1>Insira abaixo a versão mais atualizada da lista:</h1>
      <div className="formContainer">
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <label htmlFor="itemListInput">
            Lista:
            <input
              id="itemListInput"
              type="text"
              name="itemList"
              value={itemList}
              onChange={(e) => setItemList(e.target.value)}
              required
            />
          </label>
          <input type="submit" value="Calcular" />
        </form>
      </div>
    </div>
  );
}

export default App;
