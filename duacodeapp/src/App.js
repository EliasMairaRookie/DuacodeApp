import './App.css';
import Inicio from './js/Inicio.js'
import NotFound from './js/NotFound';
import Ajustes from './js/ajustes.js';
import Empleados from './js/empleados/empleados.js'
import DistribucionInfo from './js/distribucionInfo.js';
import Protocolos from './js/protocolos.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Calendario from './js/calendario.js';

import PruebaAxios from './js/pruebaaxios';


function App() {
  return (
    <div>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={< Inicio/>} />
        <Route path="/ajustes" element={< Ajustes/>} />
        <Route path="/empleados" element={< Empleados/>} />
        <Route path="/eventos" element={< Ajustes/>} />
        <Route path="/noticiasComunicados" element={< Ajustes/>} />
        <Route path="/proyectosClientes" element={< Ajustes/>} />
        <Route path="/distribucionInfo" element={< DistribucionInfo/>} />
        <Route path="/calendario" element={< Calendario/>} />
        <Route path="/protocolos" element={< Protocolos/>} />
        <Route path="/prueba" element={< PruebaAxios/>} />
        <Route path="/*" element={<NotFound />} /> {/* Ruta para 404 */}
      </Routes>
    </BrowserRouter>   
    </div>
  );
}


export default App;
