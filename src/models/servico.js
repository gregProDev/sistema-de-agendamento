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

/*Servico

nome

descricao

duracao

preco

ativo*/

const servicoSchema = new mongoose.Schema({

    nome:{

        type: String,
        required: true,
        trim: true       
    },
   
    descricao: {
        type: String,
        required: true,
    },

    duracao: {
        type: Number,
        required: true,
        min: 1
    },

    preco: {
         type: Number,
         required: true,
         min: 0.01
    },

    ativo: {
        type: Boolean,
        default: true
    },
    

})

module.exports = new mongoose.model("Servico", servicoSchema);