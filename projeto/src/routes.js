const { Router } = require("express");
const usuariosController = require("./controllers/usuariosController");
const clientesController = require("./controllers/clientesController");
const veiculosController = require("./controllers/veiculosController");
const ordensController = require("./controllers/ordensController");


const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

// Rotas de Produtos
routes.get("/usuarios", usuariosController.receber)
routes.post("/usuarios_logar", usuariosController.logar)
routes.post("/usuarios", usuariosController.enviar)
routes.put("/usuarios/:id", usuariosController.atualizar)
routes.delete("/usuarios/:id", usuariosController.deletar)


routes.get("/clientes", clientesController.receber)
routes.get("/clientes/:cpf", clientesController.receber_por_cpf)
routes.post("/clientes", clientesController.enviar)
routes.put("/clientes/:id", clientesController.atualizar)
routes.delete("/clientes/:id", clientesController.deletar)


routes.get("/veiculos", veiculosController.receber)
routes.post("/veiculos", veiculosController.enviar)
routes.put("/veiculos/:id", veiculosController.atualizar)
routes.delete("/veiculos/:id", veiculosController.deletar)


routes.get("/ordens", ordensController.receber)
routes.post("/ordens", ordensController.enviar)
routes.put("/ordens/:id", ordensController.atualizar)
routes.delete("/ordens/:id", ordensController.deletar)


module.exports = routes;
