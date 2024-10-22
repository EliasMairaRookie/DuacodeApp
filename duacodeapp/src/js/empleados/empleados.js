import Cabecera from "../cabecera";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import MenuEmpleados from './menuEmpleados';
import '../../css/empleados/empleados.css';
import { MagicMotion } from "react-magic-motion";






const Empleados = () => {
  const [dataEmployeeFiltrada, setDataEmployeeFiltrada]=useState([]);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  

  const peticion_empleados = async () => {
    await axios.get('http://127.0.0.1:8000/employee/')
      .then(response => {
        console.log(response.data);
        setDataEmployeeFiltrada(response.data);
        setDataEmployee(response.data);
        setHasError(false);
      })
      .catch(error => {
        console.error('Error al recuperar los datos:', error);
        setHasError(true);
      });
  };
  


  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar( e.target.value);
  };

  useEffect(() => {
    peticion_empleados();
  }, []);

  if (hasError) {
    return (
      <div>
        <Cabecera />
        <p>Puede que el servidor esté apagado o exista algún problema con el</p>
      </div>
    );
  }

  const filtrar=(terminoBusqueda)=>{
    var ResultadosBusqueda=dataEmployeeFiltrada.filter((elemento)=>{
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
        return elemento;
      }
    });
    setDataEmployee(ResultadosBusqueda);
  }

  return (
    <div>
      <Cabecera />
      <MenuEmpleados />
      <div className="containerInput">
        <input
          className="inputBuscar"
          value={busqueda}
          placeholder="Busqueda por nombre"
          onChange={handleChange}
        />
        <button className="btn-succes">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {dataEmployee.length === 0 && (
        <div className="no-results">
          No hay resultados para esa búsqueda.
        </div>
      )}
      <MagicMotion>
      <div className="empleadosDisplay">
      {dataEmployee.map((employee) => (
        <Link to={`/empleados/${employee.employee_id}`} key={employee.employee_id}>
          <div className="empleadosCard">
            <img src={employee.picture} alt={employee.name} />
            <h2>{employee.name}</h2>
            <p><strong>Id:</strong> {employee.employee_id}</p>
            <p><strong>Email:</strong> {employee.email}</p>
            <p><strong>Phone:</strong> {employee.phone}</p>
            <p><strong>Job Title:</strong> {employee.job_title}</p>
            <p><strong>Status:</strong> {employee.status}</p>
          </div>
        </Link>
      ))}
      </div>
      </MagicMotion>
    </div>
  );
};

export default Empleados;
