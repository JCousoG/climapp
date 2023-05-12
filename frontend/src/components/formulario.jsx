import { Link } from "react-router-dom"
import { useState } from "react"
import recuperarDiaSeleccionado from "../auxiliar.mjs"
function FormularioEvento() {
    const fecha = recuperarDiaSeleccionado()
    const [nome, setNome] = useState("")
    const [horario, setHorario] = useState("")
    const [regulamento, setRegulamento] = useState("")
    const [circuito, setCircuito] = useState()
    const [ubicacion, setUbicacion] = useState()

    function manexadorCircuito(evento) {
       const reader = new FileReader()
       reader.readAsText(evento.target.files[0])
       reader.addEventListener("load",()=>setCircuito(reader.result))
    }

    async function enviarCarreira() {
        const carreira = {nome, horario, regulamento, circuito, ubicacion, data: fecha}
        try {
            const carreiraJSON = JSON.stringify(carreira)
            const response = await fetch(
                "http://localhost:8000/carreiras",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/JSON"
                    },
                    body: carreiraJSON}
            )
            if (response.ok) {
                setNome("")
                setCircuito("")
                setHorario("")
                setRegulamento("")
                setUbicacion("")}
                else { (alert("Non se poideron gardar os datos"))}
                console.log(response);
        }
       
        catch(excepcion) {
console.log(excepcion)
        }
    }
    
    return(
        <>
            <Link to="/">Carreiras</Link>
            <label>
                Introduce o nome do evento:
                <input type="text"    value={nome} onInput={(evento)=>{setNome(evento.target.value)}}/>
            </label>
            <label>
                Introduce as horas nas que terá lugar o evento
                <textarea rows={10}    value={horario} onInput={(evento)=>{setHorario(evento.target.value)}}/>
            </label>
            <label>
                Introduce a ubicacion da saida da proba
                <input type="text" value={ubicacion} onInput={(evento)=>{setUbicacion(evento.target.value)}}/>
            </label>
            <label>
                Introduce o circuito da proba
                <input type="file"  onInput={manexadorCircuito}/>
            </label>
            <label>
                Introduce aquí o regulamento
                <textarea rows={10}  value={regulamento} onInput={(evento)=>{setRegulamento(evento.target.value)}}/>
            </label>
            <button type="submit" onClick={enviarCarreira}>Garda a Carreira</button>
           
            
        </>
    )
}
export default FormularioEvento