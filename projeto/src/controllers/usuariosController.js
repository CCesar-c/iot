const { usuarios } = require("../models")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

let jwt_secret_key = "hola";

class usuariosController {
    async logar(req, res) {
        const { email, senha } = req.body;
        const receber_usuarios = await usuarios.findAll();
        for (const users of receber_usuarios) {
            let verificar_senha = await bcrypt.compare(senha,users.senha)
            if (users.email == email && verificar_senha) {
                const token = jwt.sign({ email: email }, jwt_secret_key, { expiresIn: "1h" })
                return res.status(200).json({ token })
            }else{
                console.log("usuario nao encontrado")
            }
        }
    }
    async receber(req, res) {
        const receber_usuarios = await usuarios.findAll();
        res.status(200).json(receber_usuarios)
    }
    async enviar(req, res) {
        const { id_usuario, email, senha, cargo } = req.body;
        let senha_encriptada = await bcrypt.hash(senha, 10);
        let new_senha = String(senha_encriptada);
        console.log(senha)
        console.log(senha_encriptada)
        console.log(new_senha)
        let receber_usuarios = await usuarios.create({
            id_usuario,
            email,
            senha: new_senha,
            cargo
        });
        res.status(200).json(receber_usuarios)
    }
    async atualizar(req, res) {
        const { id } = req.params
        const { id_usuario, email, senha, cargo } = req.body;

        const receber_usuarios = await usuarios.update({
            id_usuario,
            email,
            senha,
            cargo
        }, {
            where: {
                id
            }
        });
        res.status(200).json(receber_usuarios)
    }
    async deletar(req, res) {
        const { id } = req.params

        const receber_usuarios = await usuarios.destroy({
            where: {
                id
            }
        });
        res.status(200).json(receber_usuarios)
    }
}
module.exports = new usuariosController();