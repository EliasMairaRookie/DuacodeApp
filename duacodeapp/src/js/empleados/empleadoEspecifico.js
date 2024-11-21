import Cabecera from "../cabecera";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../css/empleados/empleadoEspecifico.css';

const EmpleadoEspecifico = () => {
  const [employee, setEmployee] = useState(null); // Datos del empleado actual
  const [supervisorName, setSupervisorName] = useState(null); // Nombre del supervisor
  const [hasError, setHasError] = useState(false);
  const { X } = useParams(); // Obtiene el parámetro de la URL (ID del empleado)

  // Función para obtener los datos del empleado
  const peticion_empleado = async () => {
    try {
      const response = await axios.get(`https://idkmen.pythonanywhere.com/employee/${X}`);
      const employeeData = response.data.length ? response.data[0] : null;
      setEmployee(employeeData); // Guardar datos del empleado

      // Si tiene supervisor, realizar la petición para obtener su nombre
      if (employeeData && employeeData.supervisor) {
        await obtenerNombreSupervisor(employeeData.supervisor);
      }
      setHasError(false);
    } catch (error) {
      console.error("Error al recuperar los datos:", error);
      setHasError(true);
    }
  };

  // Función para obtener el nombre del supervisor
  const obtenerNombreSupervisor = async (supervisorId) => {
    try {
      const response = await axios.get(`https://idkmen.pythonanywhere.com/employee/${supervisorId}`);
      const supervisorData = response.data.length ? response.data[0] : null;
      setSupervisorName(supervisorData ? supervisorData.name : "No disponible"); // Guardar el nombre del supervisor
    } catch (error) {
      console.error("Error al recuperar el nombre del supervisor:", error);
      setSupervisorName("No disponible");
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
        <Cabecera activePage="empleados" />
        <p>Cargando datos del empleado...</p>
      </div>
    );
  }

  return (
    <div>
      <Cabecera activePage="empleados" />
      <div>
        <img src={employee.picture} alt={employee.name} className="imagen" />
        <h2 className="h2">{employee.name}</h2>
        <p className="p"><strong>Id:</strong> {employee.employee_id}</p>
        <p className="p"><strong>Email:</strong> {employee.email}</p>
        <p className="p"><strong>Phone:</strong> {employee.phone}</p>
        <p className="p"><strong>Job Title:</strong> {employee.job_title}</p>
        <p className="p"><strong>Status:</strong> {employee.status}</p>
        <p className="p"><strong>Department:</strong> {employee.department}</p>
        <p className="p"><strong>Office:</strong> {employee.office}</p>
        <p className="p"><strong>Supervisor:</strong> {supervisorName || "No disponible"}</p>
        <p className="p"><strong>Holidays:</strong> {employee.holidays}</p>
        <p className="p"><strong>Birthday:</strong> {employee.birthday}</p>
        <p className="p"><strong>Antiquity:</strong> {employee.antiquity}</p>
      </div>
      <button className="button">
        <Link to="/empleados">Volver</Link>
      </button>
    </div>
  );
};

export default EmpleadoEspecifico;
