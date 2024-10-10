import { Link } from "react-router-dom";
import '../../css/empleados/empleados.css';


const menuEmpleados=()=>{
    
    return(
        <div className="menuEmpleadospagina">
            <div className="menuEmpleados-itempagina"><Link to='/empleados' className='nav-url'>Información Empleados</Link></div>
            <div className="menuEmpleados-itempagina"><Link to='/organigrama' className='nav-url'>Organigrama</Link></div>
        </div>
    );
}
export default menuEmpleados;
