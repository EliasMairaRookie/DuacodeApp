import React from 'react';
import '../css/ajustes.css';
import logo from '../imagenes/logo-duacode-negro.svg';
import { Link } from 'react-router-dom';
import { useOffice } from './OfficeContext';

function Ajustes() {
  const { selectedOffice, setSelectedOffice } = useOffice(); // No uses useContext directamente, usa el hook personalizado

  const handleChange = (event) => {
    console.log(event.target.value)
    setSelectedOffice(event.target.value);
  };

  return (
    <div className='Padre'>
      <div className='cabecerajustes'></div>
      <div className="container">
        <aside className="sidebar">
          <Link to="/" className='nav-url'><img src={logo} alt="Logo" className='logo'/></Link>
          <ul>
            <li><strong>Cambiar de oficina</strong></li>
          </ul>
        </aside>
        <main className="main-content">
          <h1>Cambiar de oficina</h1>
          <p>Selecciona de qué oficina necesitas la información:</p>
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
