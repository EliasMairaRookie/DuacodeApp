import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/distribucionInfo.css';
import Cabecera from "../cabecera.js";
import { useOffice } from '../OfficeContext';
import MenuDistribucionInfo from './menuDistribucionInfo.js';

const DistribucionInfo = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);
    const { selectedOffice } = useOffice();

    // Fetch room data from backend
    const peticion_habitaciones = async () => {
        try {
            const response = await axios.get('https://4hf-assiduous-rutherford.circumeo-apps.net/room/');
            console.log(response.data);
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        peticion_habitaciones();
    }, []);

    // Filtrar habitaciones según la oficina seleccionada
    const filteredRooms = rooms.filter(room => {
        if (selectedOffice === 'Galicia') {
            return room.office === 'Gl';
        } else if (selectedOffice === 'Valencia') {
            return room.office === 'Va';
        }
        return false;
    });

    // Handle button click to highlight the room
    const handleRoomSelect = (roomId) => {
        setSelectedRoomId(roomId);
    };

    return (
        <>
            <Cabecera activePage="distribucionInfo" />
            <MenuDistribucionInfo/>
            {/* Mapa de Galicia */}
            {selectedOffice === 'Galicia' && (
                <div className="mapa">
                    <div className='pasilloHorizontal'>
                        <div className='entrada'></div>
                    </div>

                    {filteredRooms.map(room => (
                        <div
                            key={room.room_id}
                            className={`habitacion ${selectedRoomId === room.room_id ? 'highlighted' : ''}`}
                            onClick={() => handleRoomSelect(room.room_id)}
                        >
                            {room.name}
                            {/* Condición para mostrar el pasillo vertical solo en ciertos IDs */}
                            {(room.room_id < 5) && (
                                <div className='pasilloVertical'></div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Mapa de Valencia */}
            {selectedOffice === 'Valencia' && (
                <div className="mapa">
                    <div className='pasilloHorizontal'>
                        <div className='entrada'></div>
                    </div>
                    {/* Diseña el mapa de Valencia aquí */}
                    {filteredRooms.map(room => (
                        <div
                            key={room.room_id}
                            className={`habitacion ${selectedRoomId === room.room_id ? 'highlighted' : ''}`}
                            onClick={() => handleRoomSelect(room.room_id)}
                        >
                            {room.name}
                            {((room.room_id > 8 && room.room_id < 13)) && (
                                <div className='pasilloVertical'></div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Botones para seleccionar cada sala */}
            <div className='colocarBotones'>
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
        </>
    );
};

export default DistribucionInfo;
