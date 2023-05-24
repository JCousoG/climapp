function CerrarSesion() {
    function logout() {
        localStorage.removeItem("token")
        window.location.reload()
    }
    return(
        <button onClick={logout}>Cerrar Sesión</button>
    )
}
export default CerrarSesion