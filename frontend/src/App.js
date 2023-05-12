import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import MostrarCarreiras from './components/mostrarCarreiras';
import FormularioEvento from './components/formulario';
import DatosCarreira from './components/datosCarreira';
import recuperarDiaSeleccionado from './auxiliar.mjs';
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
        <Route path='/formulario/' element={<FormularioEvento />}/>
        <Route path='/carreira/:id' element={<DatosCarreira />}/>
      </Routes>
    </main>
  </BrowserRouter>
     
      
    </div>
  );
}
export default App