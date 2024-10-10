import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/noticiasComunicados.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";



const ProyectosActuales = () => {

    const [dataProyectosActuales, setDataProyectosActuales] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_proyectosActuales = async () => {
        await axios.get('http://127.0.0.1:8000/project/')
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
                <Cabecera />
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }

    const proyectosActualesFiltrados = dataProyectosActuales.filter(item => item.active === true);




    return (
        <div className="informacionEmpleados">
            <Cabecera></Cabecera>

            <div>
                {proyectosActualesFiltrados.map((proyectosActuales) => (
                    <Link to={`/news/${proyectosActuales.project_id}`} key={proyectosActuales.project_id}>
                        <p><strong>{proyectosActuales.title}</strong></p>
                        <p><strong>Contenido:</strong> {proyectosActuales.objectives}</p>
                    </Link>
                ))}
            </div>

            <button><Link to='/empresa/proyectosClientes'>Volver</Link></button>
        </div>
    );
}
export default ProyectosActuales; 