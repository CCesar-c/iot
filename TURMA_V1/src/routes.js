const { Router } = require("express");
//import { Router } from "express";
const produtoController = require("./controllers/produtoController");
//import { produtoController } from "./controllers/produtoController";

const routes = Router();

routes.get("/", (req, res) => {
  return res.status(200).json({ message: "Server on" });
});

routes.get("/produto", produtoController.index);

module.exports = routes;
