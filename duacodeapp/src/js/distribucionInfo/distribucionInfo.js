import Cabecera from '../cabecera';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const DistribucionInfo=()=> {
    const [rooms, setRooms] = useState([]);

    const peticion_habitaciones = async () => {
        try {
            const response = await axios.get('http://localhost:8000/room/');
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        peticion_habitaciones();
    }, []);

    return (
        <div>
        <div className='DistribucionInfo'>
            <Cabecera></Cabecera>
            <div>
                <div className='mapa'></div>
                <div>
                    {rooms.map((room) => (
                        <div key={room.room_id}>
                            <h3>{room.name}</h3>
                            <p>Oficina: {room.office}</p>
                            <p>Capacidad: {room.capacity} personas</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
            
        </div>
    );
}
export default DistribucionInfo;

