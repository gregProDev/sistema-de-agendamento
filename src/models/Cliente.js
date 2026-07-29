const mongoose = require("mongoose")

/* Cliente (Postman/Frontend)
        │
        ▼
Routes
        │
        ▼
Controller
        │
        ▼
Service
        │
        ▼
Model (MongoDB) */

/*{
    nome,
    email,
    senha,
    telefone,
    role
}*/

const clienteSchema = new mongoose.Schema({

    nome: {
        type: String,
        required: true,
        
    },
   
    email: {
        type: String,
        required: true,
        unique: true
    },

    senha: {
        type: String,
        required: true,
        select:false
    },

    telefone: {
         type: String,
         required: true,
         unique: true
    },

    ativo: {
    type: Boolean,
    default: true
    },

    role: {
    type: String,
    enum: ["CLIENTE", "ADMIN"],
    default: "CLIENTE"
    }
})

module.exports = new mongoose.model("Cliente", clienteSchema);