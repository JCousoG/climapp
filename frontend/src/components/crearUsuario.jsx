import { useState } from "react"
import { useNavigate } from "react-router-dom";

function CrearUsuario({ruta}) {
    const [nome, setNome] = useState("")
    const [contrasinal, setContrasinal] = useState("")
    const [repetirContrasinal, setRepetirContrasinal] = useState("")
    const navigate = useNavigate()
    
    async function enviarUsuario() {
    if (contrasinal === repetirContrasinal) {
        try {
            const datosUsuario = {nome, contrasinal}
            const usuarioJSON = JSON.stringify(datosUsuario)
            const resposta = await fetch(
                "http://localhost:8000/usuarios/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: usuarioJSON
                }
            )
            if (resposta.ok) {
                setNome("")
                setContrasinal("")
                setRepetirContrasinal("")
                navigate(ruta)
                }
                else { (alert("Non se poideron gardar os datos"))}
                console.log(resposta);
            
        } catch (excepcion) {
            console.error(excepcion)}}
     else  alert ("Os contrasinais non coinciden")}
    return(
        <>
        <h2>Crea un nuevo usuario</h2>
        
        <input type="text" placeholder="Introduza un nome de usuario" value={nome} onInput={(evento)=>{setNome(evento.target.value)}}/>
        
            
        <input type="password" placeholder="Introduza un contrasinal" value={contrasinal} onInput={(evento)=>{setContrasinal(evento.target.value)}}/>
        <input type="password" placeholder="Volva a introducir o contrasinal" value={repetirContrasinal} onInput={(evento)=>{setRepetirContrasinal(evento.target.value)}}/>
        <button onClick={enviarUsuario}>Enviar</button>
        </>
    )
}
 export default CrearUsuario