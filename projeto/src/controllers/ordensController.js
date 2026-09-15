const { ordens } = require("../models/")
class ordensController {
    async receber(req, res) {
        const receber_ordens = await ordens.findAll();
        res.status(200).json(receber_ordens)
    }
    async enviar(req, res) {
        const { id_ordem, data_entrada, valor, data_saida, id_cliente, id_veiculo, id_usuario } = req.body;
        const receber_ordens = await ordens.create({
            id_ordem,
            data_entrada,
            valor,
            data_saida,
            id_cliente,
            id_veiculo,
            id_usuario
        });
        res.status(200).json(receber_ordens)
    }
    async atualizar(req, res) {
        const { id } = req.params
        const { id_ordem, data_entrada, valor, data_saida, id_cliente, id_veiculo, id_usuario } = req.body;

        const receber_ordens = await ordens.update({
            id_ordem,
            data_entrada,
            valor,
            data_saida,
            id_cliente,
            id_veiculo,
            id_usuario
        }, {
            where: {
                id
            }
        });
        res.status(200).json(receber_ordens)
    }
    async deletar(req, res) {
        const { id } = req.params

        const receber_ordens = await ordens.destroy({
            where: {
                id
            }
        });
        res.status(200).json(receber_ordens)
    }
}
module.exports = new ordensController();