import { Link } from "react-router-dom"
function IniciarSesion() {
    return (
        <>
        <Link to="/login/">Inicia sesión para engadir unha carreira</Link>
        <br></br>
        <Link to="/usuario">Date de alta se non dispos de un usuario</Link>
        </>
    )
}
export default IniciarSesion