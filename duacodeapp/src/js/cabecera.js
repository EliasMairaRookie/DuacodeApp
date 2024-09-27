import '../css/cabecera.css';
import logo from '../imagenes/logo-duacode-negro.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cabecera = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsSubmenuOpen(prevState => !prevState);
  };

  return (
    
    <header className="header">
      {/* CAMBIAR TODOS LOS A HREF(enlaces) POR LINK TO */}
      <div className="header-top">
        <div className="div-logo">
          <Link to="/" className='nav-url'>
            <img src={logo} alt="Logo" className='logo' />
          </Link>
        </div>
        <div className="icon">
          <Link to="/ajustes" className='nav-url'>
            <FontAwesomeIcon icon={faBars} className='icono' />
          </Link>
        </div>
      </div>

      <nav className="nav-menu">
        <div className="menu-item">
          <a href="/empleados" className='nav-url'>Empleados</a>
        </div>
        {/* Empresa con submenú */}
        <div className={`menu-item-empresa ${isSubmenuOpen ? 'bold' : ''}`} onClick={toggleSubmenu}>
          <span>Empresa</span>
          <div className={`submenu ${isSubmenuOpen ? 'active' : ''}`}>
            <div className="submenu-item">
              <a href='/eventos' className='nav-url'>Eventos</a>
            </div>
            <div className="submenu-item">
              <a href='/noticiasComunicados' className='nav-url'>Noticias y comunicados</a>
            </div>
            <div className="submenu-item">
              <a href='/ProyectosClientes' className='nav-url'>Proyectos y clientes</a>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <a href="/distribucionInfo" className='nav-url'>Distribución de salas e Info</a>
        </div>
        <div className="menu-item">
          <a href="/calendario" className='nav-url'>Calendario</a>
        </div>
        <div className="menu-item">
          <a href="/protocolos" className='nav-url'>Protocolos</a>
        </div>
      </nav>
    </header>
  );
};

export default Cabecera;
