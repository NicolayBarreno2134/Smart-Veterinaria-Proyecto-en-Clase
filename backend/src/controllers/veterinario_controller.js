import Veterinario from "../models/Veterinario.js"


const registro = async (req,res) => {
    try{
        const { nombre, apellido, direccion, celular, email, password } = req.body || {}

        if ([nombre, apellido, direccion, celular, email, password].some((campo) => typeof campo !== "string" || !campo.trim())) {
            return res.status(400).json({msg:'Lo sentimos debe llenar todos los campos'})
        }

        if (password.length < 6) {
            return res.status(400).json({msg:'La contraseña debe tener al menos 6 caracteres'})
        }

        if (!/^\d{7,15}$/.test(celular.trim())) {
            return res.status(400).json({msg:'El celular debe contener entre 7 y 15 dígitos'})
        }

        const emailNormalizado = email.trim().toLowerCase()
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailNormalizado)) {
            return res.status(400).json({msg:'El correo electrónico no tiene un formato válido'})
        }

        const verificarEmailBDD = await Veterinario.findOne({ email: emailNormalizado })
        
        if(verificarEmailBDD){
            return res.status(400).json({msg:'Lo sentimos ya esta el email'})}

        const nuevoVeterinario = new Veterinario({
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            direccion: direccion.trim(),
            celular: celular.trim(),
            email: emailNormalizado,
            password
        })

        nuevoVeterinario.password = await nuevoVeterinario.encryptPassword(password)

        await nuevoVeterinario.save()
        res.status(201).json({msg:"Registro exitoso"})
    }catch(error){
        console.error(error)
        if (error?.code === 11000) {
            return res.status(400).json({msg:'Lo sentimos, ese correo electrónico ya está registrado'})
        }
        if (error?.name === "ValidationError") {
            return res.status(400).json({msg:'Los datos registrados no cumplen con los requisitos'})
        }
        res.status(500).json({msg:"Ocurrió un error al registrar el usuario"})
    }
}

export{
    registro
}
