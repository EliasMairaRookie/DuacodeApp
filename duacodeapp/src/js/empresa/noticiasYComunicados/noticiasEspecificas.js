import Cabecera from "../../cabecera";
import React, { useState, useEffect } from "react";
import '../../../css/empleados/empleadoEspecifico.css';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const NoticiasEspecificas = () => {
  const [newsItem, setNewsItem] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { newsId } = useParams(); // Obtiene el parámetro de la URL (ID de la noticia)

  const fetchNewsItem = async () => {
    try {
      const response = await axios.get(`https://4hf-assiduous-rutherford.circumeo-apps.net/news/${newsId}`);
      console.log(response.data);
      setNewsItem(response.data.length ? response.data[0] : null);
      setHasError(false);
    } catch (error) {
      console.error('Error al recuperar los datos:', error);
      setHasError(true);
    }
  };
  useEffect(() => {
    fetchNewsItem();
  }, [newsId]); // Ejecuta la petición cuando el parámetro newsId cambie
  console.log(newsItem)

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
        <p>Cargando datos de la noticia...</p>
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


