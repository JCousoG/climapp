import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login({ruta}) {
    const [nome, setNome] = useState("")
    const [contrasinal, setContrasinal] = useState("")
    const navigate = useNavigate()

    function iniciarSesion() {
        const datos = {nome, contrasinal}
        const datosJSON = JSON.stringify(datos)
        fetch(
            "http://localhost:8000/login/",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: datosJSON,
            }
        )
        .then(reaccionParaRespuesta)
    }

    function reaccionParaRespuesta(response) {
        if (response.ok) {
            setNome("")
            setContrasinal("")
            response.text().then(reaccionParaDatos)
        }
        else  {
            alert ("Nombre de usuario o contraseña incorrectos")
        }
    }
            function reaccionParaDatos(datos) {
                localStorage.setItem("token", datos )
                const token = localStorage.getItem("token")
                
                    if(token) { 
                       navigate(ruta)
                    }
                    else alert("Usuario o contraseña erroneos")
            }
    
    return(
        <>
        <Link to="/">Mostrar carreiras</Link>
        <br></br>
        <label>
            Nome de usuario:
        <input type="text" value={nome} onInput={(evento)=>{setNome(evento.target.value)}}/>
        </label>
        <label>
            Contrasinal:
            <input type="password" value={contrasinal} onInput={(evento)=>{setContrasinal(evento.target.value)}}/>
        </label>
        <button onClick={iniciarSesion}>Iniciar Sesión</button>
        </>
    )
}
export default Login