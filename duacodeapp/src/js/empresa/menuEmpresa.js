
import { Link } from "react-router-dom";
import '../../css/empresa/menuEmpresa.css';

const menuEmpresa = () => {

    return (
        <div className="cabecera-menuEmpresa">
            <aside className="menuEmpresa">
                <ul>
                <li><Link to="/empresa/informacionEmpresa">
                    Informacion sobre nosotros
                </Link>
                </li>

                <li><Link to="/empresa/eventos">
                    Eventos
                </Link>
                </li>

                <li><Link to="/empresa/noticiasComunicados">
                    Noticias y Comunicados
                </Link>
                </li>

                <li><Link to="/empresa/proyectosClientes">
                    Proyectos y cliente
                </Link>
                </li>
                </ul>
            </aside>
        </div>
    );
}
export default menuEmpresa;

