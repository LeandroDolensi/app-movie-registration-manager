import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

function Create() {
  const [values, setValues] = useState({
    nome: "",
    genero: "",
    ano: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(API_URL, values)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Adicionar Filme</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              placeholder="Digite o nome"
              onChange={(e) => setValues({ ...values, nome: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="genero">Gênero:</label>
            <input
              type="text"
              name="genero"
              className="form-control"
              placeholder="Digite o gênero"
              onChange={(e) => setValues({ ...values, genero: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ano">Ano:</label>
            <input
              type="text"
              name="ano"
              className="form-control"
              placeholder="Digite o Ano"
              onChange={(e) => setValues({ ...values, ano: e.target.value })}
            />
          </div>
          <button className="btn btn-success">Criar</button>
          <Link to="/" className="btn btn-primary ms-3">
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Create;
