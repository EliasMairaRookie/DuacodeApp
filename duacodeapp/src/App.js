import Inicio from './js/Inicio.js'
import NotFound from './js/NotFound';
import Ajustes from './js/ajustes.js';
import Empleados from './js/empleados/empleados.js'
import DistribucionInfo from './js/distribucionInfo/distribucionInfo.js';
import Protocolos from './js/protocolos/protocolos.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Calendario from './js/calendario.js';
import EmpleadoEspecifico from './js/empleados/empleadoEspecifico.js';
import InformacionEmpresa from './js/empresa/informacionEmpresa.js';
import Eventos from './js/empresa/eventos.js';
import NoticiasComunicados from './js/empresa/noticiasYComunicados/noticiasComunicados.js';
import ProyectosClientes from './js/empresa/proyectosYClientes/proyectosClientes.js';
import Comunicados from './js/empresa/noticiasYComunicados/comunicados.js';
import Noticias from './js/empresa/noticiasYComunicados/noticias.js';
import ProyectosAntiguos from './js/empresa/proyectosYClientes/proyectosAntiguos.js';
import ProyectosActuales from './js/empresa/proyectosYClientes/proyectosActuales.js';
import OrganizationChart from './js/empleados/organigrama/organigrama.js';
import { OfficeProvider } from './js/OfficeContext';
import NoticiasEspecificas from './js/empresa/noticiasYComunicados/noticiasEspecificas.js';
import InfoSalas from './js/distribucionInfo/infoSalas.js';
import ProyectoActualEspecifico from './js/empresa/proyectosYClientes/especificos/proyectoActualEspecifico.js';
import ProyectoAntiguoEspecifico from './js/empresa/proyectosYClientes/especificos/proyectoAntiguoEspecifico.js';



function App() {
  return (
    <div>
      <OfficeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={< Inicio />} />
            <Route path="/ajustes" element={< Ajustes />} />
            <Route path="/empleados" element={< Empleados />} />
            <Route path="/organigrama" element={< OrganizationChart />} />


            <Route path="/empresa/informacionEmpresa" element={< InformacionEmpresa />} />
            <Route path="/empresa/eventos" element={< Eventos />} />
            <Route path="/empresa/noticiasComunicados" element={< NoticiasComunicados />} />

            <Route path="/empresa/noticiasComunicados/noticias" element={<Noticias />} />
            <Route path="/empresa/noticiasComunicados/comunicados" element={<Comunicados />} />

            <Route path="/empresa/proyectosClientes" element={< ProyectosClientes />} />

            <Route path="/empresa/proyectosClientes/antiguos" element={<ProyectosAntiguos />} />
            <Route path="/empresa/proyectosClientes/actuales" element={<ProyectosActuales />} />
            <Route path="/empresa/proyectosClientes/antiguos/project/:proyectAntiguoId" element={<ProyectoAntiguoEspecifico />} />
            <Route path="/empresa/proyectosClientes/actuales/project/:proyectActualId" element={<ProyectoActualEspecifico />} />

            <Route path="/distribucionInfo/mapa" element={< DistribucionInfo />} />
            <Route path="/distribucionInfo/info" element={< InfoSalas />} />

            <Route path="/calendario" element={< Calendario />} />
            <Route path="/protocolos" element={< Protocolos />} />
            <Route path="/empleados/:X" element={<EmpleadoEspecifico />} />

            <Route path="/empresa/noticiasComunicados/comunicados/news/:newsId" element={<NoticiasEspecificas />} />
            

            <Route path="/*" element={<NotFound />} /> {/* Ruta para 404 */}
          </Routes>
        </BrowserRouter>
      </OfficeProvider>
    </div>
  );
}


export default App;
