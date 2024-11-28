import Cabecera from "../../cabecera";
import React, { useState, useEffect } from "react";
import '../../../css/empleados/empleadoEspecifico.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import WithLoader from "../../WithLoader"; // Importamos el HOC

const NoticiasEspecificas = () => {
  const [newsItem, setNewsItem] = useState(null);  // Cambié el valor inicial a null para comprobar si la noticia existe
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

  const { newsId } = useParams(); // Obtiene el parámetro de la URL (ID de la noticia)

  const fetchNewsItem = async () => {
    try {
      const response = await axios.get(`https://idkmen.pythonanywhere.com/news/${newsId}`);
      console.log(response.data);
      setNewsItem(response.data.length ? response.data[0] : null);  // Asegurarse de obtener la noticia correctamente
      setIsLoading(false);  // Al cargar, cambiamos el estado a false
      setHasError(false);
    } catch (error) {
      console.error('Error al recuperar los datos:', error);
      setIsLoading(false);  // Cambiamos el estado aunque haya error
      setHasError(true);
    }
  };

  useEffect(() => {
    fetchNewsItem();
  }, [newsId]); // Ejecuta la petición cuando el parámetro newsId cambie

  if (hasError) {
    return (
      <div>
        <Cabecera />
        <p>Puede que el servidor esté apagado o exista algún problema con el servidor.</p>
      </div>
    );
  }

  if (!newsItem) {
    return (
      <div>
        <Cabecera activePage="noticias" />
        <WithLoader isLoading={isLoading}></WithLoader>
      </div>
    );
  }

  return (
    <div>
      <Cabecera activePage="noticias" />
      
      
        <div>
          <img src={newsItem.image_url} alt={newsItem.title} className="imagen" />
          <h2 className="h2">{newsItem.title}</h2>
          <p className="p"><strong>Fecha:</strong> {newsItem.date}</p>
          <p className="p"><strong>Contenido:</strong> {newsItem.content}</p>
        </div>
      
      <button className="button"><Link to='/empresa/noticiasComunicados/noticias'>Volver</Link></button>
    </div>
  );
};

export default NoticiasEspecificas;
