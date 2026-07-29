const AppError = require("../Error/AppError")
const Servico = require("../models/servico")
const Cliente = require("../models/Cliente");
const Profissional = require("../models/Profissional");
const Agendamento = require("../models/Agendamento")


/*| Situação                                                                  |                   Código HTTP | Exemplo de mensagem                            |
| ------------------------------------------------------------------------- | ----------------------------: | ---------------------------------------------- |
| Requisição inválida (campo obrigatório, preço inválido, duração inválida) |           **400 Bad Request** | `"O preço deve ser maior que zero."`
__________________________________________________________________________________________________           
| Usuário não autenticado (token ausente ou inválido)                       |          **401 Unauthorized** | `"Token não informado."` / `"Token inválido."` |
__________________________________________________________________________________________________
| Usuário autenticado, mas sem permissão                                    |             **403 Forbidden** | `"Acesso negado."`                             |
__________________________________________________________________________________________________
| Recurso não encontrado                                                    |             **404 Not Found** | `"Usuário não encontrado."`                    |
__________________________________________________________________________________________________
| Conflito (e-mail já existe, serviço já existe, horário ocupado)           |              **409 Conflict** | `"E-mail já está em uso."`                     |
__________________________________________________________________________________________________
| Erro inesperado do servidor                                               | **500 Internal Server Error** | `"Erro interno do servidor."`                  |
*/

/* validarCliente(clienteId)

validarProfissional(profissionalId)

validarServico(servicoId)

validarData(dataHorario)

validarConflitoProfissional(profissionalId, dataHorario)

validarConflitoCliente(clienteId, dataHorario) */

 function validarCamposObrigatorios(dadosServico, camposExigidos) {
    

    for (const campo of camposExigidos) {

         const valor = dadosServico[campo]

        if (valor === undefined || valor === null || (typeof valor === "string" && valor.trim() === "")) {
             throw new AppError(`'${campo}' e obrigatorio.`, 400);

        }
    }
    
};


function validarValorNumerico(valor, nomeCampo) {
   
        if (valor === null || valor === undefined ||valor <= 0 ) {
             throw new AppError(" '${nomeCampo}' deve ser maior que zero.", 400);

        }
    
};

async function validarAdministrador(usuarioId) {

    // Busca usuário
    const usuarioAdmin = await Profissional.findById(usuarioId)

    // Verifica se existe
    if (!usuarioAdmin) {
        throw new AppError("Usuario não existe", 404)
    }

    // Verifica se está ativo
    if (!usuarioAdmin.ativo) {
        throw new AppError("Usuario esta desativado", 403)
    }

    // Verifica se é ADMIN
    if (usuarioAdmin.role !== "ADMIN") {
        throw new AppError("Acesso negado", 403)
    }
    return usuarioAdmin;

};

async function validarData(dataHorario) {

    const dataHorarioRecebido = dataHorario

    if (!dataHorarioRecebido) {
         throw new AppError("Data e horario são obrigatorios", 400)
    }

      // 1. Tenta converter a string para um objeto Date
    const dataConvertida = new Date(dataHorarioRecebido);

      // 2. Verifica se o formato da data é válido (evita datas como 2026-02-31)
    if (isNaN(dataConvertida.getTime())) {
       throw new AppError("Formato de data inválido.", 400)
    }

       // 3. Compara o timestamp da data enviada com o timestamp de agora
    if (dataConvertida < new Date()) {
       throw new AppError("A data não pode estar no passado", 400)
    }

    return dataConvertida;
};

async function validarServico(idServico) {

     const servico = await Servico.findById(idServico);

    if (!servico) {
        throw new AppError("Servico não existe", 404)
    }

    if (!servico.ativo) {
        throw new AppError("Servico esta desativado", 403)
    }

    return servico;
};

async function validarProfissional(idProfissional) {
    
     const profissional = await Profissional.findById(idProfissional);

    if (!profissional) {
        throw new AppError("Profissional não existe", 404)
    }

    if (!profissional.ativo) {
        throw new AppError("Servico esta desativado", 403)
    }

    return profissional;
};

async function validarCliente(idCliente) {

    const cliente = await Cliente.findById(idCliente);

    if (!cliente) {
        throw new AppError("Cliente não existe", 404)
    }

    if (!cliente.ativo) {
        throw new AppError("Cliente esta desativado", 403)
    }

    return cliente;
};

async function validarConflitoProfissional(idProfissional, dataHorario, idAgendamento) {

    const agendamentoConflito = await Agendamento.findById(idAgendamento)

    if (!agendamentoConflito) {
        throw new AppError("Agendamento não existe", 404)
    }
      
   await validarProfissional(idProfissional)

    const dataHorarioRecebido = await validarData(dataHorario);

    const agendamento = await Agendamento.findOne(
    {
        profissional: idProfissional,
        dataHorario: dataHorarioRecebido,
        _id: { $ne: idAgendamento }

    });

   if (agendamento) {
      
      throw new AppError("Ja existe um agendamento nesse horario", 400)
   }
     
};

async function validarConflitoCliente(idCliente, dataHorario, idAgendamento) {
      
     await validarCliente(idCliente)

    const dataHorarioRecebido = await validarData(dataHorario);

    const agendamentoConflito = await Agendamento.findOne({
        cliente: idCliente,
        dataHorario: dataHorarioRecebido,
        _id: { $ne: idAgendamento}
    })

   if (agendamentoConflito) {
      
      throw new AppError("Ja existe um agendamento nesse horario", 400)
   }
     
};


module.exports = {
    validarCamposObrigatorios,
     validarValorNumerico,
      validarAdministrador,
      validarData,
      validarServico,
      validarProfissional,
      validarCliente,
      validarConflitoProfissional,
      validarConflitoCliente
    }