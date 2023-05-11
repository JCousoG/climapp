import { createContext, useState } from "react"

const contextoVistas = createContext()

function ServicioVistas({children}) {
    const [vista, setVista] = useState("mostrar carreiras")
    function cambiarVista(visual) {
        setVista(visual)
    }
    const contidoContexto = {vista, cambiarVista}
   
    return(
    <contextoVistas.Provider value={contidoContexto}>
        {children}
    </contextoVistas.Provider>
    )
}

export {
    ServicioVistas,
    contextoVistas
}