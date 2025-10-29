import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../App";

function Read() {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h3>Detalhes do Filme</h3>
        <div className="mb-2">
          <strong>ID: {data.id}</strong>
        </div>
        <div className="mb-2">
          <strong>Nome: {data.nome}</strong>
        </div>
        <div className="mb-2">
          <strong>Gênero: {data.genero}</strong>
        </div>
        <div className="mb-3">
          <strong>Ano: {data.ano}</strong>
        </div>
        <Link to="/" className="btn btn-primary">
          Voltar
        </Link>
      </div>
    </div>
  );
}
export default Read;
