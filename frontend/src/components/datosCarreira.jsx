import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import Meteo from "./meteo";
import Calendar from "react-calendar";
import recuperarDiaSeleccionado from '../auxiliar.mjs';

function DatosCarreira() {
  const [value] = useState(recuperarDiaSeleccionado());
    const { id } = useParams()
    const [detallesCarreira, setDetallesCarreira] = useState({})
    const [datos, setDatos] = useState("")
    useEffect(
        obterDatos,
        [id])
        function obterDatos() {
        
            fetch("http://localhost:8000/carreiras/?id="+id)
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
            setDetallesCarreira(novosDatos)
          }
      
        } 
        useEffect(obertRecorrido,[detallesCarreira])
        function obertRecorrido() {
        
         if (detallesCarreira.circuito) setDatos(encodeURI(detallesCarreira.circuito))
        }
    
  
    
    return(
        <div id="datosCarreira">
          <div id="titulo"> <h1>{detallesCarreira.nome}</h1></div>
         <div id="calendario">  <Calendar value={value}/> </div>
         <div id="meteo"> { detallesCarreira?.data && <Meteo data={detallesCarreira.data} id={detallesCarreira.id}/>}</div>
         <div id="resto">
        
       
       <h2>Datos da carreira</h2>
        
      
       
       
        
           {datos ? <a download="recorrido.gpx" href={`data:application/gpx+xml,${datos}`}> 
              Descarga o GPX
            </a>: <p></p>}
            <h3>Horario da proba</h3>
            <p>{detallesCarreira.horario}</p>
            <h3>Regulamento</h3>
            <p>{detallesCarreira.regulamento}</p>
            <Link to={"/modificar/"+detallesCarreira.id}>Modifica los datos de la carrera</Link>
        </div>
        </div>
    )
}
export default DatosCarreira