const { veiculos } = require("../models/")

class veiculosController {
    async receber(req, res) {
        const receber_veiculos = await veiculos.findAll();
        res.status(200).json(receber_veiculos)
    }
    async enviar(req, res) {
        const { id_veiculo, marca, ano, modelo, id_cliente } = req.body;
        const receber_veiculos = await veiculos.create({
            id_veiculo,
            marca,
            ano,
            modelo,
            id_cliente
        });
        res.status(200).json(receber_veiculos)
    }
    async atualizar(req, res) {
        const { id } = req.params
        const { id_veiculo, marca, ano, modelo, id_cliente } = req.body;

        const receber_veiculos = await veiculos.update({
            id_veiculo,
            marca,
            ano,
            modelo,
            id_cliente
        }, {
            where: {
                id
            }
        });
        res.status(200).json(receber_veiculos)
    }
    async deletar(req, res) {
        const { id } = req.params

        const receber_veiculos = await veiculos.destroy({
            where: {
                id
            }
        });
        res.status(200).json(receber_veiculos)
    }
}
module.exports = new veiculosController();