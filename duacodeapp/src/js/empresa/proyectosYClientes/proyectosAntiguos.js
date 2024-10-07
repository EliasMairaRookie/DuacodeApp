import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/noticiasComunicados.css';
import { Link } from "react-router-dom";

const ProyectosAntiguos = () => {

    return (
        <div className="informacionEmpleados">
            <Cabecera></Cabecera>

        <button><Link to='/empresa/proyectosClientes'>Volver</Link></button>
        </div>
    );
}
export default ProyectosAntiguos; 