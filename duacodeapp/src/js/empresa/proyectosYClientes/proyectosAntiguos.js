import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/noticiasComunicados.css';
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ProyectosAntiguos = () => {

    const [dataProyectosAntiguos, setDataProyectosAntiguos] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_proyectosAntiguos = async () => {
        await axios.get('http://127.0.0.1:8000/project/')
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
                <Cabecera />
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }

    const proyectosAntiguosFiltrados = dataProyectosAntiguos.filter(item => item.active === false);


    return (
        <div className="informacionEmpleados">
            <Cabecera></Cabecera>

            <div>
                {proyectosAntiguosFiltrados.map((proyectosAntiguos) => (
                    <Link to={`/news/${proyectosAntiguos.project_id}`} key={proyectosAntiguos.project_id}>
                        <p><strong>{proyectosAntiguos.title}</strong></p>
                        <p><strong>Contenido:</strong> {proyectosAntiguos.objectives}</p>
                    </Link>
                ))}
            </div>

            <button><Link to='/empresa/proyectosClientes'>Volver</Link></button>
        </div>
    );
}
export default ProyectosAntiguos; 