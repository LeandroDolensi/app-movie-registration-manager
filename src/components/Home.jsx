import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../App";

function Home() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    axios
      .get(API_URL)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const currentRecords = data.slice(firstIndex, lastIndex);

  const nPages = Math.ceil(data.length / recordsPerPage);

  const pageNumbers = Array.from({ length: nPages }, (_, i) => i + 1);

  function prePage(e) {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(e, n) {
    e.preventDefault();
    setCurrentPage(n);
  }

  function nextPage(e) {
    e.preventDefault();
    if (currentPage < nPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center py-5">
      <h1>Catálogo de Filmes</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          {/* Botão para navegar para a página de criação */}
          <Link to="/create" className="btn btn-success">
            Criar Novo Filme
          </Link>
        </div>
        <table className="table table-striped table-hover mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>
                  <Link to={`/read/${d.id}`} className="text-decoration-none">
                    {d.nome}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {nPages > 1 && (
          <nav className="mt-3">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={prePage}
                  aria-label="Previous"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              {pageNumbers.map((n) => (
                <li
                  className={`page-item ${currentPage === n ? "active" : ""}`}
                  key={n}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={(e) => changeCPage(e, n)}
                  >
                    {n}
                  </a>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === nPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={nextPage}
                  aria-label="Next"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <footer className="w-75 mt-4 bg-dark text-white text-center p-3 rounded">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Catálogo de Filmes. PW2 - Avaliação
          II - SC301455X
        </p>
      </footer>
    </div>
  );
}
export default Home;
