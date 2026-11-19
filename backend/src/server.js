// Requerir modulos
import express from "express"
import dotenv from "dotenv"
import routerVeterinarios from "./routers/veterinario_routers.js"
import cors from 'cors';

// Inicializacion
const app = express()

// Configuraciones
dotenv.config()

// Middlewares
app.use(express.json())
app.use(cors())
// Variables Globales
app.set("port", process.env.PORT || 3000)



// Rutas
app.get("/", (req,res)=>res.send("Bienvenidos, aqui se le muere el firulais"))
app.use('/api', routerVeterinarios)


// Exportar la instancia de express por medio de app
export default app