import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Navegador from './components/navegador';
import { ServicioVistas } from './components/servicioVistas';
function App() {
  const [value, onChange] = useState(new Date());
  const [ diaSeleccionado, setDiaSeleccionado ] = useState(new Date())

  return (
    <div>
      <Calendar onChange={onChange} value={value} onClickDay={setDiaSeleccionado}/>
      <ServicioVistas>
      <Navegador fecha={diaSeleccionado}/>
      </ServicioVistas>
    </div>
  );
}
export default App