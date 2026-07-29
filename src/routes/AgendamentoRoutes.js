const express = require("express");

const router = express.Router();

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

const { criarAgendamento } = require("./src/controllers/AgendamentoController");
const { listarAgendamento } = require("./src/controllers/AgendamentoController");
const { buscarAgendamentoPorId } = require("./src/controllers/AgendamentoController");
const { atualizarAgendamento } = require("./src/controllers/AgendamentoController");
const { deletarAgendamento } = require("./src/controllers/AgendamentoController");
const { listarAgendamentoPorCliente } = require("./src/controllers/AgendamentoController");
const { listarAgendamentoPorProfissional } = require("./src/controllers/AgendamentoController");
const { confirmarAgendamento } = require("./src/controllers/AgendamentoController");
const { cancelarAgendamento } = require("./src/controllers/AgendamentoController");
const { finalizarAgendamento } = require("./src/controllers/AgendamentoController");



router.post("/", criarAgendamento)
router.get("/listarAgendamento", listarAgendamento)
router.get("/buscarAgendamentoPorId", buscarAgendamentoPorId)
router.put("/atualizarAgendamento", atualizarAgendamento)
router.delete("/deletarAgendamento", deletarAgendamento)
router.get("/listarAgendamentoPorCliente", listarAgendamentoPorCliente)
router.get("/listarAgendamentoPorProfissional", listarAgendamentoPorProfissional)


module.exports = router