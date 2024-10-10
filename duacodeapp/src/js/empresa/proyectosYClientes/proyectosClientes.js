import MenuEmpresa from "../menuEmpresa";
import Cabecera from "../../cabecera";
import '../../../css/empresa/proyectosClientes/proyectosClientes.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const ProyectosClientes = () => {

    const [dataClientes, setDataClientes] = useState([]);
    const [dataProyectosInicial, setdataProyectosInicial] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_proyectosIncial = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/project/');
            console.log("Datos de proyectos:", response.data);
            setdataProyectosInicial(response.data);
            setHasError(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            setHasError(true);
        }
    };
    const peticion_clientes = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/client/');
            console.log("Datos de clientes:", response.data);
            setDataClientes(response.data);
            setHasError(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            setHasError(true);
        }
    };

    useEffect(() => {
        peticion_proyectosIncial();
        peticion_clientes();
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
    const proyectosActuales = dataProyectosInicial.find(item => item.active === true);
    const proyectosPasados = dataProyectosInicial.find(item => item.active === false);

    return (

        <div className="informacionEmpleados">
            <Cabecera />
            <div className="menu-infoImportante">
                <div className='ordenar'>
                    <MenuEmpresa />
                </div>
                <div className="informacion-lateralMenu">
                    <Link to='/empresa/proyectosClientes/antiguos'>
                        <div>
                            <h2>Proyectos Pasados</h2>
                            {proyectosPasados && (

                                <div>
                                    <p><strong>Titulo:</strong>{proyectosPasados.title}</p>
                                    <p><strong>Objetivos:</strong> {proyectosPasados.objetives}</p>
                                    <p>Ver más</p>
                                </div>
                            )}
                        </div></Link>
                    <Link to='/empresa/proyectosClientes/actuales'>
                        <div>
                            <h2>Proyectos Actuales</h2>
                            {proyectosActuales && (
                                <div>
                                    <p><strong>Titulo:</strong>{proyectosActuales.title}</p>
                                    <p><strong>Objetivos:</strong> {proyectosActuales.objetives}</p>
                                </div>
                            )}

                        </div></Link>
                </div>
                <div className="informacionExtra">
                    <h1>Clientes</h1>
                    {dataClientes.map((cliente) => (
  
                            <div>
                                <img src={cliente.image_url} alt={cliente.name} />
                                <h2>{cliente.name}</h2>
                                <p><strong>Id:</strong> {cliente.client_id}</p>
                                <p><strong>Nombre:</strong> {cliente.name}</p>
                                <strong>Sitio Oficial:</strong> <a href={`https://${cliente.url}`} target="_blank" rel="noopener noreferrer">{cliente.url}</a>

                            </div>
                        
                    ))}
                </div>

            </div>

        </div>
    );
};
export default ProyectosClientes; 