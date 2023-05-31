import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import EliminarCarreira from "./eliminarCarreira";
import Vista from "./vista";
import recuperarDiaSeleccionado from '../auxiliar.mjs';
import Calendar from 'react-calendar';
//import recuperarDiaSeleccionado from "../auxiliar.mjs";

function MostrarCarreiras() {
  // useEffect(
  //   obterCarreiras,
  //   [fecha])

  const [value, onChange] = useState(recuperarDiaSeleccionado());

  function gardarDia (diaSeleccionado) {
    localStorage.setItem("diaSeleccionado", JSON.stringify(diaSeleccionado))
  }

const [listaCarreiras, setListaCarreiras] = useState([])
useEffect(
    obterCarreiras,
    [value])
    function obterCarreiras() {
    
        fetch("http://localhost:8000/carreiras/?data="+value.toISOString())
    .then(reaccionParaResposta)
    .catch(reaccionErroResposta)
    function reaccionParaResposta(resposta){
        resposta.json().then(reaccionParaResultados)
      }
      function reaccionErroResposta(erro) {
        alert("Estamos tendo problemas coa conexión neste momento, probe a intentalo máis tarde")
        console.error(erro);
      }
    
      function reaccionParaResultados(novosDatos){
        setListaCarreiras(novosDatos)
      }
  
    }
 

  
    return(
        <>
         <Calendar onChange={onChange} value={value} onClickDay={gardarDia}/>
        <Vista/>
        <br></br><Link to={"/formulario/"}>Dar de alta una carrera</Link>
        
        <ul>
            {listaCarreiras.map( carreira => <li><Link to={"/carreira/"+carreira.id} target="_blank">{carreira.nome}</Link><EliminarCarreira id={carreira.id} obterCarreiras={obterCarreiras}/></li>)}
        </ul>
        </>

    )
}
export default MostrarCarreiras