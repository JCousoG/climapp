import express, { response } from "express"
import cors from "cors"
import { Sequelize, DataTypes, where }  from 'sequelize';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

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

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    unique: true
  },
  contrasinal: {
    type: DataTypes.STRING
  }
});
Usuario.hasMany(Carreira);
Carreira.belongsTo(Usuario);
await sequelize.sync()

app.post("/usuarios/", async (request, response) => {
  try {
    const hash = bcrypt.hashSync(request.body.contrasinal, 10)
    const novosDatos = {...request.body, contrasinal: hash}
    const modeloUsuario = await Usuario.create(novosDatos)

    response.setHeader("Content-Type", "application/json")
    response.status(200).json(modeloUsuario)
  }

  catch (error) {
    console.error(error)
    response.status(500)
    response.send('Error')
  }
})
app.post("/login/", async (request, response) => {
  try {
    const usuario = await Usuario.findOne({
      where: {nome: request.body.nome}
    })
    const autenticado = bcrypt.compareSync(request.body.contrasinal, usuario?.contrasinal ?? "")
    if (autenticado) {
      const paseAutorizacion = jwt.sign({ id: usuario.id}, process.env.JWT_SECRET)
      return response.send(paseAutorizacion)
    }
    return response.sendStatus(401)
  } catch (error) {
    console.error(error)
    response.status(500)
    response.send('Error')

  }
})

app.post("/carreiras/", middlewareauthorization,  async(request, response)=> {
  try {
    const datosEvento = {...request.body, UsuarioId: response.locals.authorization.id}
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
  app.put("/carreiras/", middlewareauthorization,  async(request, response)=> {
    try {
      const id = parseInt(request.query.id)
      const carreira = await Carreira.findByPk(id)
      await carreira.update(request.body)
  
      response.status(200).json(carreira)
    }
    catch (error) {
      console.error(error)
      response.status(500)
      response.send("Error")
    }
})
app.get("/carreiras/", async (request, response)=>{
  if (request.query.data) {      

      try {
          const data = new Date(request.query.data)
          console.log(request.query.data, data);
          const listaCarreiras = await Carreira.findAll(
              {
              where: {data: data}
            }
          )
          response.setHeader("Content-Type", "application/json")
          response.status(200)
          response.send(JSON.stringify(listaCarreiras))
      } catch (error) {
        console.error(error)
        response.status(500)
        response.send('Error.')
      }
  }

  else if (request.query.id) {      

    try {
        const id = parseInt(request.query.id)
        const datosCarreira = await Carreira.findByPk(id        )
        response.setHeader("Content-Type", "application/json")
        response.status(200)
        response.send(JSON.stringify(datosCarreira))
    } catch (error) {
      console.error(error)
      response.status(500)
      response.send('Error.')
    }
} else (error) => {
  console.error(error)
  response.status(404)
  response.send('Error')
}
})
app.delete("/carreiras/", async (request, response)=> {
  try {const id= parseInt(request.query.id)
      const carreira= await Carreira.findByPk(id)
      await carreira.destroy()
      response.sendStatus(200)}
  catch(error) {
    console.error(error)
    response.status(500)
    response.send('Error')
  }

})

function middlewareauthorization(request, response, next) {
  try {
    const [_, token] = request.headers.authorization.split(" ")
    const datosAutorizacion = jwt.verify(token, process.env.JWT_SECRET)
    response.locals.authorization = datosAutorizacion
    return next()
} catch (error) {
    resposta.sendStatus(403)
}
}


app.listen( 8000, ()=> {
  console.log("express traballando...");
})