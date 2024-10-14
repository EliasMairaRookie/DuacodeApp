import Cabecera from "../cabecera";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const EmpleadoEspecifico = () => {
  const [employee, setEmployee] = useState([]);
  const [hasError, setHasError] = useState(false);
  const { X } = useParams(); // Obtiene el parámetro de la URL (ID del empleado)

  const peticion_empleado = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/employee/${X}`);
      console.log(response.data)
      setEmployee(response.data);
      setHasError(false);

    } catch (error) {
      console.error('Error al recuperar los datos:', error);
      setHasError(true);
    }
  };

  useEffect(() => {
    peticion_empleado();
  }, [X]); // Ejecutar la petición cuando el parámetro X cambie

  if (hasError) {
    return (
      <div>
        <Cabecera />
        <p>Puede que el servidor esté apagado o exista algún problema con el servidor.</p>
      </div>
    );
  }

  if (!employee) {
    return (
      <div>
        <Cabecera />
        <p>Cargando datos del empleado...</p>
      </div>
    );
  }

  return (
    <div>
      <Cabecera />
      {employee.map((employee) => (
          <div>
            <img src={employee.picture} alt={employee.name} />
            <h2>{employee.name}</h2>
            <p><strong>Id:</strong> {employee.employee_id}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.phone}</p>
            <p><strong>Job Title:</strong> {employee.job_title}</p>
            <p><strong>Status:</strong> {employee.status}</p>
          </div>
      ))}
      <button><Link to='/empleados'>Volver</Link></button>
    </div>
  );
};

export default EmpleadoEspecifico;