import { useState } from "react";
import { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./App.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    createStars();
  }, []);

  function createStars() {
    const container = document.querySelector(".container");
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * container.offsetWidth}px`;
      star.style.top = `${Math.random() * container.offsetHeight}px`;
      star.style.animationDuration = `${Math.random() * 3 + 1}s`;
      container.appendChild(star);
    }
  }

  async function SearchFunction() {
    if (input === "") {
      alert("Digite um CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      alert("CEP não encontrado ou inválido!");
      setInput("");
    }
  }



  return (
    <div className="container">
      <h1 className="tittle">CEP SEARCHER</h1>
      <div className="form">
        <input
          type="text"
          id="cep"
          placeholder="Type the CEP here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={SearchFunction}>
          <BiSearchAlt size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP {cep.cep}</h2>

          <span>Rua: {cep.logradouro}</span>
          <span>Numero ou Complemento: {cep.complemento}</span>
          <span>Bairro: {cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
