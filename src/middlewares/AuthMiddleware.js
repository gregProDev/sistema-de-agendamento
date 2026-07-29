const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const AppError = require("../Error/AppError")


/*Requisitos
Ler o token do header Authorization.
Verificar se o header existe.
Verificar se o token é válido.
Decodificar o JWT.
Colocar os dados do usuário em req.usuario.
Chamar next().
Se qualquer validação falhar, retornar 401 Unauthorized.*/

async function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError("Token não informado", 401)
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = decoded

        return next();
        
    } catch (error) {
        throw new AppError("Token Invalido", 401)
    }
}

module.exports = authMiddleware;

