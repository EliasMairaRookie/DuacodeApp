import MenuEmpresa from "./menuEmpresa";
import Cabecera from "../cabecera";
import '../../css/empresa/eventos.css';
import { useEffect, useState } from "react";
import axios from "axios";

const Eventos = () => {
    const [dataEventos, setDataEventos] = useState([]);
    const [hasError, setHasError] = useState(false);

    const peticion_eventos = async () => {
        try {
            const response = await axios.get('https://idkmen.pythonanywhere.com/event/');
            console.log("Datos de eventos:", response.data);
            setDataEventos(response.data);
            setHasError(false);
        } catch (error) {
            console.error('Error al recuperar los datos:', error);
            setHasError(true);
        }
    };

    useEffect(() => {
        peticion_eventos();
    }, []);

    if (hasError) {
        return (
            <div>
                <Cabecera activePage="empresa" />
                <p>Puede que el servidor esté apagado o exista algún problema con el</p>
            </div>
        );
    }

    const fechaActual = new Date();
    console.log("Fecha actual:", fechaActual);

    const eventosFuturos = dataEventos
        .filter(evento => {
            console.log("Verificando evento:", evento); // Agregar este log para ver la estructura del objeto
            const fechaEvento = new Date(evento.date_start); // Asegurarse de que el nombre es correcto
            console.log(`Fecha del evento "${evento.title}":`, fechaEvento); // Comprobar si la fecha se interpreta correctamente
            return fechaEvento > fechaActual;
        })
        .sort((a, b) => new Date(a.date_start) - new Date(b.date_start));

    const eventoMasCercano = eventosFuturos.length > 0 ? eventosFuturos[0] : null;
    const eventosRestantes = eventosFuturos.slice(1);

    return (
        <div className="informacionEmpleados">
            <Cabecera activePage="empresa" />
            <div className="menu-infoImportante">
                <div className='ordenar'>
                    <MenuEmpresa EmpresaMenuActivo="eventos" />
                </div>
                <div className="informacion-lateralMenu">
                    {eventoMasCercano ? (
                        <div className="proxEvento">
                            <h2>Próximo evento</h2>
                            <p>{eventoMasCercano.title}</p>
                            <p>{new Date(eventoMasCercano.date_start).toLocaleString()}</p>
                            <p>{eventoMasCercano.content}</p>
                        </div>
                    ) : (
                        <p>No hay eventos futuros disponibles.</p>
                    )}
                </div>
            </div>
            <div className="informacionExtra">
                <div className="titulo">
                    <h2>Próximos eventos</h2>
                </div>
                {eventosRestantes.length > 0 ? (
                    eventosRestantes.map((evento, index) => (
                        <div key={index} className="eventoFuturo">
                            <p>{evento.title}</p>
                            <p>{new Date(evento.date_start).toLocaleString()}</p>
                            <p>{evento.content}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay más eventos futuros.</p>
                )}
            </div>
        </div>
    );
}

export default Eventos;
