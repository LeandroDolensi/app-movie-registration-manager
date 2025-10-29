import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

function DeletePage() {
  const [searchId, setSearchId] = useState("");
  const [movie, setMovie] = useState(null);
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
        setMovie(res.data);
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        setMovie(null);
        setMessage("Filme não encontrado. Verifique o ID e tente novamente.");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/${movie.id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setMessage("Erro ao apagar o filme.");
      });
  };

  if (!movie) {
    return (
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>Apagar Filme</h1>
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
        <h1>Confirmar Exclusão</h1>
        <p>Tem certeza que deseja apagar o filme abaixo?</p>
        <div className="mb-2">
          <strong>ID: {movie.id}</strong>
        </div>
        <div className="mb-2">
          <strong>Nome: {movie.nome}</strong>
        </div>
        <div className="mb-3">
          <strong>Gênero: {movie.genero}</strong>
        </div>
        <button onClick={handleDelete} className="btn btn-danger">
          Apagar
        </button>
        <Link to="/" className="btn btn-primary ms-3">
          Cancelar
        </Link>
        {message && <div className="alert alert-danger mt-3">{message}</div>}
      </div>
    </div>
  );
}

export default DeletePage;
