import Cabecera from './cabecera';
import React ,{useEffect, useState} from 'react';
import '../css/calendario.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";



const Calendario=()=> {

const [dataCalendarFiltrada, setDataCalendarFiltrada]=useState([]);
const [weekendsVisible, setWeekendVisible]=useState(true);
const [dataCalendar, setDataCalendar]=useState([]);
const [hasError ,setHasError]=useState(false);
const [busqueda, setBusqueda ]=useState("");


function botonMostrarSemanas(){
    setWeekendVisible(!weekendsVisible)
        
}
const peticion_calendario = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/event/');
    const events = response.data.map(event => ({
      event_id:event.event_id,
      title: event.title,
      start: event.date_start,
      end: event.date_end,
      extendedProps: {
        content: event.content,
        room: event.room || 'No room',
      }
    }));
    setDataCalendarFiltrada(events)
    setDataCalendar(events);
    setHasError(false);
  } catch (error) {
    console.error('Error al recuperar los datos:', error);
    setHasError(true);
  }
};

useEffect(()=>{
  peticion_calendario();
},[])

const handleChange = (e) => {
  setBusqueda(e.target.value);
  filtrar( e.target.value);

}

if (hasError){
  return (<div>
   <Cabecera></Cabecera>
   
     <p>Puede que el servidor este apagado o exista algun problema con el</p>
    </div>)
}

const filtrar=(terminoBusqueda)=>{
  var ResultadosBusqueda=dataCalendarFiltrada.filter((elemento)=>{
    if (elemento.title.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())||
        elemento.eventId.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
      return elemento;
    }
  });
  setDataCalendar(ResultadosBusqueda);
}

    return (
        <div className='PaginaCalendario'>
            <Cabecera></Cabecera>
        <div className='contenidoPaginaCalendario'>
            
            <div className='calendario'>
            <FullCalendar
                plugins={[dayGridPlugin ,timeGridPlugin, listPlugin]}
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
                headerToolbar= {{
                    left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                    center: 'title',
                    right: 'today,prev,next',
                  }}
                  
            />
            </div>
            <div className=''>
            <h2>Instructions</h2>
             <ul>
                <li>Por ahora solo se visualizan eventos hardcodeados sin Backend</li>
            </ul>
      
      
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={botonMostrarSemanas}
          ></input>
          toggle weekends
        </label>

        <div className="containerInputCalendario">
              <input
                className="inputBuscarCalendario"
                value={busqueda}
                placeholder="Busqueda por nombre"
                onChange={handleChange}
              />
              
            </div>

        {dataCalendar.map((dataCalendar) => (
            <div key={dataCalendar.event_id}>
              <h2>{dataCalendar.title}</h2>
              <p><strong>Id:</strong> {dataCalendar.event_id}</p>
              <p><strong>Contenido:</strong> {dataCalendar.extendedProps.content}</p>
              <p><strong>Date_start:</strong> {dataCalendar.start}</p>
              <p><strong>Date_end :</strong> {dataCalendar.end}</p>
              <p><strong>Room:</strong> {dataCalendar.extendedProps.room ? dataCalendar.extendedProps.room : 'No room'}</p>
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
    )
}

  export default Calendario;
    