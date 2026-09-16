const { clientes } = require("../models/")

class clientesController {
    async receber_por_cpf(req, res) {
        const { cpf } = req.params;
        const receber_clientes = await clientes.findAll({
            where: {cpf}
        });
        res.status(200).json(receber_clientes)
    }
    async receber(req, res) {
        const receber_clientes = await clientes.findAll();
        res.status(200).json(receber_clientes)
    }
    async enviar(req, res) {
        const { id_cliente, cpf, nome, telefone } = req.body;
        const receber_clientes = await clientes.create({
            id_cliente,
            cpf,
            nome,
            telefone
        });
        res.status(200).json(receber_clientes)
    }
    async atualizar(req, res) {
        const { id } = req.params
        const { id_cliente, cpf, nome, telefone } = req.body;

        const receber_clientes = await clientes.update({
            id_cliente,
            cpf,
            nome,
            telefone
        }, {
            where: {
                id
            }
        });
        res.status(200).json(receber_clientes)
    }
    async deletar(req, res) {
        const { id } = req.params

        const receber_clientes = await clientes.destroy({
            where: {
                id
            }
        });
        res.status(200).json(receber_clientes)
    }
}
module.exports = new clientesController();