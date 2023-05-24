import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MostrarCarreiras from './components/mostrarCarreiras';
import FormularioEvento from './components/formulario';
import DatosCarreira from './components/datosCarreira';
import recuperarDiaSeleccionado from './auxiliar.mjs';
import Login from "./components/Login";
import CrearUsuario from "./components/crearUsuario";
import ModificarCarreira from "./components/modificarCarreira";
function App() {

  const [value, onChange] = useState(recuperarDiaSeleccionado());

  function gardarDia (diaSeleccionado) {
    localStorage.setItem("diaSeleccionado", JSON.stringify(diaSeleccionado))
  }

  return (
    <div>
      <Calendar onChange={onChange} value={value} onClickDay={gardarDia}/>
      <BrowserRouter>
      
      
    
    
    <main>
      <Routes>
        <Route path='/' element={<MostrarCarreiras dia={value} />}/>
        <Route path='/formulario/' element={<FormularioEvento ruta="/formulario" />}/>
        <Route path='/carreira/:id' element={<DatosCarreira />}/>
        <Route path='/modificar/:id' element={<ModificarCarreira/>}/>
        <Route path="/login/" element={<Login ruta='/'/>}/>
        <Route path="/usuario/" element={<CrearUsuario ruta="/login/"/>}/>
      </Routes>
    </main>
  </BrowserRouter>
     
      
    </div>
  );
}
export default App