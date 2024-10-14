import '../css/cabecera.css';
import logo from '../imagenes/logo-duacode-negro.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState ,useEffect,useRef } from 'react';
import { Link } from 'react-router-dom';



const Cabecera = () => {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  let menuRef =useRef();

  useEffect(()=>{
    
    let handler =(e)=>{
      if(!menuRef.current.contains(e.target)){
        setIsSubmenuOpen(false);
      }
      
    };
      
    document.addEventListener("mousedown",handler);

    return()=>{
      document.removeEventListener("mousedown",handler);
    }
  });



  return (
    
    <header className="header">
      <div className="header-top">
        <div className="div-logo">
          <Link to="/" className='nav-url'>
            <img src={logo} alt="Logo" className='logo' />
          </Link>
        </div>
        <div className="icon">
          <a href="/ajustes" className='nav-url'>
            <FontAwesomeIcon icon={faBars} className='icono' />
          </a>
        </div>
      </div>

      <nav className="nav-menu">
        <div className="menu-item">
          <Link to="/empleados" className='nav-url'>Empleados</Link>
        </div>
        {/* Empresa con submenú */}
        <div className={`menu-item-empresa ${isSubmenuOpen ? 'bold' : ''}`} onClick={()=>{setIsSubmenuOpen(!isSubmenuOpen)}} ref={menuRef} >
          <span>Empresa</span>
          <div className={`submenu ${isSubmenuOpen ? 'active' : ''}`} >
          <div className="submenu-item">
              <Link to='/empresa/informacionEmpresa' className='nav-url'>informacionEmpresa</Link>
            </div>
            <div className="submenu-item">
              <Link to='/empresa/eventos' className='nav-url'>Eventos</Link>
            </div>
            <div className="submenu-item">
              <Link to='/empresa/noticiasComunicados' className='nav-url'>Noticias y comunicados</Link>
            </div>
            <div className="submenu-item">
              <Link to='/empresa/proyectosClientes' className='nav-url'>Proyectos y clientes</Link>
            </div>
          </div>
        </div>
        <div className="menu-item">
          <Link to="/distribucionInfo" className='nav-url'>Distribución de salas e Info</Link>
        </div>
        <div className="menu-item">
          <Link to="/calendario" className='nav-url'>Calendario</Link>
        </div>
        <div className="menu-item">
          <Link to="/protocolos" className='nav-url'>Protocolos</Link>
        </div>
      </nav>
    </header>
  );
};

export default Cabecera;
