import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/comunicados.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import WithLoader from "../../WithLoader"; // Asegúrate de importar el HOC

const Comunicados = () => {
    const [dataComunicados, setDataComunicados] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Añadido estado de carga

    const peticion_comunicados = async () => {
        try {
            const response = await axios.get('https://idkmen.pythonanywhere.com/news/');
            console.log(response.data);
            setDataComunicados(response.data);
            setIsLoading(false); // Al cargar los datos, ya no estamos en carga
            setHasError(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            setIsLoading(false); // Aunque haya error, dejamos de mostrar el loader
            setHasError(true);
        }
    };

    useEffect(() => {
        peticion_comunicados();
    }, []);

    if (hasError) {
        return (
            <div>
                <Cabecera activePage="empresa" />
                <p>Puede que el servidor esté apagado o exista algún problema con el servidor.</p>
            </div>
        );
    }

    // Filtrar comunicados importantes
    const comunicadosFiltrados = dataComunicados.filter(item => item.important_communication === true);

    return (
        <div className="informacionEmpleados">
            <Cabecera activePage="empresa" />
            <WithLoader isLoading={isLoading}> {/* Usamos WithLoader aquí */}
                <div className="contenedorComunicados">
                    {comunicadosFiltrados.map((comunicado) => (
                        <Link to={`/empresa/noticiasComunicados/comunicados/news/${comunicado.news_id}`} key={comunicado.news_id}>
                            <div className="comunicadosCard">
                                <p><strong>Titulo:</strong> {comunicado.title}</p>
                                <p><strong>Contenido:</strong> {comunicado.content}</p>
                                {comunicado.image_url && <img src={comunicado.image_url} alt="Comunicado" className="imgNoticiasComunicados" />}
                                <p className="ver-mas">Ver más</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </WithLoader>
            <div className="volver">
                <button className="btn-volver">
                    <Link to='/empresa/noticiasComunicados'>Volver</Link>
                </button>
            </div>
        </div>
    );
}

export default Comunicados;
