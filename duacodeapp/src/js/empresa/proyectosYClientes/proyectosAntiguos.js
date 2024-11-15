import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/proyectosClientes/ProyectosAntiguos.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ProyectosAntiguos = () => {

    const [dataProyectosAntiguos, setDataProyectosAntiguos] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_proyectosAntiguos = async () => {
        await axios.get('https://4hf-assiduous-rutherford.circumeo-apps.net/project/')
            .then(response => {
                console.log(response.data);
                setDataProyectosAntiguos(response.data);
                setHasError(false);
            })
            .catch(error => {
                console.error('Error al recuperar los datos:', error);
                setHasError(true);
            });
    };


    useEffect(() => {
        peticion_proyectosAntiguos();
    }, []);

    if (hasError) {
        return (
            <div>
                <Cabecera activePage="empresa" />
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }

    const proyectosAntiguosFiltrados = dataProyectosAntiguos.filter(item => item.active === false);


    return (
        <div className="informacionEmpleados">
            <Cabecera activePage="empresa" />

            <div className="contenedorProyectoAntiguo">
                {proyectosAntiguosFiltrados.map((proyectosAntiguos) => (
                    <Link to={`/empresa/proyectosClientes/antiguos/project/${proyectosAntiguos.project_id}`} key={proyectosAntiguos.project_id}>
                        <div className="proyectoAntiguoTarjeta">
                            <p><strong>{proyectosAntiguos.title}</strong></p>
                            <p><strong>Contenido:</strong> {proyectosAntiguos.objectives}</p>
                            <p className="ver-mas">Ver más</p>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="volver">
                <button className="btn-volver">
                    <Link to='/empresa/proyectosClientes'>Volver</Link>
                </button>
            </div>
        </div>
    );
}
export default ProyectosAntiguos; 