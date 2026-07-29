const { Timestamp } = require("mongodb")
const mongoose = require("mongoose")
const Joi = require("joi")

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

/*
cliente

profissional

servico

data

horario

status

observacao
*/


const agendamentoSchema = new mongoose.Schema({
     
   cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true
    },

    profissional: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profissional",
        required: true
    },

    dataHorario: {
        type: Date,
        required: true,  
        // Índice ajuda o banco a buscar agendamentos por data muito mais rápido
        index: true 
    },

    criadoEm: {
    type: Date,
    default: Date.now // Grava automaticamente a data de criação do registro
    },

    servico: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Servico",
    required: true
    },

    status: {
    type: String,
    enum: [
        "PENDENTE",
        "CONFIRMADO",
        "CANCELADO",
        "FINALIZADO"
    ],
    default: "PENDENTE"
    },

    observacao: {
        type: String,
    },

    
    
})

module.exports = mongoose.model("Agendamento", agendamentoSchema)