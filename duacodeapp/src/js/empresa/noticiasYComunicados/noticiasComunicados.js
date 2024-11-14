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
            const response = await axios.get('https://4hf-assiduous-rutherford.circumeo-apps.net/news/');
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
                <Cabecera activePage="empresa" />
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }

    const comunicadoImportante = dataEventosComunicadosInicial.find(item => item.important_communication === true);
    const noticias = dataEventosComunicadosInicial.find(item => item.important_communication === false);

    return (
        <div className="informacionEmpleados">
            <Cabecera activePage="empresa" />
            <div className="menu-infoImportante">
                <div className='ordenar'>
                    <MenuEmpresa EmpresaMenuActivo="noticiasComunicados"/>
                </div>
                <div className="informacion-lateralMenuNotiCom">
                    <Link to='/empresa/noticiasComunicados/noticias'>
                        <div className="notigen">
                            <h2>Noticias</h2>
                            {noticias && (
                                <div>
                                    <p><strong>Titulo:</strong> {noticias.title}</p>
                                    <p><strong>Fecha:</strong> {noticias.date}</p>
                                    
                                    {noticias.image_url && <img src={noticias.image_url} alt="Comunicado" className="imgNoticiasComunicados"/>}
                                </div>
                            )}
                        </div>
                    </Link>
                    <Link to='/empresa/noticiasComunicados/comunicados'>
                        <div className="comunicadosgen">
                            <h2>Comunicados Importantes</h2>
                            {comunicadoImportante && (
                                <div>
                                    <p><strong>Titulo:</strong> {comunicadoImportante.title}</p>
                                    <p><strong>Fecha:</strong> {comunicadoImportante.date}</p>
                                    
                                    {comunicadoImportante.image_url && <img src={comunicadoImportante.image_url} alt="Comunicado" className="imgNoticiasComunicados"/>}
                                </div>
                            )}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NoticiasComunicados;
