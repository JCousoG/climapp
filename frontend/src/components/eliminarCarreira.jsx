function EliminarCarreira({id, obterCarreiras}) {
   
    
    function manexadorClick() {
      const token = localStorage.getItem("token")
      if(token) {
        fetch( 
            "http://localhost:8000/carreiras/?id="+id,
            {
                method: "DELETE"
            }
            )
            .then(reaccionParaResposta)
            .catch(reaccionParaErroResposta)
        } else {alert ("No tienes permiso para eliminar una carrera, inicia sesión para poder hacerlo.")}
    }
        
        function reaccionParaResposta(resposta) {
            if (resposta.ok) {
                obterCarreiras()
            } else {
                alert(`A petición non foi aceptada ${resposta.status}`)
            }
        }
        function reaccionParaErroResposta(erro) {
            alert("Estamos tendo problemas coa conexión neste momento, probe a intentalo máis tarde")
    }
    return (
        <>

        <button onClick={manexadorClick}>x</button>
        
        </>
    )
}
export default EliminarCarreira