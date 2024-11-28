import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/noticiasYComunicados/noticiasComunicados.css';
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import WithLoader from "../../WithLoader"; // Importamos el HOC

const NoticiasComunicados = () => {
    const [dataEventosComunicadosInicial, setDataEventosComunicadosInicial] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Estado de carga

    const peticion_noticiasComunicados = async () => {
        try {
            const response = await axios.get('https://idkmen.pythonanywhere.com/news/');
            console.log("Datos de eventos/comunicados:", response.data);
            setDataEventosComunicadosInicial(response.data);
            setIsLoading(false); // Datos cargados, ya no estamos en carga
            setHasError(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            setIsLoading(false); // Aunque haya error, dejamos de mostrar el loader
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
            <WithLoader isLoading={isLoading}> {/* Usamos WithLoader aquí */}
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
                                        <p className="ver-mas">Ver más</p>
                                        
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
                                        <p className="ver-mas">Ver más</p>
                                        
                                    </div>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
            </WithLoader>
        </div>
    );
};

export default NoticiasComunicados;
