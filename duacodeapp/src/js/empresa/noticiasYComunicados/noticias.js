import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/noticias.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import WithLoader from "../../WithLoader"; // Importamos el HOC

const Noticias = () => {
    const [dataNoticias, setDataNoticias] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Estado para la carga

    const peticion_noticias = async () => {
        try {
            const response = await axios.get('https://idkmen.pythonanywhere.com/news/');
            console.log(response.data);
            setDataNoticias(response.data);
            setIsLoading(false); // Cuando los datos se cargan, cambiamos el estado
            setHasError(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            setIsLoading(false); // También se cambia el estado aunque haya error
            setHasError(true);
        }
    };

    useEffect(() => {
        peticion_noticias();
    }, []);

    if (hasError) {
        return (
            <div>
                <Cabecera activePage="empresa" />
                <p>Puede que el servidor esté apagado o exista algún problema con el servidor.</p>
            </div>
        );
    }

    // Filtrar las noticias no importantes
    const noticiasFiltradas = dataNoticias.filter(item => item.important_communication === false);

    return (
        <div className="Noticias">
            <Cabecera activePage="empresa" />
            <WithLoader isLoading={isLoading}> {/* Usamos el HOC aquí */}
                <div className="contenedorNoticias">
                    {noticiasFiltradas.map((noticia) => (
                        <Link to={`/empresa/noticiasComunicados/comunicados/news/${noticia.news_id}`} key={noticia.news_id} className="noticia-enlace">
                            <div className="noticiaCard">
                                <p><strong>Título:</strong> {noticia.title}</p>
                                <p><strong>Contenido:</strong> {noticia.content}</p>    
                                {noticia.image_url && <img src={noticia.image_url} alt="Noticia" className="imgNoticiasComunicados" />}
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

export default Noticias;
