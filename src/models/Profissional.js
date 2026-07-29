const { Timestamp } = require("mongodb");
const mongoose = require("mongoose")

/* nome
email
telefone
especialidades
serviços
diasDeAtendimento
horarioInicio
horarioFim
intervalo
ativo */ 

const profissionalSchema = new mongoose.Schema({

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
        select: false
    },

     telefone: {
         type: String,
         required: true,
         unique: true
    },

    especialidade: [{
        type: String,
        required: true
    }],

     servicos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Servico"
     }],

    diasDeAtendimento: [{
    type: String,
    enum: [
        "segunda",
        "terca",
        "quarta",
        "quinta",
        "sexta",
        "sabado",
        "domingo"
    ]
     }],

     horarioDeInicio: {
         type: String,
         required: true,
         
    },

     horarioFim: {
         type: String,
         required: true,
        
    },

    intervalo: {
    type: Number,
    default: 30
   },

    ativo: {
        type: Boolean,
        default: true
    },

   role: {
    type: String,
    enum: ["CLIENTE", "PROFISSIONAL", "ADMIN"],
    default: "PROFISSIONAL"
}

})

module.exports = new mongoose.model("Profissional", profissionalSchema);