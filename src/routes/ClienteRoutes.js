const express = require("express");

const router = express.Router();

const { criarCliente } = require("../controllers/ClienteController");
const { listarClienteAtivos } = require("../controllers/ClienteController");
const { listarClienteInativos } = require("../controllers/ClienteController");
const { atualizarCliente } = require("../controllers/ClienteController");
const { deletarCliente } = require("../controllers/ClienteController");

router.post("/", criarCliente)
router.get("/ativos", listarClienteAtivos)
router.get("/inativos", listarClienteInativos)
router.put("/:id", atualizarCliente)
router.delete("/:id", deletarCliente)

module.exports = router;