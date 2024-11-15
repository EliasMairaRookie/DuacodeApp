import { Link } from "react-router-dom";
import '../../css/empleados/empleados.css';


const MenuDistribucionInfo=()=>{
    
    return(
        <div className="menuEmpleadospagina">
            <div className="menuEmpleados-itempagina"><Link to='/distribucionInfo/mapa' className='nav-url'>Mapa</Link></div>
            <div className="menuEmpleados-itempagina"><Link to='/distribucionInfo/info' className='nav-url'>Información de las Salas</Link></div>
        </div>
    );
}
export default MenuDistribucionInfo;