import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/distribucionInfo.css';
import Cabecera from "../cabecera.js";

const DistribucionInfo = () => {
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    // Fetch room data from backend
    const peticion_habitaciones = async () => {
        try {
            const response = await axios.get('http://localhost:8000/room/');
            console.log(response.data);
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        peticion_habitaciones();
    }, []);

    // Handle button click to highlight the room
    const handleRoomSelect = (roomId) => {
        setSelectedRoomId(roomId);
    };

    return (
        <div>
            <Cabecera />
            {/* Mapa de habitaciones creado manualmente */}
            <div className="room-map">
                <div
                    className={`room ${selectedRoomId === 1 ? 'highlighted' : ''}`}
                    onClick={() => handleRoomSelect(1)}
                >
                    Sala 1
                </div>
                <div
                    className={`room ${selectedRoomId === 2 ? 'highlighted' : ''}`}
                    onClick={() => handleRoomSelect(2)}
                >
                    Sala 2
                </div>
                <div
                    className={`room ${selectedRoomId === 3 ? 'highlighted' : ''}`}
                    onClick={() => handleRoomSelect(3)}
                >
                    Sala 3
                </div>
                <div
                    className={`room ${selectedRoomId === 4 ? 'highlighted' : ''}`}
                    onClick={() => handleRoomSelect(4)}
                >
                    Sala 4
                </div>

                




                <div
                    className={`room ${selectedRoomId === 5 ? 'highlighted' : ''}`}
                    onClick={() => handleRoomSelect(5)}
                >
                    Sala 5
                </div>
                <div
                    className={`room ${selectedRoomId === 6 ? 'highlighted' : ''}`}
                    onClick={() => handleRoomSelect(6)}
                >
                    Sala 6
                </div>
                <div
                    className={`room ${selectedRoomId === 7 ? 'highlighted' : ''}`}
                    onClick={() => handleRoomSelect(7)}
                >
                    Sala 7
                </div>
                
                <div
                    className={`room ${selectedRoomId === 8 ? 'highlighted' : ''}`}
                    onClick={() => handleRoomSelect(8)}
                >
                    Sala 8
                </div>
                
            </div>

            {/* Botones para seleccionar cada sala */}
            <div className="room-buttons">
                {rooms.map((room) => (
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


