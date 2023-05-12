import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import recuperarDiaSeleccionado from "../auxiliar.mjs";

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
        <Link to="/formulario/">Engade unha carreira</Link>
        
        <ul>
            {listaCarreiras.map( carreira => <li><Link to={"/carreira/"+carreira.id} target="_blank">{carreira.nome}</Link></li>)}
        </ul>
        </>

    )
}
export default MostrarCarreiras
//target="_blank" para abrir nunha pestaña nova