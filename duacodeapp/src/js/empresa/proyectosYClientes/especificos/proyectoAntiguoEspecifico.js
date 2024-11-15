import '../../../../css/empresa/proyectosClientes/ProyectosEspecificosAntiguos.css';
import Cabecera from "../../../cabecera";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProyectoAntiguoEspecifico = () => {
  const [proyectAntiguoItem, setproyectAntiguoItem] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { proyectAntiguoId } = useParams(); // Obtiene el parámetro de la URL (ID de la noticia)

  const fetchproyectAntiguoItem = async () => {
    try {
      const response = await axios.get(`https://4hf-assiduous-rutherford.circumeo-apps.net/project/${proyectAntiguoId}`);
      console.log(response.data);
      setproyectAntiguoItem(response.data.length ? response.data[0] : null);
      setHasError(false);
    } catch (error) {
      console.error('Error al recuperar los datos:', error);
      setHasError(true);
    }
  };
  useEffect(() => {
    fetchproyectAntiguoItem();
  }, [proyectAntiguoId]); // Ejecuta la petición cuando el parámetro proyectAntiguoId cambie
 

  if (hasError) {
    return (
      <div>
        <Cabecera />
        <p>Puede que el servidor esté apagado o exista algún problema con el servidor.</p>
      </div>
    );
  }

  if (!proyectAntiguoItem) {
    return (
      <div>
        <Cabecera activePage="noticias" />
        <p>Cargando datos de la noticia...</p>
      </div>
    );
  }

  return (
    <div>
      <Cabecera activePage="noticias" />
      <div>
        
        <h2 className="h2">{proyectAntiguoItem.title}</h2>
        <p className="p"><strong>Fecha:</strong> {proyectAntiguoItem.date}</p>
        <p className="p"><strong>Contenido:</strong> {proyectAntiguoItem.content}</p>
      </div>
      <button className="button"><Link to='/empresa/proyectosClientes'>Volver</Link></button>
    </div>
  );
};

export default ProyectoAntiguoEspecifico;

