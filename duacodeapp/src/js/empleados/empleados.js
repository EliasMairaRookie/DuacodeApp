import Cabecera from "../cabecera";
import React,{ useState,useEffect } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import MenuEmpleados from './menuEmpleados';
import '../../css/empleados/empleados.css';

const Empleados=()=>{

    const [dataEmployeeFiltrada, setDataEmployeeFiltrada]=useState([]);
    const [dataEmployee, setDataEmployee]=useState([]);
    const [hasError ,setHasError]=useState(false);
    const [busqueda, setBusqueda ]=useState("");

const peticion_empleados=async()=>{
  axios.get('http://127.0.0.1:8000/employee/')
  .then(response => {
    setDataEmployee(response.data);
    setDataEmployeeFiltrada(response.data);
    setHasError(false);
  })
  .catch(error => {
    console.error('Error al recuperar los datos:', error);
    setHasError(true);
  });

}
const handleChange = (e) => {
  setBusqueda(e.target.value);
  filtrar( e.target.value);

}

useEffect(() =>{
  peticion_empleados();
},[])

if (hasError){
  return (<div>
   <Cabecera></Cabecera>
     <p>Puede que el servidor este apagado o exista algun problema con el</p>
    </div>)
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
            <Cabecera></Cabecera>
            <MenuEmpleados></MenuEmpleados>
            <div className="containerInput">
              <input
                className="form-control inputBuscar"
                value={busqueda}
                placeholder="Busqueda por nombre"
                onChange={handleChange}
              />
              <button className="btn btn-succes"><FontAwesomeIcon icon={faSearch}/></button>
            </div>
          {dataEmployee.map((dataEmployee) => (
            <div key={dataEmployee.employeeId}>
              <img src={dataEmployee.picture} alt={dataEmployee.name} />
              <h2>{dataEmployee.name}</h2>
              <p><strong>Id:</strong> {dataEmployee.employeeId}</p>
              <p><strong>Email:</strong> {dataEmployee.email}</p>
              <p><strong>Phone:</strong> {dataEmployee.phone}</p>
              <p><strong>Job Title:</strong> {dataEmployee.job_title}</p>
              <p><strong>Status:</strong> {dataEmployee.status}</p>
              <p><strong>Birthday:</strong> {dataEmployee.birthday}</p>
              <p><strong>Antiquity:</strong> {dataEmployee.antiquity}</p>
              <p><strong>Office:</strong> {dataEmployee.office}</p>
              <p><strong>Supervisor:</strong> {dataEmployee.supervisor ? dataEmployee.supervisor : 'No supervisor'}</p>
            </div>
          ))}
        </div>
      );
}
export default Empleados;