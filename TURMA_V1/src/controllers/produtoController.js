//import produto from "../models/produto.js";
const { produto } = require("../models");

class produtoController {
  async index(req, res) {
    const produtos = await produto.findAll();

    return res.status(200).json(produtos);
  }
  async store(req, res) {
    const { nome, preco, quantidade } = req.body

    const createdProduto = await produto.create({
      nome,
      preco,
      quantidade,
    })

    return res.status(200).json(createdProduto)

  }
  async update(req, res) {
    let { id} = req.params;
    const { nome, preco, quantidade } = req.body
    await produto.update(
      {
        nome,
        preco,
        quantidade
      },
      {
        where: {
          id
        }
      }
    )
    return res.status(200).json({ message:"Produto atualizado com sucesso"})
  }
  async deletar(req, res) {
    let { id} = req.params;
    await produto.destroy(
      {
        where: {
          id
        }
      }
    )
    return res.status(200).json({ message:"Produto Deletado com sucesso"})
  }

}

module.exports = new produtoController();
