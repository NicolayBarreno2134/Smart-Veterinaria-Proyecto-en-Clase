//Requerir modulos
import express from "express";
import dotenv from "dotenv";
import routerVeterinarios from "./routers/veterinario_routes.js";


//Inicializaciones
const app =express();


//Configuraciones
dotenv.config();



//Middlewares








//Variables globales
console.log(process.env.PORT)
app.set("port",process.env.PORT || 3000)


//Rutas
app.get("/",(req,res)=>res.send({"message": "Bienvenido a la API de Veterinaria"}))

app.use("/api",routerVeterinarios)

// Exportar la instrancia de express por medio de app

export default app
