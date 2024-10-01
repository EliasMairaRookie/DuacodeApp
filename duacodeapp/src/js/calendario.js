import Cabecera from './cabecera';
import React ,{useState} from 'react';
import '../css/calendario.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';



const Calendario=()=> {

const [weekendsVisible, setWeekendVisible]=useState(true)

function botonMostrarSemanas(){
    setWeekendVisible(!weekendsVisible)
        
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
                events={[
                    {title: 'event 1', date: '2024-09-30'},
                    {title: 'event 2', date: '2024-09-28'},
                    {title: 'event 3', date: '2024-09-27'},
                ]}
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
      </div>
      <div className=''>
        <label>
          <input
            type='checkbox'
            checked={weekendsVisible}
            onChange={botonMostrarSemanas}
          ></input>
          toggle weekends
        </label>
      </div>
        </div>
        </div>
    )
}

  export default Calendario;
  