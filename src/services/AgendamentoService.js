const AppError = require("../Error/AppError")
const Agendamento = require("../models/Agendamento")
const Cliente = require("../models/Cliente")
const Profissional = require("../models/Profissional")
const Agendamento = require("../models/Agendamento")
const Validator = require("../validators/ServicoValidator")
const servico = require("../models/servico")
const ClienteService = require("../services/ClienteService")

/* Receber dados

Validar campos obrigatórios

Buscar Cliente

Cliente ativo

Buscar Profissional

Profissional ativo

Buscar Serviço

Serviço ativo

Validar data

Validar conflito do profissional

Validar conflito do cliente

Criar agendamento

Retornar agendamento */

async function criarAgendamento(dadosAgendamento) {

    const { cliente, profissional, servico, dataHorario,} = dadosAgendamento

    await Validator.validarCamposObrigatorios(dadosAgendamento, [ "cliente", "profissional", "servico", "dataHorario" ]);
    
   await Validator.validarCliente(cliente);

   await Validator.validarProfissional(profissional);

   await Validator.validarServico(servico);

   const datavalidada = await Validator.validarData(dataHorario);

   await Validator.validarConflitoProfissional(profissional, datavalidada);

   await Validator.validarConflitoCliente(cliente, datavalidada)

    const agendamentoCriado = await Agendamento.create(
    {   
        cliente,
        profissional,
        servico,
        dataHorario: datavalidada,
        observacao: dadosAgendamento.observacao
        
    });

    return agendamentoCriado;
};

async function listarAgendamento() {

    const agendamento = await Agendamento.find().populate("cliente").populate("profissional").populate("servico");

    return agendamento;
};

async function atualizarAgendamento(idAgendamento, dadosAgendamento) {

    const agendamento = await Agendamento.findById(idAgendamento);

    if (!agendamento) {
    throw new AppError("Agendamento não existe", 404);
    }

    const { cliente, profissional, servico, dataHorario } = dadosAgendamento

    await Validator.validarCliente(cliente);

    await Validator.validarProfissional(profissional);

    await Validator.validarServico(servico);

    const dataValidada = await Validator.validarData(dataHorario);

    await Validator.validarConflitoProfissional(profissional, dataValidada, idAgendamento);

    await Validator.validarConflitoCliente(cliente, dataValidada, idAgendamento);

    const agendamentoAtualizado = await Agendamento.findByIdAndUpdate({
        cliente,
        profissional,
        servico,
        dataHorario: dadosAgendamento.dataHorario,
        observacao: dadosAgendamento.observacao
    },

    {
        new: true,
        runValidators: true
    }

);

    return agendamentoAtualizado;
};

async function deletarAgendamento(idAgendamento) {

    const agendamento = await Agendamento.findByIdAndDelete(idAgendamento)

    if (!agendamento) {
        throw new AppError("agendamento nao existe", 404)
    }
    
    return agendamento;
};

/* ✅ buscarAgendamentoPorId() */

async function buscarAgendamentoPorId(idAgendamento) {

    const agendamento = await Agendamento.findById(idAgendamento).populate("cliente").populate("profissional").populate("servico");

    if (!agendamento) {
        throw new AppError("Agendamento não existe agendamento", 404)
    }

    return agendamento;
};


/* ✅ listarAgendamentosPorCliente() */
async function listarAgendamentoPorCliente(idCliente) {

    await Validator.validarCliente(idCliente)

    const agendamentos = await Agendamento.find({
          cliente: idCliente,
          
    }).populate("cliente").populate("profissional").populate("servico")

    return agendamentos;
};

/* ✅ listarAgendamentosPorProfissional() */
async function listarAgendamentoPorProfissional(idProfissional) {

    await Validator.validarProfissional(idProfissional)
   
    const agendamentos = await Agendamento.find({
          profissional: idProfissional
    }).populate("cliente").populate("profissional").populate("servico")

    return agendamentos;
};

/* ✅ confirmarAgendamento() */

async function confirmarAgendamento(idCliente, idProfissional, idAgendamento) {

    await Validator.validarCliente(idCliente)

    await Validator.validarProfissional(idProfissional)

    const agendamento = await Agendamento.findById(idAgendamento)

    if (agendamento.status !== "PENDENTE") {
        throw new AppError("Somente agendamentos pendente podem ser confirmados", 404)
    }

         agendamento.status = "CONFIRMADO";

         await agendamento.save()
    
    return agendamento;
};

/* ✅ cancelarAgendamento() */

async function cancelarAgendamento(idAgendamento) {

    const agendamento = await Agendamento.findById(idAgendamento)

    if (!agendamento) {
        throw new AppError("Agendamento não existe", 404)
    }

    if (agendamento.status === "FINALIZADO" || agendamento.status === "CANCELADO") {
        throw new AppError("Este agendamento não pode mais ser cancelado.", 400);
    }

    agendamento.status = "CANCELADO"

    await agendamento.save()

    return agendamento;
};


/* ✅ finalizarAgendamento() */

async function finalizarAgendamento(idAgendamento) {

    const agendamento = await Agendamento.findById(idAgendamento)

     if (!agendamento) {
        throw new AppError("Agendamento não existe", 404)
    }

    if (agendamento.status !== "CONFIRMADO") {
       throw new AppError("Este agendamento não pode ser mais finalizado", 400)
    }

    agendamento.status = "FINALIZADO"

    await agendamento.save()

    return agendamento;
};

/*Receber profissionalId.
Buscar o profissional.
Validar se existe.
Validar se está ativo.
Validar se trabalha naquele dia e horário.
Validar se não possui outro agendamento naquele horário.
Criar o agendamento.*/

async function buscarProfissionalPorId(idProfissional) {
     
    const profissionalExiste = await Profissional.findById(idProfissional)

    if (!profissionalExiste) {
        throw new AppError("Profissional não encontrado", 404)
    }

    if (!profissionalExiste.ativo) {
        throw new AppError("O profissional não esta ativo", 404)
    }
};

module.exports = {
    criarAgendamento, 
    listarAgendamento, 
    atualizarAgendamento,
    deletarAgendamento,
    buscarAgendamentoPorId,
    listarAgendamentoPorCliente,
    listarAgendamentoPorProfissional,
    confirmarAgendamento,
    cancelarAgendamento,
    finalizarAgendamento,
    buscarProfissionalPorId
}