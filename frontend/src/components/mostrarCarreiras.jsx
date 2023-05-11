import { useState, useEffect, useContext } from "react"
import { contextoVistas } from "./servicioVistas"

function MostrarCarreiras({fecha}) {
  const { cambiarVista } = useContext(contextoVistas)

const [listaCarreiras, setListaCarreiras] = useState([])
useEffect(
    obterCarreiras,
    [fecha])
    function obterCarreiras() {
    
        fetch("http://localhost:8000/carreiras/?data="+fecha.toISOString())
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

    function formulario() {
     
      cambiarVista("formulario")
    }
    return(
        <>
        <button onClick={formulario}>Pulsa aquí para engadir unha carreira</button>
        <ul>
            {listaCarreiras.map( carreira => <li>{carreira.nome}</li>)}
        </ul>
        </>

    )
}
export default MostrarCarreiras
//target="_blank" para abrir nunha pestaña nova