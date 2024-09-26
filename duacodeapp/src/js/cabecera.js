import '../css/cabecera.css';
import logo from '../imagenes/logo-duacode-negro.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';

const Cabecera = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(prevState => !prevState);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="div-logo">
          <a href="/" className='nav-url'>
            <img src={logo} alt="Logo" className='logo' />
          </a>
        </div>
        <div className="icon">
          <a href="/ajustes" className='nav-url'>
            <FontAwesomeIcon icon={faBars} className='icono' />
          </a>
        </div>
      </div>

      <nav className="nav-menu">
        <div className="menu-item">
          <a href="/*" className='nav-url'>Empleados</a>
        </div>
        {/* Empresa con submenú */}
        <div className={`menu-item-empresa ${isSubmenuOpen ? 'bold' : ''}`} onClick={toggleSubmenu}>
          <span>Empresa</span>
          <div className={`submenu ${isSubmenuOpen ? 'active' : ''}`}>
            <div className="submenu-item">
              <a href='/*' className='nav-url'>Eventos</a>
            </div>
            <div className="submenu-item">
              <a href='/*' className='nav-url'>Noticias y comunicados</a>
            </div>
            <div className="submenu-item">
              <a href='/*' className='nav-url'>Proyectos y clientes</a>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <a href="/*" className='nav-url'>Distribución de salas e Info</a>
        </div>
        <div className="menu-item">
          <a href="/*" className='nav-url'>Calendario</a>
        </div>
        <div className="menu-item">
          <a href="/*" className='nav-url'>Protocolos</a>
        </div>
      </nav>
    </header>
  );
};

export default Cabecera;
