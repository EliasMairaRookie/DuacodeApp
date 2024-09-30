import '../css/NotFound.css'
import { Link } from 'react-router-dom';


const NotFound = () => {
    return (
      <div className="not-found">
        <header className="headernotfound">
          <h1>Página No Encontrada</h1>
        </header>
        <div className="contentnotfound">
          <h2>404</h2>
          <p>Lo sentimos, la página que buscas no existe.</p>
          <Link to="/" className="back-home">Regresar a Inicio</Link>
        </div>
      </div>
    );
  };
  export default NotFound;