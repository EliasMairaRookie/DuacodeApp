import React, { useState } from 'react';
import '../css/ajustes.css';
import logo from '../imagenes/logo-duacode-negro.svg';


function Ajustes() {
  const [selectedOffice, setSelectedOffice] = useState('Galicia');

  const handleChange = (event) => {
    setSelectedOffice(event.target.value);
  };

  return (

    <div className='Padre'>
      <div className='cabecerajustes'></div>
    <div className="container">
      <aside className="sidebar">
      <Link to="/" className='nav-url'><img src={logo} alt="Logo" className='logo'/></Link>
        <ul>
          <li><Link to='/*'><strong>Cambiar de oficina</strong></Link></li>
          <li><Link to='/*'>Cuenta de administrador</Link></li>
          <li><Link to='/*'>etc</Link></li>
          <li><Link to='/*'>etc</Link></li>
        </ul>
      </aside>
      
      <main className="main-content">
        <h1>Cuenta de administardor
        </h1>
        <p>Selecciona de que oficina necesitas la información:</p>

        <form>
          <div>
            <label>
              <input
                type="radio"
                value="Galicia"
                checked={selectedOffice === 'Galicia'}
                onChange={handleChange}
              />
              Galicia
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                value="Valencia"
                checked={selectedOffice === 'Valencia'}
                onChange={handleChange}
              />
              Valencia
            </label>
          </div>
        </form>


      </main>
    </div>
    </div>
  );
}

export default Ajustes;
