import Cabecera from "../../cabecera";
import '../../../css/empresa/proyectosClientes/ProyectosActuales.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";



const ProyectosActuales = () => {

    const [dataProyectosActuales, setDataProyectosActuales] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_proyectosActuales = async () => {
        await axios.get('https://idkmen.pythonanywhere.com/project/')
            .then(response => {
                console.log(response.data);
                setDataProyectosActuales(response.data);
                setHasError(false);
            })
            .catch(error => {
                console.error('Error al recuperar los datos:', error);
                setHasError(true);
            });
    };


    useEffect(() => {
        peticion_proyectosActuales();
    }, []);

    if (hasError) {
        return (
            <div>
                <Cabecera activePage="empresa" />
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }

    const proyectosActualesFiltrados = dataProyectosActuales.filter(item => item.active === true);




    return (
        <div className="informacionEmpleados">
            <Cabecera activePage="empresa" />

            <div className="contenedorProyectoActual">
                {proyectosActualesFiltrados.map((proyectosActuales) => (
                    <Link to={`/empresa/proyectosClientes/actuales/project/${proyectosActuales.project_id}`} key={proyectosActuales.project_id}>
                        <div className="proyectoActualTarjeta">
                            <p><strong>{proyectosActuales.title}</strong></p>
                            <p><strong>Contenido:</strong> {proyectosActuales.objectives}</p>
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
export default ProyectosActuales; 