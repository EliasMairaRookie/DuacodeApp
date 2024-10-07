import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/noticiasComunicados.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";


const Noticias = () => {

    const [dataNoticias, setDataNoticias] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_noticias = async () => {
        await axios.get('http://127.0.0.1:8000/news/')
            .then(response => {
                console.log(response.data);
                setDataNoticias(response.data);
                setHasError(false);
            })
            .catch(error => {
                console.error('Error al recuperar los datos:', error);
                setHasError(true);
            });
    };

    useEffect(() => {
        peticion_noticias();
    }, []);

    if (hasError) {
        return (
            <div>
                <Cabecera />
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }

    const noticiasFiltradas = dataNoticias.filter(item => item.important_communication === false);





    return (
        <div className="informacionEmpleados">
            <Cabecera></Cabecera>
            <div>
                {noticiasFiltradas.map((noticias) => (
                    <Link to={`/news/${noticias.news_id}`} key={noticias.news_id}>
                        <p><strong>Titulo:</strong>{noticias.title}</p>
                        <p><strong>Contenido:</strong> {noticias.content}</p>
                        {noticias.image_url && <img src={noticias.image_url} alt="Comunicado" className="imgNoticiasComunicados" />}
                        <p>Ver más</p>
                    </Link>
                ))}
            </div>

            <button><Link to='/empresa/noticiasComunicados'>Volver</Link></button>
        </div>
    );
}
export default Noticias; 