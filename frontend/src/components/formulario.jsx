import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import recuperarDiaSeleccionado from "../auxiliar.mjs"
function FormularioEvento({ruta}) {
    const fecha = recuperarDiaSeleccionado()
    const [nome, setNome] = useState("")
    const [horario, setHorario] = useState("")
    const [regulamento, setRegulamento] = useState("")
    const [circuito, setCircuito] = useState()
    const [ubicacion, setUbicacion] = useState()
    const [ficheiro, setFicheiro] = useState()

    const navigate = useNavigate()

    function manexadorCircuito(evento) {
        setFicheiro(evento.target.value)
       const reader = new FileReader()
       reader.readAsText(evento.target.files[0])
       reader.addEventListener("load",()=>setCircuito(reader.result))
    }

    async function enviarCarreira() {
        const token = localStorage.getItem("token")
        const carreira = {nome, horario, regulamento, circuito, ubicacion, data: fecha}
        
        if (token) {
        try {
            const carreiraJSON = JSON.stringify(carreira)
            const response = await fetch(
                "http://localhost:8000/carreiras",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/JSON",
                        authorization: "Bearer "+localStorage.getItem("token")
                    },
                    body: carreiraJSON}
            )
            if (response.ok) {
                setNome("")
                setCircuito()
                setFicheiro("")
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
    else {alert("Inicia sesión para poder enviar una carrera")}
    }
    function cerrarSesion() {
        localStorage.removeItem("token")
        const token = localStorage.getItem("token")
    if(!token) { 
        navigate(ruta)
     }
    }
    
    
    return(
        <>  <h2>Formulario de alta de carreiras</h2>
        <nav>
        <ul>
            <li><Link to="/">Ver carreiras</Link></li>
            <li><Link to="./components/Login">Inicia Sesión</Link></li>
            <li><Link to="./components/crearUsuario">Date de alta</Link></li>
        </ul>
        </nav>
            <label>
                Introduce o nome do evento:
                <input type="text"    value={nome} onInput={(evento)=>{setNome(evento.target.value)}}/>
            </label>
            <label>
                Introduce as horas nas que terá lugar o evento
                <input type="text"   value={horario} onInput={(evento)=>{setHorario(evento.target.value)}}/>
            </label>
            <label>
                Introduce a ubicacion da saida da proba
                <input type="text" value={ubicacion} onInput={(evento)=>{setUbicacion(evento.target.value)}}/>
            </label>
            <label>
                Introduce o circuito da proba
                <input type="file" value={ficheiro} onInput={manexadorCircuito}/>
            </label>
            <label>
                Introduce aquí o regulamento
                <input type="text"  value={regulamento} onInput={(evento)=>{setRegulamento(evento.target.value)}}/>
            </label>
            <button type="submit" onClick={enviarCarreira}>Garda a Carreira</button>
            <button onClick={cerrarSesion}>Pecha a sesión</button>
        </>
    )
}
export default FormularioEvento