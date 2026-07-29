const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Cliente = require("../models/Cliente");
const AppError = require("../Error/AppError")


async function login(email, senha) {

    const clienteEncontrado = await Cliente.findOne({ email })

    if (!clienteEncontrado) {
        throw new AppError("Credencias Invalidas", 401)
    }

    const senhaValida = await bcrypt.compare(senha, clienteEncontrado.senha)

    if (!senhaValida) {
        throw new AppError("Credencias Invalidas", 401)
    }

    const token = jwt.sign({ id: clienteEncontrado._id, email: clienteEncontrado.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    )

    return {
        
    token,

    cliente: {
        id: clienteEncontrado._id,
        nome: clienteEncontrado.nome,
        email: clienteEncontrado.email,
        role: clienteEncontrado.role
    }
}
}

module.exports = { login }