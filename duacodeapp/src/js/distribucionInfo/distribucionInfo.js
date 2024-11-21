import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/distribucionInfo.css';
import Cabecera from "../cabecera.js";
import { useOffice } from '../OfficeContext';
import MenuDistribucionInfo from './menuDistribucionInfo.js';

const DistribucionInfo = () => {
    const [rooms, setRooms] = useState([]); // Lista de salas
    const [selectedRoomId, setSelectedRoomId] = useState(null); // Sala seleccionada
    const { selectedOffice } = useOffice(); // Oficina seleccionada

    // Obtener datos de las habitaciones desde el backend
    const peticion_habitaciones = async () => {
        try {
            const response = await axios.get('https://idkmen.pythonanywhere.com/room/');
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

    // Manejar la selección de sala
    const handleRoomSelect = (roomId) => {
        setSelectedRoomId(roomId);
    };

    // Buscar la sala seleccionada
    const selectedRoom = rooms.find(room => room.room_id === selectedRoomId);

    return (
        <>
            <Cabecera activePage="distribucionInfo" />
            <MenuDistribucionInfo />

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
                    {filteredRooms.map(room => (
                        <div
                            key={room.room_id}
                            className={`habitacion ${selectedRoomId === room.room_id ? 'highlighted' : ''}`}
                            onClick={() => handleRoomSelect(room.room_id)}
                        >
                            {room.name}
                            {(room.room_id > 8 && room.room_id < 13) && (
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

            {/* Información de la sala seleccionada */}
            {selectedRoom && (
                <div className="room-info">
                    <h3>Información de la Sala</h3>
                    <p><strong>Nombre:</strong> {selectedRoom.name}</p>
                    <p><strong>Capacidad:</strong> {selectedRoom.capacity}</p>
                    <p><strong>Ocupada:</strong> {selectedRoom.occupied ? "Sí" : "No"}</p>
                    <p><strong>Número de ocupantes:</strong> {selectedRoom.occupied ? selectedRoom.capacity : 0}</p>
                </div>
            )}
        </>
    );
};

export default DistribucionInfo;
