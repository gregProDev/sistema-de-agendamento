const clienteService = require("../services/ClienteService")
const Validator = require("../validators/ServicoValidator")

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


async function criarCliente(req, res) {
    
    try {
        
    const { email, senha } = req.body
    
    if (!email || !senha) {
        return res.status(401).json({message: "Email e senha são obrigatorios"})
    }

    const cliente = await Cliente.criarCliente({
        email,
        senha
    });

    return res.status(201).json(cliente)

    } catch (error) {
        return res.status(400).
        json({message: error.message})
    }

}

async function criarCliente(req, res) {

    const dadosCliente = req.body

    const clienteCriado = await clienteService.criarCliente(dadosCliente)

    return res.status(201).json({success: true, message: "Cliente criado com sucesso", data: clienteCriado})
}

async function listarClienteAtivos(req, res) {

    const clienteAtivos = await clienteService.listarClienteAtivos();

    return res.status(200).json({ success: true, message: "Cliente ativos listados com sucesso", data: clienteAtivos })
};

async function listarClienteInativos(req, res) {

   const clienteInativos = await clienteService.listarClienteInativos();

   return res.status(200).json({ success: true, message: "Cliente inativos listados com sucesso", data: clienteInativos })
};

async function atualizarCliente(req, res) {
    
    const idCliente = req.params.id

    const dadosCliente = req.body

    const clienteAtualizado = await clienteService.atualizarCliente(idCliente, dadosCliente)

    return res.status(200).json({ success: true, message: "Cliente atualizado com sucesso", data: clienteAtualizado })
}

async function deletarCliente(req, res) {

    const idCliente = req.params.id

    const clienteDeletado = await clienteService.deletarCliente(idCliente);

    return res.status(200).json({ success: true, message: "Cliente deletado com sucesso", data: clienteDeletado })
}

module.exports = {
    criarCliente,
    listarClienteAtivos,
    listarClienteInativos,
    atualizarCliente,
    deletarCliente
}