import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
function DatosCarreira() {
    const { id } = useParams()
    const [detallesCarreira, setDetallesCarreira] = useState({})
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
    function fechaCarreira() {
        return new Date(detallesCarreira.data).toLocaleDateString('es-Es')
    }
    return(
        <>

        <h2>Datos da carreira</h2>
        <br></br><Link to={"/modificar/"+detallesCarreira.id}>Modifica los datos de la carrera</Link>
        <ul>
            <li>{fechaCarreira()}</li>
            <li>{detallesCarreira.nome}</li>
            <li>{detallesCarreira.horario}</li>
            <li>{detallesCarreira.regulamento}</li>
        </ul>
        </>
    )
}
export default DatosCarreira