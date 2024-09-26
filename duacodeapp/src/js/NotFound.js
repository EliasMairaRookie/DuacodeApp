import '../css/NotFound.css'


const NotFound = () => {
    return (
      <div className="not-found">
        <header className="headernotfound">
          <h1>Página No Encontrada</h1>
        </header>
        <div className="contentnotfound">
          <h2>404</h2>
          <p>Lo sentimos, la página que buscas no existe.</p>
          <a href="/" className="back-home">Regresar a Inicio</a>
        </div>
      </div>
    );
  };
  export default NotFound;