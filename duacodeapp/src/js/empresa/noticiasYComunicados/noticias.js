import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/noticias.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Noticias = () => {

    const [dataNoticias, setDataNoticias] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_noticias = async () => {
        try {
            const response = await axios.get('https://4hf-assiduous-rutherford.circumeo-apps.net/news/');
            console.log(response.data);
            setDataNoticias(response.data);
            setHasError(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
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
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }

    const noticiasFiltradas = dataNoticias.filter(item => item.important_communication === false);

    return (
        <div className="Noticias">
            <Cabecera activePage="empresa" />
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
            <div className="volver">
                <button className="btn-volver">
                    <Link to='/empresa/noticiasComunicados'>Volver</Link>
                </button>
            </div>
        </div>
    );
}

export default Noticias;
