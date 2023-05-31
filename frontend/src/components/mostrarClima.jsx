function MostrarClima({climas, data}) {
    const diaCarreira = new Date(data).getDate()
    const climasDoDia = climas.filter(clima => {
        const diaPrevision = new Date(clima.dt_txt).getDate()
        return diaCarreira === diaPrevision
    })
return(
    <>
    <h2>Previsión metereolóxica para o día da carreira</h2>
    <div className="datosClima">
    <ul>
            {
                climasDoDia.map (
                    clima => <li> <h3>{clima.dt_txt}</h3><h3> Temperatura:</h3> <h4>{clima.main.temp}º</h4> <h3>Sensación térmica: </h3> <h4>{clima.main.feels_like}º</h4> <h3>Estado do ceo:</h3><h4>{clima.weather[0].description} </h4><img src={"https://openweathermap.org/img/wn/"+clima.weather[0].icon+"@2x.png"}/></li>)
            }
            
        </ul>
        </div>

      

 
    </>
)
}
export default MostrarClima