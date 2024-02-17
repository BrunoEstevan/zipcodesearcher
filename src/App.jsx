import { useState } from "react";
import { useEffect } from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./App.css";
import api from "./services/api";
import { cepMask } from "./cep";

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
  const conditionals = (e) => {
    if (e.key === "Enter") {
      SearchFunction();
    } else if (e.key === "Backspace" ) {
      if (input[input.length - 1] === '-'){
        setInput(setInput.slice(0, -3));

      } else {
        setInput(input.slice(0, -1));
      }
    }
  };

  function handleInputChange(e) {
    const inputValue = e.target.value;
    if (!/^\d*$/.test(inputValue)) {
      return;
    }
    const maxLength = 9;
    const maskedValue = cepMask(inputValue.slice(0, maxLength));
    setInput(maskedValue);
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
          onChange={handleInputChange}
          onKeyDown={conditionals}
        />
        <button className="buttonSearch" onClick={SearchFunction}>
          <BiSearchAlt size={25} color="#FFF" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2
            style={{
              border: "5px solid white",
              borderRadius: "10px",
              padding: "8px",
            }}
          >
            CEP {cep.cep}
          </h2>

          <span
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            Rua: {cep.logradouro}
          </span>
          {cep.complemento && (
            <span
              style={{
                border: "1px solid black",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              Numero ou Complemento: {cep.complemento}
            </span>
          )}
          <span
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            Bairro: {cep.bairro}
          </span>
          <span
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              padding: "5px",
            }}
          >
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
