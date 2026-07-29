const AgendamentoService = require("./src/services/agendamentoService")

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

async function criarAgendamento(req, res) {
    

    const { cliente, profissional, servico, dataHorario, observacao } = req.body

    const agendamento = await AgendamentoService.criarAgendamento({
        cliente,
        profissional,
        servico,
        dataHorario,
        observacao
    });

    return res.status(201).json({success: true, message: "Agendamento criado com sucesso", data: agendamento})

};

async function listarAgendamento(req, res) {
             
    const agendamento = await AgendamentoService.listarAgendamento()
   
    return res.status(200).json({success: true, message: "Agendamento listado com sucesso", data: agendamento});

};

async function atualizarAgendamento(req, res) {

    const id  = req.params.id

    const dadosAgendamento = req.body

    const agendamento = await AgendamentoService.atualizarAgendamento(id, dadosAgendamento)

    return res.status(200).json({success: true, message: "Agendamento atualizado com sucesso", data: agendamento})
};

async function deletarAgendamento(req, res) {

    const id = req.params.id

    const agendamentoDeletado = await AgendamentoService.deletarAgendamento(id)

    return res.status(200).json({success: true, message: "Agendamento deletado com sucesso", data: agendamentoDeletado})

};

/* buscarAgendamentoPorId()
listarAgendamentoPorCliente()
listarAgendamentoPorProfissional()
confirmarAgendamento()
cancelarAgendamento()
finalizarAgendamento() */

async function buscarAgendamentoPorId(req, res) {
  
    const id = req.params.id

    const agendamentoBuscado = await AgendamentoService.buscarAgendamentoPorId(id)

    return res.status(200).json({success: true, message: "Agendamento buscado com sucesso", data: agendamentoBuscado})
};

async function listarAgendamentoPorCliente(req, res) {

      const id = req.params.id

      const agendamentoListado = await AgendamentoService.listarAgendamentoPorCliente(id)

      return res.status(200).json({success: true, message: "Agendamento listado com sucesso", data: agendamentoListado})
};

async function listarAgendamentoPorProfissional(req, res){

    const id = req.params.id

    const agendamentoListado = await AgendamentoService.listarAgendamentoPorProfissional(id)

    return res.status(200).json({success: true, message: "agendamento listado com sucesso", data: agendamentoListado})
};

async function confirmarAgendamento(req, res) {

    const { id }= req.params

    const agendamentoConfirmado = await AgendamentoService.confirmarAgendamento(id)

    return res.status(200).json({success: true, message: "Agendamento confirmado com sucesso", data: agendamentoConfirmado})
};

async function cancelarAgendamento(req, res) {

    const id = req.params.id

    const agendamentoCancelado = await AgendamentoService.cancelarAgendamento(id)

    return res.status(200).json({success: true, message: "Agendamento cancelado com sucesso", data: agendamentoCancelado})
};

async function finalizarAgendamento(req, res) {

    const id = req.params.id

    const agendamentoFinalizado = await AgendamentoService.finalizarAgendamento(id)

    return res.status(200).json({success: true, message: "Agendamento finalizado com sucesso", data: agendamentoFinalizado})
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
    
}