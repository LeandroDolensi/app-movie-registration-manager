import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import Create from "./components/Create";
import UpdatePage from "./components/UpdatePage";
import Read from "./components/Read";
import DeletePage from "./components/DeletePage";
import "bootstrap/dist/css/bootstrap.min.css";

export const API_URL = "https://6901eb2bb208b24affe43fdc.mockapi.io/movies";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Catálogo de Filmes
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Início
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">
                  Criar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/update">
                  Alterar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/delete">
                  Apagar
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update" element={<UpdatePage />} />
          <Route path="/delete" element={<DeletePage />} />
          <Route path="/read/:id" element={<Read />} />
        </Routes>
      </div>
      <footer>PW2 - Avaliação II - Leandro - SC301455X</footer>
    </BrowserRouter>
  );
}
export default App;
