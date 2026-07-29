const Servico = require("../models/servico")
const Profissional = require("../models/Profissional")
const Cliente = require("../models/Cliente")
const AppError = require("../Error/AppError")
const Validator = require("../validators/ServicoValidator")



async function criarServico(usuarioLogado, dadosServico) {

    const { nome, descricao, duracao, preco } = dadosServico;
    
    const usuarioAutenticado = await Profissional.findById(usuarioLogado);


     if (!usuarioAutenticado) {
         throw new AppError("Usuario não existe", 404)
     }

      if (!usuarioAutenticado.ativo) {
         throw new AppError("Usuario esta desativado", 403)
     }

      if (usuarioAutenticado.role !== "ADMIN") {
         throw new AppError("Acesso negado", 403)
     }

    const {nome} = dadosServico 

    const servicoExistente = await Servico.findOne({ nome })

     if (servicoExistente) {
        throw new AppError("O servico ja existe", 409)
     }

        Validator.validarValorNumerico(preco, "Preco");

        Validator.validarValorNumerico(duracao, "Duracao");

        Validator.validarCamposObrigatorios(dadosServico, ["nome", "descricao", "preco", "duracao"]);

           const servicoCriado = await Servico.create({

            nome,
            descricao,
            duracao,
            preco,

           });
          

    return servicoCriado;
   
}

async function listarServico() {
     
    const servicos = await Servico.find({ ativo:true })

    return servicos;
}

async function buscarServicoPorId(idServico, usuarioLogado) {

    await Validator.validarAdministrador(usuarioLogado)

    const servicoExiste = await Servico.findById(idServico);
     
    if (!servicoExiste) {
        throw new AppError("Servico não existe", 404)
    }

    return servicoExiste;
}

async function atualizarServico(idServico, usuarioLogado, dadosServico) {

    const { nome, descricao, duracao, preco } = dadosServico

    const servicoExiste = await Servico.findById(idServico)

    if (!servicoExiste) {
        throw new AppError("Servico não existe", 404)
    }
    
    const usuarioExistente = await Profissional.findById(usuarioLogado)

    if (!usuarioExistente) {
        throw new AppError("Usuario não existe", 404)
    }

    if (!usuarioExistente.ativo) {
        throw new AppError("Usuario esta desativado", 403)
    }

    if (usuarioExistente.role !== "ADMIN") {
        throw new AppError("Acesso negado", 403)
    }

    Validator.validarCamposObrigatorios(dadosServico, ["nome", "descricao", "preco", "duracao"])

    Validator.validarValorNumerico(dadosServico.preco, "Preco")

    Validator.validarValorNumerico(dadosServico.duracao, "Duracao")


    servicoExiste.nome = nome;
    servicoExiste.descricao = descricao;
    servicoExiste.preco = preco;
    servicoExiste.duracao = duracao;

    const servicoAtualizado = await servicoExiste.save();

    return servicoAtualizado;
}

async function ativarServico(idServico, usuarioLogado) {

    const servicoExiste = await Servico.findById(idServico)

    if (!servicoExiste) {
        throw new AppError("Servico não existe", 404)
    }

    if (servicoExiste.ativo) {
        throw new AppError("Servico esta ativo", 404)
    }

    await Validator.validarAdministrador(usuarioLogado)

    servicoExiste.ativo= true
    
    await servicoExiste.save()

    return servicoExiste;

}

async function desativarServico(idServico, usuarioLogado) {

    const servicoExiste = await Servico.findById(idServico);

    if (!servicoExiste) {
        throw new AppError("Servico não existe", 404)
    }

    if (!servicoExiste.ativo) {
        throw new AppError("Usuario Esta desativado", 403)
    }

    const usuarioExiste = await Profissional.findById(usuarioLogado);

    if (!usuarioExiste) {
        throw new AppError("Usuario não existe", 404)
    }

     if (!usuarioExiste.ativo) {
        throw new AppError("Servico esta desativado", 403)
     }

      if (usuarioExiste.role !== "ADMIN") {
        throw new AppError("Acesso negado", 403)
    }

    servicoExiste.ativo = false

     await servicoExiste.save();

    return servicoExiste;;

}  

module.exports = {
    criarServico, 
    listarServico,
    atualizarServico, 
    desativarServico, 
    validarAdministrador
}