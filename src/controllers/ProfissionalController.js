const AgendamentoService = require("./src/services/AgendamentoService")

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

async function buscarProfissionalPorId(req, res) {

    const id = req.params.id

    const profissionalBuscado = await AgendamentoService.buscarProfissionalPorId(id)

    return res.status(200).json({success: true, message: "profissional buscado com sucesso", data: profissionalBuscado})
}