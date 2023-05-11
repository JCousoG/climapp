import { useContext } from "react"
import { contextoVistas } from "./servicioVistas"

import FormularioEvento from "./formulario";
import MostrarCarreiras from "./mostrarCarreiras";

function Navegador({fecha}) {
    const  { vista } = useContext(contextoVistas)
    return(
        <>
         {vista === "mostrar carreiras" && <MostrarCarreiras fecha={fecha}/>}
         {vista === "formulario" && <FormularioEvento fecha={fecha}/>}
         </>
    )
}
export default Navegador