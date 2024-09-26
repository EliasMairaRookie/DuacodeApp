import './App.css';
import Cabecera from './js/cabecera';
import NotFound from './js/NotFound';
import Ajustes from './js/ajustes.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cabecera />} />
        <Route path="/ajustes" element={< Ajustes/>} />
        <Route path="*" element={<NotFound />} /> {/* Ruta para 404 */}
        {/* Ejemplo de un browser Route
              <BrowserRouter>
        <Routes>
        <Route path="/" element={<Container></Container>}>
          <Route index element={<Home></Home>}></Route>
          <Route path="/detalle/:X" element={<Pokemon/>}></Route>
        </Route>

          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
        */}
      </Routes>
    </BrowserRouter>   
      
  );
}

export default App;
