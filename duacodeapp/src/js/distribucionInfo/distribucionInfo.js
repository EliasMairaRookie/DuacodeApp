import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/distribucionInfoPrueba.css';
import Cabecera from "../cabecera.js";
import { useOffice } from '../OfficeContext';

const DistribucionInfo = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const { selectedOffice } = useOffice(); // No uses useContext directamente, usa el hook personalizado

    // Fetch room data from backend
    const peticion_habitaciones = async () => {
        try {
            const response = await axios.get('http://localhost:8000/room/');
            console.log(response.data)
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        peticion_habitaciones();
    }, []);

    // Filter rooms based on selected office
    const filteredRooms = rooms.filter(room => room.office === selectedOffice);

    // Handle button click to highlight the room
    const handleRoomSelect = (roomId) => {
        setSelectedRoomId(roomId);
    };

    return (
        <div>
            <Cabecera />
            {/*Meterlo con position relative absolute etc los pasillos usar display flex 25% */}
            <div className='mapa'>


                <div className='pasilloHorizontal'>
                    <div className='entrada'></div>
                </div>
                <div className='habitacion'>Sala 1
                    <div className='pasilloVertical'></div>

                </div>
                <div className='habitacion'>Sala 2
                    <div className='pasilloVertical'></div>
                </div>
                <div className='habitacion'>Sala 3
                    <div className='pasilloVertical'></div>
                </div>
                <div className='habitacion'>Sala 4
                    <div className='pasilloVertical'></div>
                </div>
                <div className='habitacion'>Sala 5</div>
                <div className='habitacion'>Sala 6</div>
                <div className='habitacion'>Sala 7</div>
                <div className='habitacion'>Sala 8</div>
            </div>
            {/* Botones para seleccionar cada sala */}
            <div className="room-buttons">
                {filteredRooms.map((room) => (
                    <button
                        key={`button-${room.room_id}`}
                        onClick={() => handleRoomSelect(room.room_id)}
                    >
                        {room.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DistribucionInfo;
