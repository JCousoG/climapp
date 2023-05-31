import { useEffect, useState } from "react"
import MostrarClima from "./mostrarClima"
import FaltaTempo from "./faltaTempo"

function Meteo({data, id}) {
const [clima, setClima] = useState([])

useEffect(obterClima, [id])

function obterClima() {
    if (new Date(data).valueOf() <= new Date().valueOf() + 432000000) {
        
        fetch("http://localhost:8000/meteo/?id="+id)
        .then(reaccionParaResposta)
        .catch(reaccionErroResposta)
        function reaccionParaResposta(response) {
            response.json().then(reaccionParaResultados)        }
        function reaccionErroResposta(erro) {
        alert("Estamos tendo problemas coa conexión para intentalo máis tarde")
        console.error(erro)           }
        function reaccionParaResultados(datos) {
            setClima(datos)        }

    } }
       


    return(
        <>
            <ul>
            { clima.length ? <MostrarClima data ={data} climas={clima} /> : <FaltaTempo/>}
            </ul>
        
        
        </>
    )
}
export default Meteo