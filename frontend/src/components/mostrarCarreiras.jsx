import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import EliminarCarreira from "./eliminarCarreira";
import Vista from "./vista";
//import recuperarDiaSeleccionado from "../auxiliar.mjs";

function MostrarCarreiras({dia}) {
  // useEffect(
  //   obterCarreiras,
  //   [fecha])



const [listaCarreiras, setListaCarreiras] = useState([])
useEffect(
    obterCarreiras,
    [dia])
    function obterCarreiras() {
    
        fetch("http://localhost:8000/carreiras/?data="+dia.toISOString())
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
        <Vista/>
        <br></br><Link to={"/formulario/"}>Dar de alta una carrera</Link>
        
        <ul>
            {listaCarreiras.map( carreira => <li><Link to={"/carreira/"+carreira.id} target="_blank">{carreira.nome}</Link><EliminarCarreira id={carreira.id} obterCarreiras={obterCarreiras}/></li>)}
        </ul>
        </>

    )
}
export default MostrarCarreiras