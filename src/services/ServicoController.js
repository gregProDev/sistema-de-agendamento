const servicoService = require("../services/servicoService")
const AppError = require("../Error/AppError")
const servico = require("../models/servico")


async function criarServico(req, res) {

    const dadosServico = req.body;

    const usuarioLogado = req.usuario.id;

  const servico = await servicoService.criarServico(usuarioLogado, dadosServico)

    return res.status(201).json({message: "servico criado com sucesso", servico})
};

async function listarServico(req, res) {

   const servicoListado = await servicoService.listarServico()

   return res.status(200).json({message: "Servico listado com sucesso", servicoListado})
}

async function atualizarServico(req, res) {
    
    const usuarioLogado = req.usuario.id
    
    const idServico = req.params.id

    const dadosServico = req.body

    const servicoAtualizado = await servicoService.atualizarServico(idServico, usuarioLogado, dadosServico);

    return res.status(200).json({sucess:true, message: "O servico atualizado com sucesso", data: servicoAtualizado})
}

async function ativarServico(req, res) {

    const idServico = req.params.id

    const usuarioLogado = req.usuario.id

    const servicoAtivado = await servicoService.ativarServico(idServico, usuarioLogado);

    return res.status(200).json({success: true, message: "servico ativado com sucesso", data: servicoAtivado})
}

async function desativarServico(req, res) {

    const idServico = req.params.id

    const usuarioLogado = req.usuario.id

    const servicoDesativado = await servicoService.desativarServico(idServico, usuarioLogado);

    return res.status(200).json({success:true, message: "servico destivado com sucesso", data: servicoDesativado})
}