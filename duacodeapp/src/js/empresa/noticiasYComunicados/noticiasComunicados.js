import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/noticiasComunicados.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";



const NoticiasComunicados = () => {

    const [dataEventosComunicadosInicial, setDataEventosComunicadosInicial] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_noticiasComunicados = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/news/');
            console.log("Datos de eventos/comunicados:", response.data);
            setDataEventosComunicadosInicial(response.data);
            setHasError(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            setHasError(true);
        }
    };

    useEffect(() => {
        peticion_noticiasComunicados();
    }, []);


    if (hasError) {
        return (
            <div>
                <Cabecera />
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }
    // Filtrar comunicados importantes
    const comunicadoImportante = dataEventosComunicadosInicial.find(item => item.important_communication === true);
    const noticias = dataEventosComunicadosInicial.find(item => item.important_communication === false);

    return (

        <div className="informacionEmpleados">
            <Cabecera />
            <div className="menu-infoImportante">
                <div className='ordenar'>
                    <MenuEmpresa />
                </div>
                <div className="informacion-lateralMenu">
                    <Link to='/empresa/noticiasComunicados/noticias'>
                        <div>
                            <h2>Noticias</h2>
                            {noticias && (
                                //Falta meter el titulo, por temas del backend
                                <div>
                                    <p><strong>Titulo:</strong>{noticias.title}</p>
                                    <p><strong>Contenido:</strong> {noticias.content}</p>
                                    {noticias.image_url && <img src={noticias.image_url} alt="Comunicado" className="imgNoticiasComunicados"/>}
                                    <p>Ver más</p>
                                </div>
                            )}
                        </div></Link>
                    <Link to='/empresa/noticiasComunicados/comunicados'>
                        <div>
                            <h2>Comunicados Importantes</h2>
                            {comunicadoImportante && (
                                <div>
                                    <p><strong>Fecha:</strong> {comunicadoImportante.date}</p>
                                    <p><strong>Contenido:</strong> {comunicadoImportante.content}</p>
                                    {comunicadoImportante.image_url && <img src={comunicadoImportante.image_url} alt="Comunicado" className="imgNoticiasComunicados"/>}
                                </div>
                            )}

                        </div></Link>
                </div>
            </div>

        </div>
    );
};
export default NoticiasComunicados; 