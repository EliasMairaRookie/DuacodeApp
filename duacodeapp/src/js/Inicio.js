import Cabecera from './cabecera';
import "../css/inicio.css";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faSitemap } from "@fortawesome/free-solid-svg-icons";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";


const Inicio = () => {
  return (
    <div className='Inicio'>
      <Cabecera activePage="inicio" />
      <div className="inicio-container">
        <header className="inicio-header">
          <h1>Bienvenido a la Aplicación de Comunicación Interna</h1>
          <p>Descubre cómo conectarte con tus compañeros y acceder a los recursos de la empresa.</p>

        </header>

        <div className="inicio-sections">
          <Link to="/empleados" className="section-card">
            
               
            
            <h2><FontAwesomeIcon icon={faUser} /> Empleados</h2>
            <p>Consulta información detallada de cada empleado, su ubicación y estado actual.</p>
          </Link>

          <Link to="/empresa/informacionEmpresa" className="section-card">
            
              
            
            <h2><FontAwesomeIcon icon={faInfo} /> Información de la Empresa</h2>
            <p>Noticias, eventos y proyectos activos en la empresa.</p>
          </Link>

          <Link to="/distribucionInfo/mapa" className="section-card">
             
            
            <h2><FontAwesomeIcon icon={faMap} /> Mapa Salas</h2>
            <p>Mapa sobre las salas según la sede que este seleccionada.</p>
          </Link>

          <Link to="/distribucionInfo/info" className="section-card">
            
              
            
            <h2><FontAwesomeIcon icon={faMapPin} /> Salas y Disponibilidad</h2>
            <p>Revisa las salas disponibles, sus capacidades y su estado de ocupación.</p>
          </Link>

          <Link to="/calendario" className="section-card">
            
              
            
            <h2><FontAwesomeIcon icon={faCalendarDays} /> Calendario Informativo</h2>
            <p>Consulta eventos relevantes y días especiales mediante el calendario.</p>
          </Link>

          <Link to="/organigrama" className="section-card">
            
              
            
            <h2><FontAwesomeIcon icon={faSitemap} />Organigrama</h2>
            <p>Visualiza la estructura organizativa de la empresa y localiza los equipos.</p>
          </Link>

          <Link to="/protocolos" className="section-card">
            
              
            
            <h2><FontAwesomeIcon icon={faFilePdf} /> Protocolos</h2>
            <p>Accede a protocolos de empresa, manuales y más.</p>
          </Link>

          <Link to="/ajustes" className="section-card">
            
              
            
            <h2><FontAwesomeIcon icon={faGear} /> Configuración de Sede</h2>
            <p>Cambia la sede para ver información local específica.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
