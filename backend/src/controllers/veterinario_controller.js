import Veterinario from "../models/Veterinario.js"

const registro = async (req,res) =>{
    try {
        //-----------------------------------------------------------------------------------------
        // PASO 1
        const {email, password} = req.body
        //-----------------------------------------------------------------------------------------
        // PASO 2
        if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

        const verificarEmialBDD = await Veterinario.findOne({email})

        if(verificarEmialBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
        
        //-----------------------------------------------------------------------------------------
        // PASO 3
        const nuevoVeterinario = new Veterinario(req.body)

        nuevoVeterinario.password = await nuevoVeterinario.encryptPassword(password)
        await nuevoVeterinario.save()

        //-----------------------------------------------------------------------------------------
        // PASO 4
        res.status(201).json({msg:"Registro exitoso"})
    } catch (error) {
        console.log(error)
    }
}

export {
    registro
}

