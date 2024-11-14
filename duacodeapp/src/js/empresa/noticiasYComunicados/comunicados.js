import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/comunicados.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Comunicados = () => {

    const [dataComunicados, setDataComunicados] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_comunicados = async () => {
        await axios.get('https://4hf-assiduous-rutherford.circumeo-apps.net/news/')
            .then(response => {
                console.log(response.data);
                setDataComunicados(response.data);
                setHasError(false);
            })
            .catch(error => {
                console.error('Error al recuperar los datos:', error);
                setHasError(true);
            });
    };

    useEffect(() => {
        peticion_comunicados();
    }, []);

    if (hasError) {
        return (
            <div>
                <Cabecera activePage="empresa" />
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }

    const comunicadosFiltrados = dataComunicados.filter(item => item.important_communication === true);





    return (
        <div className="informacionEmpleados">
            <Cabecera activePage="empresa" />
            <div className="contenedorComunicados">
                {comunicadosFiltrados.map((comunicados) => (
                    <Link to={`/empresa/noticiasComunicados/comunicados/news/${comunicados.news_id}`} key={comunicados.news_id}>
                        <div className="comunicadosCard">
                        <p><strong>Titulo:</strong>{comunicados.title}</p>
                        <p><strong>Contenido:</strong> {comunicados.content}</p>
                        {comunicados.image_url && <img src={comunicados.image_url} alt="Comunicado" className="imgNoticiasComunicados" />}
                        <p className="ver-mas">Ver más</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="volver">
                <button className="btn-volver">
                    <Link to='/empresa/noticiasComunicados'>Volver</Link>
                </button>
            </div>
            
        </div>
    );
}
export default Comunicados; 