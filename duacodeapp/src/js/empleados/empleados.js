import Cabecera from "../cabecera";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MenuEmpleados from './menuEmpleados';
import WithLoader from "../WithLoader"; // Importamos el componente WithLoader
import '../../css/empleados/empleados.css';
import { MagicMotion } from "react-magic-motion";

const Empleados = () => {
  const [dataEmployeeFiltrada, setDataEmployeeFiltrada] = useState([]);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Control de carga

  const peticion_empleados = async () => {
    setIsLoading(true); // Comienza la carga
    await axios.get('https://idkmen.pythonanywhere.com/employee/')
      .then(response => {
        console.log(response.data);
        setDataEmployeeFiltrada(response.data);
        setDataEmployee(response.data);
        setHasError(false);
      })
      .catch(error => {
        console.error('Error al recuperar los datos:', error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false); // Finaliza la carga
      });
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  useEffect(() => {
    peticion_empleados();
  }, []);

  if (hasError) {
    return (
      <div>
        <Cabecera activePage="empleados" />
        <p>Puede que el servidor esté apagado o exista algún problema con él.</p>
      </div>
    );
  }

  const filtrar = (terminoBusqueda) => {
    const ResultadosBusqueda = dataEmployeeFiltrada.filter((elemento) => {
      if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
        return elemento;
      }
      return null;
    });
    setDataEmployee(ResultadosBusqueda);
  };

  return (
    <div>
      <Cabecera activePage="empleados" />
      <MenuEmpleados />
      <div className="containerInput">
        <input
          className="inputBuscar"
          value={busqueda}
          placeholder="Busqueda por nombre"
          onChange={handleChange}
        />

      </div>

      <WithLoader isLoading={isLoading}> {/* Aquí se envuelve solo la parte de carga */}
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
                  <p><strong>Correo:</strong> {employee.email}</p>
                  <p><strong>Telefono:</strong> {employee.phone}</p>
                  <p><strong>Puesto:</strong> {employee.job_title}</p>
                  <p><strong>Estado:</strong> {employee.status}</p>
                </div>
              </Link>
            ))}
          </div>
        </MagicMotion>
      </WithLoader>
    </div>
  );
};

export default Empleados;

