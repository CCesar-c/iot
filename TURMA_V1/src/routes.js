const { Router } = require("express");
//import { Router } from "express";
const produtoController = require("./controllers/produtoController");
//import { produtoController } from "./controllers/produtoController";

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.get("/produto", produtoController.index);

routes.post("/produto", produtoController.store);

// parametro
routes.put("/produto/:id", produtoController.update); 
// http://localhost:3331/1


// Query
// routes.put("/update", produtoController.update); 
 // let { id} = req.query; 
//http://localhost:3331/update?id=1

module.exports = routes;
