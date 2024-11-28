import '../../../../css/empresa/proyectosClientes/ProyectosEspecificosActuales.css';
import Cabecera from "../../../cabecera";
import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import WithLoader from '../../../WithLoader';

const ProyectoActualEspecifico = () => {
  const [proyectActualItem, setproyectActualItem] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { proyectActualId } = useParams(); // Obtiene el parámetro de la URL (ID de la noticia)
  const [isLoading, setIsLoading] = useState(true);

  const fetchproyectActualItem = async () => {
    try {
      const response = await axios.get(`https://idkmen.pythonanywhere.com/project/${proyectActualId}`);
      console.log(response.data);
      setproyectActualItem(response.data.length ? response.data[0] : null);
      setHasError(false);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al recuperar los datos:', error);
      setIsLoading(false);
      setHasError(true);
    }
  };
  useEffect(() => {
    fetchproyectActualItem();
  }, [proyectActualId]); // Ejecuta la petición cuando el parámetro proyectActualId cambie


  if (hasError) {
    return (
      <div>
        <Cabecera />
        <p>Puede que el servidor esté apagado o exista algún problema con el servidor.</p>
      </div>
    );
  }

  if (!proyectActualItem) {
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
      <WithLoader isLoading={isLoading}></WithLoader>
      <div>
        <h2 className="h2">{proyectActualItem.title}</h2>
        <p className="p"><strong>Contenido:</strong> {proyectActualItem.objectives}</p>

      </div>
      <button className="button"><Link to='/empresa/proyectosClientes/actuales'>Volver</Link></button>
    </div>
  );
};

export default ProyectoActualEspecifico;

