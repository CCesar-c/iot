const { Router } = require("express");
const produtoController = require("./controllers/produtoController");


const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});
// Rotas de Produtos
routes.get("/produto", produtoController.index)
routes.post("/produto", produtoController.store)
routes.put("/produto/:id", produtoController.update)
routes.delete("/produto/:id", produtoController.destroy)



module.exports = routes;
