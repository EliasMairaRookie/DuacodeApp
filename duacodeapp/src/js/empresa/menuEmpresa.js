import { Link } from "react-router-dom";
import '../../css/empresa/menuEmpresa.css';

const menuEmpresa = ({EmpresaMenuActivo}) => {

    return (
        <div className="cabecera-menuEmpresa">
            <aside className="menuEmpresa">
                <ul>
                <li className={`menu-item ${EmpresaMenuActivo === 'infoEmpresa' ? 'bold' : ''}`}><Link to="/empresa/informacionEmpresa">
                    Informacion sobre nosotros
                </Link>
                </li>

                <li className={`menu-item ${EmpresaMenuActivo === 'eventos' ? 'bold' : ''}`}><Link to="/empresa/eventos">
                    Eventos
                </Link>
                </li>

                <li className={`menu-item ${EmpresaMenuActivo === 'noticiasComunicados' ? 'bold' : ''}`}><Link to="/empresa/noticiasComunicados">
                    Noticias y Comunicados
                </Link>
                </li>

                <li className={`menu-item ${EmpresaMenuActivo === 'proyectosClientes' ? 'bold' : ''}`}><Link to="/empresa/proyectosClientes">
                    Proyectos y cliente
                </Link>
                </li>
                </ul>
            </aside>
        </div>
    );
}
export default menuEmpresa;

