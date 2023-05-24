
import IniciarSesion from "./iniciarSesion"
import CerrarSesion from "./cerrarsesion"

function Vista() {
    const token = localStorage.getItem("token")
     return(
        <>
        { token ?   <CerrarSesion/> : <IniciarSesion/> }
        </>
     )
    // const [sesion, setSesion] = useState()
    // useEffect(comprobarSesion, [token])
    // function comprobarSesion() {
    //  if (token) {setSesion("cerrarSesion")} else  {setSesion("iniciarSesion")}}
    //  return(
    //     <>
    //     {sesion === "iniciarSesion" && <IniciarSesion/>}
    //     {sesion === "cerrarSesion" && <CerrarSesion/>}
    //     </>
    //  )
}
export default Vista