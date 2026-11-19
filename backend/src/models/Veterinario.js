import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import { randomBytes } from 'node:crypto';

const { Schema } = mongoose;

const veterinarioSchema = new Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    direccion: {
        type: String,
        required: true,
        default: null
    },
    celular: {
        type: String,
        trim: true,
        default: null
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    token: {
        type: String,
        default: null
    },
    confirmEmail: {
        type: Boolean,
        default: false // Corregido "defalt" a "default"
    },
    rol: {
        type: String,
        default: "veterinario"
    }
}, {
    timestamps: true // Movido correctamente al segundo argumento del Schema
});

// Método para cifrar el password
veterinarioSchema.methods.encryptPassword = async function(passwordUser) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(passwordUser, salt);
    return hash; // Corregido: se retorna 'hash' en lugar de 'passwordEncrypt'
}

// Método para verificar si el password es el mismo de la BDD
veterinarioSchema.methods.matchPassword = async function(passwordUser) {
    const response = await bcrypt.compare(passwordUser, this.password);
    return response; 
}

// Método para crear un token (OTP) para el correo no JWT
veterinarioSchema.methods.createToken = function() {
    const tokenGenerado = randomBytes(2).toString('hex').toUpperCase();
    this.token = tokenGenerado;
    return tokenGenerado;
}

// Corregido: Usar mongoose.model ya que 'model' no estaba importado de forma individual
export default mongoose.model('Veterinario', veterinarioSchema);