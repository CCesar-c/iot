const { usuarios } = require("../models/")

class usuariosController {
    async receber(req, res) {
        const receber_usuarios = await usuarios.findAll();
        res.status(200).json(receber_usuarios)
    }
    async enviar(req, res) {
        const { id_usuario, email, senha, cargo } = req.body;
        const receber_usuarios = await usuarios.create({
            id_usuario,
            email,
            senha,
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