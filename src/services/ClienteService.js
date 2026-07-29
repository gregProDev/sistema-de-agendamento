const Cliente = require("../models/Cliente")
const bcrypt = require("bcrypt")
const AppError = require("../Error/AppError")
const Validator = require("../validators/ServicoValidator")


async function criarCliente(dadosCliente) {

   Validator.validarCamposObrigatorios(dadosCliente, ["nome", "telefone", "email", "senha"])

   const usuario = await Cliente.findOne({ email: dadosCliente.email });

   if (usuario) {
    throw new AppError("Ja existe um usuario com esse email", 409);
   }

    const senhaHash = await bcrypt.hash(dadosCliente.senha, 10)

    const usuarioCriado = await Cliente.create({
        nome: dadosCliente.nome,
        telefone: dadosCliente.telefone,
        email: dadosCliente.email,
        senha: senhaHash
    });

    return usuarioCriado;
};

async function listarClienteAtivos() {
    
    const clienteAtivos = await Cliente.find({ ativo: true })

    if (clienteAtivos.length === 0) {
        throw new AppError("Cliente ativos não existe", 404)
    }

    return clienteAtivos;
}

async function listarClienteInativos() {
     
    const clienteInativos = await Cliente.find({ativo: false})

   /* if (clienteInativos.length === 0) {
        throw new AppError("Cliente inativos não existe", 404)
    }*/

    return clienteInativos;
};

/*validar se o e-mail já pertence a outra pessoa;
impedir alteração do role;
impedir alteração de campos que o cliente não pode modificar.*/

async function atualizarCliente(idCliente, dadosCliente) {

    /* O findOne espera um objeto*/

     const camposPermitidos = ['nome', 'email', 'telefone', 'senha'];
    
    const cliente = await Cliente.findById(idCliente)

    if (!cliente) {
        throw new AppError("cliente não existe", 404)
    }

    const { email } = dadosCliente

       const emailConflitante = await Cliente.findOne({
        email: email,
        _id:  { $ne: idCliente }
     })

   if (emailConflitante) {
      throw new AppError("E-mail ja esta em uso por outro usuario", 409)
   }


    const camposAtualizado = {};

    /*forEach trabalha com array*/

    camposPermitidos.forEach(campo => {

        if (dadosCliente[campo] !== undefined) {

            camposAtualizado[campo] = dadosCliente[campo];
        }
    });

      
      if (Object.keys(camposAtualizado).length === 0) {
      throw new AppError("Nenhum campo válido enviado para atualização.", 400);
    }

    if (camposAtualizado.senha) {

    camposAtualizado.senha = await bcrypt.hash(camposAtualizado.senha, 10)
       
    }
 
    const clienteAtualizado = await Cliente.findByIdAndUpdate(idCliente,
    {
       $set: camposAtualizado
        
    },
    {
        new: true,
        runValidators: true
    }

).select('-senha');

    return clienteAtualizado;

}

async function deletarCliente(idCliente) {
    
    const cliente = await Cliente.findById(idCliente)

    if (!cliente) {
        throw new AppError("Cliente não existe", 404)
    }

   /* Aprimeira maneira
   const clienteDeletado = await Cliente.findByIdAndDelete(idCliente)
   return clienteDeletado */

   await cliente.deleteOne();

    return cliente;
}



module.exports = { 
    criarCliente, 
    listarClienteAtivos,
    listarClienteInativos, 
    atualizarCliente, 
    deletarCliente
}