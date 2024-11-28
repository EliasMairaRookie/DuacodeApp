import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/distribucionInfo.css';
import Cabecera from "../cabecera.js";
import { useOffice } from '../OfficeContext.js';
import MenuDistribucionInfo from './menuDistribucionInfo.js';
import WithLoader from '../WithLoader.js';

const InfoSalas = () => {
    // Estados locales
    const [rooms, setRooms] = useState([]); // Para almacenar las habitaciones
    const [selectedRoomId, setSelectedRoomId] = useState(null); // Para la sala seleccionada
    const { selectedOffice } = useOffice(); // Extraer oficina seleccionada del contexto
    const [isLoading, setIsLoading] = useState(true);

    // Función para obtener las habitaciones
    const peticion_habitaciones = async () => {
        try {
            const response = await axios.get('https://idkmen.pythonanywhere.com/room/');
            console.log(response.data);
            setRooms(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching rooms:', error);
            setIsLoading(false);
        }
    };

    // Llamar a la API cuando el componente se monta
    useEffect(() => {
        peticion_habitaciones();
    }, []);

    // Filtrar las habitaciones según la oficina seleccionada
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

    return (
        <>
            <Cabecera activePage="distribucionInfo" />
            <MenuDistribucionInfo />
            <div className="room-list">
                <h2>Salas disponibles en {selectedOffice}</h2>
                <WithLoader isLoading={isLoading}></WithLoader>
                <ul>
                    {filteredRooms.map(room => (
                        <li 
                            key={room.room_id} 
                            className={room.room_id === selectedRoomId ? 'selected-room' : ''}
                            onClick={() => handleRoomSelect(room.room_id)}
                        >
                            <strong>{room.name}</strong> - Capacidad: {room.capacity} - 
                            Ocupada: <strong>{room.occupied ? "Sí" : "No"}</strong>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default InfoSalas;
