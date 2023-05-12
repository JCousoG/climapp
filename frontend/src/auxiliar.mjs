function recuperarDiaSeleccionado() {
  return localStorage.getItem("diaSeleccionado") ? new Date (JSON.parse(localStorage.getItem("diaSeleccionado"))) : new Date()
}
export default recuperarDiaSeleccionado