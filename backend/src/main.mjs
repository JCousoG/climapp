import express, { response } from "express"
import cors from "cors"
import { Sequelize, DataTypes, where }  from 'sequelize';

const app = express()
app.use(cors())
app.use(express.json())

/**
 * CONFIGURAR TABLAS BASE DE DATOS
 */

/**
 * Creamos una instancia de sequelize apuntando a una
 * base de datos, en este caso un fichero de SQLite.
 * El fichero de SQLite se creará automáticamente.
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

/**
 * Definimos nuestros "modelos".
 * Los modelos representan a los datos almacenados
 * en una tabla de la base de datos.
 */
const Carreira = sequelize.define('Carreira', {
 
  nome: {
    type: DataTypes.STRING
  },
  horario: {
    type: DataTypes.TEXT
  },
  regulamento: {
    type: DataTypes.TEXT
  },
  ubicacion: {
    type: DataTypes.JSON
  },
  circuito: {
    type: DataTypes.TEXT
  },
  data: {
    type: DataTypes.DATE
  }
});
await sequelize.sync()

app.post("/carreiras/", async(request, response)=> {
  try {
    const datosEvento = {...request.body}
    const modeloCarreira = await Carreira.create(datosEvento)

    response.setHeader("Content-Type", "application/json")
    response.status(200).json(modeloCarreira)
  }
  catch (error) {
    console.error(error)
    response.status(500)
    response.send("Error")
  }
})
app.get("/carreiras/", async (request, response)=>{
  // if (request.query.data) {      

      try {
          const data = new Date(request.query.data)
          console.log(request.query.data, data);
          const listaCarreiras = await Carreira.findAll(
            request.query.data ? {
              where: {data: data}
            } : {}
          )
          response.setHeader("Content-Type", "application/json")
          response.status(200)
          response.send(JSON.stringify(listaCarreiras))
      } catch (error) {
        console.error(error)
        response.status(500)
        response.send('Error.')
      }
  // }
})

app.listen( 8000, ()=> {
  console.log("express traballando...");
})