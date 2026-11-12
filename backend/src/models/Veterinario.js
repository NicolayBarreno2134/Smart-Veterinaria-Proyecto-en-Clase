import mongoose from 'mongoose';
import bycrypt from 'bcryptjs';
import { randomBytes } from 'node:crypto';

const { Schema } = mongoose;


const veterinarioSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    apellido:{
        type:String,
        required:true,
        trim:true
    },
    direccion:{
        type:String,
        trim:true,
        default:null
    },
    celular:{
        type:String,
        trim:true,
        default:null
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    token:{
        type:String,
        default:null
    },
    confirmEmail:{
        type:Boolean,
        default:false
    },
    rol:{
        type:String,
        default:"veterinario"
    }

},
{
    timestamps: true 
}
)

//Metodo para cifrar el password
veterinarioSchema.methods.encryptPassword = async function(passwordUser)
{
const salt = bcrypt.genSaltSync(10);
const passwordEncryp= bcrypt.hashSync(passwordUser, salt);
return passwordEncryp
}
//Metodo para verificar si el mismo password es el mismo en la base de datos
veterinarioSchema.methods.matchPassword = async function(passwordUser)
{
    const response=await bcrypt.compare(passwordUser, this.password);
    return response;
}
//Metodo para crear un token (OTP) para el correo no JWT
veterinarioSchema.methods.createToken = function()
{
    const tokenGenerado = randomBytes(2).toString('hex').toUpperCase();
    this.token=tokenGenerado;
    return tokenGenerado;
}
export default model("Veterinario",veterinarioSchema)