import Cabecera from './cabecera';
import React, { useEffect, useState } from 'react';
import '../css/calendario.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

// Función para formatear fechas en formato día/mes/año
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JS van de 0 a 11
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Calendario = () => {

  const [dataCalendarFiltrada, setDataCalendarFiltrada] = useState([]);
  const [weekendsVisible, setWeekendVisible] = useState(true);
  const [dataCalendar, setDataCalendar] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [busqueda, setBusqueda] = useState("");

  function botonMostrarSemanas() {
    setWeekendVisible(!weekendsVisible);
  }

  const peticion_calendario = async () => {
    try {
      const response = await axios.get('https://4hf-assiduous-rutherford.circumeo-apps.net/event/');
      const events = response.data.map(event => ({
        event_id: event.event_id,
        title: event.title,
        start: event.date_start, // Formato día/mes/año
        end: event.date_end,     // Formato día/mes/año
        extendedProps: {
          content: event.content,
          room: event.room || 'No room',
        }
      }));
      setDataCalendarFiltrada(events);
      setDataCalendar(events);
      setHasError(false);
    } catch (error) {
      console.error('Error al recuperar los datos:', error);
      setHasError(true);
    }
  };

  useEffect(() => {
    peticion_calendario();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const ResultadosBusqueda = dataCalendarFiltrada.filter((elemento) => {
      if (elemento.title.toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
      return null;
    });
    setDataCalendar(ResultadosBusqueda);
  };

  if (hasError) {
    return (
      <div>
        <Cabecera activePage="calendario" />
        <p>Puede que el servidor esté apagado o exista algún problema con él.</p>
      </div>
    );
  }

  return (
    <div className='PaginaCalendario'>
      <Cabecera activePage="calendario" />
      <div className='contenidoPaginaCalendario'>

        <div className='calendario'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="dayGridMonth"
            navLinks={true}
            nowIndicator={true}
            dayMaxEvents={true}
            slotMinTime={'08:00'}
            slotMaxTime={'23:00'}
            expandRows={true}
            aspectRatio={2.5}
            events={dataCalendar}
            weekends={weekendsVisible}
            headerToolbar={{
              left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
              center: 'title',
              right: 'today,prev,next',
            }}
          />
        </div>

        <div className='sidebarCalendario'>
          <h2>Instructions</h2>
          <ul>
            <li>Tras buscar algún evento por la barra, en el calendario solo se mostrarán los eventos que se encuentren por el nombre.</li>
          </ul>

          <label>
            <input
              type='checkbox'
              checked={weekendsVisible}
              onChange={botonMostrarSemanas}
            ></input>
            Activar/Desactivar fines de semana
          </label>

          <div className="containerInputCalendario">
            <input
              className="inputBuscarCalendario"
              value={busqueda}
              placeholder="Buscar por nombre"
              onChange={handleChange}
            />
            <button className="btn-succes">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          {dataCalendar.map((dataCalendar) => (
            <div key={dataCalendar.event_id}>
              <h2>{dataCalendar.title}</h2>
              <p><strong>Id:</strong> {dataCalendar.event_id}</p>
              <p><strong>Contenido:</strong> {dataCalendar.extendedProps.content}</p>
              <p><strong>Fecha de inicio:</strong> {formatDate(dataCalendar.start)}</p>
              <p><strong>Fecha de finalización:</strong> {formatDate(dataCalendar.end)}</p>
              <p><strong>Sala:</strong> {dataCalendar.extendedProps.room}</p>
            </div>
          ))}

          {dataCalendar.length === 0 && (
            <div className="no-results">
              No hay eventos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendario;
