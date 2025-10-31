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

  const homeStyle = {
    backgroundImage: `url('https://img.goodfon.com/original/1366x768/c/93/hi-tech-technology-projector-katushki-kinoplenka-movie-retro.jpg')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    minHeight: "100vh",
  };

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(5px)",
  };

  const footerStyle = {
    backgroundColor: "rgba(33, 37, 41, 0.7)",
    backdropFilter: "blur(5px)",
  };

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center py-5"
      style={homeStyle}
    >
      <h1 className="text-white">Catálogo de Filmes</h1>

      <div className="w-75 rounded border shadow p-4" style={cardStyle}>
        <div className="d-flex justify-content-end">
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

      <footer
        className="w-75 mt-4 text-white text-center p-3 rounded"
        style={footerStyle}
      >
        <p className="mb-0">
          &copy; {new Date().getFullYear()} atálogo de Filmes. PW2 - Avaliação
          II - SC301455X
        </p>
      </footer>
    </div>
  );
}
export default Home;
