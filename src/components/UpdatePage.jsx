import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

function UpdatePage() {
  const [searchId, setSearchId] = useState("");
  const [values, setValues] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!searchId) {
      setMessage("Por favor, digite um ID.");
      return;
    }
    axios
      .get(`${API_URL}/${searchId}`)
      .then((res) => {
        setValues(res.data);
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        setValues(null);
        setMessage("Filme não encontrado. Verifique o ID e tente novamente.");
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`${API_URL}/${values.id}`, values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  if (!values) {
    return (
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>Alterar Filme</h1>
          <div className="mb-3">
            <label htmlFor="id">Digite o ID do Filme:</label>
            <input
              type="text"
              name="id"
              className="form-control"
              placeholder="Digite o ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          {message && <div className="alert alert-danger">{message}</div>}
          <button onClick={handleSearch} className="btn btn-primary">
            Procurar
          </button>
          <Link to="/" className="btn btn-secondary ms-3">
            Cancelar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>
          Editando Filme: {values.nome} (ID: {values.id})
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              name="nome"
              className="form-control"
              placeholder="Digite o nome"
              value={values.nome}
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
              value={values.genero}
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
              value={values.ano}
              onChange={(e) => setValues({ ...values, ano: e.target.value })}
            />
          </div>
          <button className="btn btn-success">Alterar</button>
          <Link to="/" className="btn btn-primary ms-3">
            Cancelar
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UpdatePage;
