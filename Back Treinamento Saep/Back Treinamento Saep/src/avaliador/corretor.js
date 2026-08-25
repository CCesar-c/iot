const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', '..');
const SRC = path.join(__dirname, '..');
const statusPath = path.join(__dirname, 'prova-status.json');

let status = null;
if (fs.existsSync(statusPath)) {
  try { status = JSON.parse(fs.readFileSync(statusPath, 'utf8')); } catch (_) {}
}

const resultado = {
  pontos: 0,
  total: 0,
  itens: []
};

function lerArquivo(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
}

function normalizar(texto) {
  return String(texto ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/["'`]/g, '"')
    .replace(/\s+/g, '')
    .trim();
}

function possui(conteudo, trecho) {
  return normalizar(conteudo).includes(normalizar(trecho));
}

function possuiAlgum(conteudo, trechos) {
  return trechos.some(trecho => possui(conteudo, trecho));
}

function adicionar(nome, ok, pontos = 0, codigo = '') {
  resultado.itens.push({ nome, ok, pontos, codigo });
  resultado.total += pontos;
  if (ok) resultado.pontos += pontos;
}

// =====================================================
// 1) DEPENDÊNCIAS / SEQUELIZE INIT
// =====================================================
function verificarDependencias() {
  const packagePath = path.join(ROOT, 'package.json');
  let pkg = {};

  if (fs.existsSync(packagePath)) {
    try { pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8')); } catch (_) {}
  }

  adicionar('Sequelize instalado', !!pkg.dependencies?.sequelize, 3, 'sequelize');
  adicionar('Sequelize CLI instalado',
    !!pkg.devDependencies?.['sequelize-cli'] || !!pkg.dependencies?.['sequelize-cli'],
    3, 'sequelize-cli'
  );
  adicionar('PG instalado', !!pkg.dependencies?.pg, 3, 'pg');
  adicionar('PG-HSTORE instalado', !!pkg.dependencies?.['pg-hstore'], 3, 'pg-hstore');

  const estruturaCriada =
    fs.existsSync(path.join(SRC, 'config')) &&
    fs.existsSync(path.join(SRC, 'models')) &&
    fs.existsSync(path.join(SRC, 'database', 'migrations')) &&
    fs.existsSync(path.join(SRC, 'seeders'));

  adicionar('Estrutura do Sequelize criada', estruturaCriada, 6, 'config/ + models/ + database/migrations/ + seeders/');
}

// =====================================================
// 2) DATABASE / MODEL / MIGRATION
// =====================================================
function verificarBanco() {
  const databasePath = path.join(SRC, 'config', 'database.js');
  const modelsIndexPath = path.join(SRC, 'models', 'index.js');
  const modelsDir = path.join(SRC, 'models');
  const migrationsDir = path.join(SRC, 'database', 'migrations');

  const databaseContent = lerArquivo(databasePath);

  adicionar('Username configurado', possuiAlgum(databaseContent, ['postgres']), 2, 'username: \"postgres\"');
  adicionar('Database configurado', possuiAlgum(databaseContent, ['piloto_saep']), 2, 'database: \"piloto_saep\"');
  adicionar('Host configurado', possuiAlgum(databaseContent, ['localhost']), 2, 'host: \"localhost\"');
  adicionar('Dialect configurado', possuiAlgum(databaseContent, ['postgres']), 2, 'dialect: \"postgres\"');
  adicionar('Porta configurada', possuiAlgum(databaseContent, ['5432', '5433']), 2, 'port: 5432');

  const modelsContent = lerArquivo(modelsIndexPath);
  adicionar('Configuração importada',
    possuiAlgum(modelsContent, [
      'require("../config/database")',
      'require("../config/database.js")'
    ]), 2);
  adicionar('Conexão Sequelize criada',
    possui(modelsContent, 'const sequelize = new Sequelize'), 3, 'const sequelize = new Sequelize(...)');

  adicionar('Model Produto criada', fs.existsSync(path.join(modelsDir, 'produto.js')), 5, 'models/produto.js');

  let migrationProdutoOk = false;
  if (fs.existsSync(migrationsDir)) {
    migrationProdutoOk = fs.readdirSync(migrationsDir)
      .some(nome => nome.toLowerCase().includes('create-produto'));
  }
  adicionar('Migration Produto criada', migrationProdutoOk, 4, 'create-produto');
}

// =====================================================
// 3) CONTROLLER: STORE / INDEX / ROTAS GET / POST
// =====================================================
function verificarControllerBasico() {
  const controllerPath = path.join(SRC, 'controllers', 'produtoController.js');
  const routesPath = path.join(SRC, 'routes.js');
  const controllerContent = lerArquivo(controllerPath);
  const routesContent = lerArquivo(routesPath);

  adicionar('Importação do Model',
    possuiAlgum(controllerContent, [
      'const { produto } = require("../models");',
      'const { produto } = require("../models")'
    ]), 2, 'const { produto } = require("../models")');
  adicionar('Classe produtoController', possui(controllerContent, 'class produtoController {'), 1, 'class produtoController');
  adicionar('Método store()', possui(controllerContent, 'async store(req, res) {'), 2, 'async store(req, res)');
  adicionar('Captura do req.body',
    possui(controllerContent, 'const { nome, preco, quantidade } = req.body;'), 1, 'const { nome, preco, quantidade } = req.body');
  adicionar('Criação do Produto',
    possuiAlgum(controllerContent, [
      `const createdProduto = await produto.create({ nome, preco, quantidade });`,
      `const createdProduto = await produto.create({\n    nome,\n    preco,\n    quantidade\n});`
    ]), 5, 'produto.create({ nome, preco, quantidade })');
  adicionar('Retorno do store()', possui(controllerContent, 'return res.status(200).json(createdProduto);'), 1, 'return res.status(200).json(createdProduto)');
  adicionar('Método index()', possui(controllerContent, 'async index(req, res) {'), 2, 'async index(req, res)');
  adicionar('Busca de Produtos', possui(controllerContent, 'const produtos = await produto.findAll();'), 4, 'produto.findAll()');
  adicionar('Retorno do index()', possui(controllerContent, 'return res.status(200).json(produtos);'), 1, 'return res.status(200).json(produtos)');
  adicionar('Exportação do Controller', possui(controllerContent, 'module.exports = new produtoController();'), 1, 'module.exports = new produtoController()');

  adicionar('Importação do Controller nas Rotas',
    possuiAlgum(routesContent, [
      'const produtoController = require("./controllers/produtoController");',
      'const produtoController = require("./controllers/produtoController")'
    ]), 1, 'require("./controllers/produtoController")');
  adicionar('Rota GET /produto', possui(routesContent, 'routes.get("/produto", produtoController.index)'), 3, 'routes.get("/produto", produtoController.index)');
  adicionar('Rota POST /produto', possui(routesContent, 'routes.post("/produto", produtoController.store)'), 3, 'routes.post("/produto", produtoController.store)');
}

// =====================================================
// 4) CONTROLLER: UPDATE / DESTROY / ROTAS PUT / DELETE
// =====================================================
function verificarControllerUpdateDestroy() {
  const controllerPath = path.join(SRC, 'controllers', 'produtoController.js');
  const routesPath = path.join(SRC, 'routes.js');
  const controllerContent = lerArquivo(controllerPath);
  const routesContent = lerArquivo(routesPath);

  adicionar('Cabeçalho do update()',
    possui(controllerContent, `async update(req, res) { const { id } = req.params; const { nome, preco, quantidade } = req.body;`), 4, 'async update(req, res) + req.params + req.body');
  adicionar('Atualização do Produto',
    possuiAlgum(controllerContent, [
      `await produto.update({ nome, preco, quantidade }, { where: { id: id } });`,
      `await produto.update({ nome, preco, quantidade }, { where: { id } });`
    ]), 6, 'produto.update({ nome, preco, quantidade }, { where: { id } })');
  adicionar('Retorno do update()',
    possui(controllerContent, 'return res.status(200).json({ mensagem: "Produto atualizado com sucesso" });'), 1, 'return res.status(200).json(...)');
  adicionar('Cabeçalho do destroy()',
    possui(controllerContent, 'async destroy(req, res) { const { id } = req.params;'), 3, 'async destroy(req, res) + req.params');
  adicionar('Exclusão do Produto',
    possuiAlgum(controllerContent, [
      'await produto.destroy({ where: { id: id } });',
      'await produto.destroy({ where: { id } });'
    ]), 4, 'produto.destroy({ where: { id } })');
  adicionar('Retorno do destroy()',
    possui(controllerContent, 'return res.status(200).json({ mensagem: "Produto excluído com sucesso" });'), 1, 'return res.status(200).json(...)');
  adicionar('Rota PUT /produto/:id', possui(routesContent, 'routes.put("/produto/:id", produtoController.update)'), 6, 'routes.put("/produto/:id", produtoController.update)');
  adicionar('Rota DELETE /produto/:id', possui(routesContent, 'routes.delete("/produto/:id", produtoController.destroy)'), 6, 'routes.delete("/produto/:id", produtoController.destroy)');
}

verificarDependencias();
verificarBanco();
verificarControllerBasico();
verificarControllerUpdateDestroy();

resultado.nota = Number(((resultado.pontos / resultado.total) * 10).toFixed(1));

if (status && !status.encerrada && resultado.pontos === resultado.total) {
  status.encerrada = true;
  status.notaFinal = resultado.nota;
  status.status = 'CONCLUÍDA';

  if (status.inicio) {
    const segundos = Math.floor((new Date() - new Date(status.inicio)) / 1000);
    const minutos = Math.floor(segundos / 60);
    const restoSegundos = segundos % 60;
    status.tempoUtilizado = `${String(minutos).padStart(2, '0')}:${String(restoSegundos).padStart(2, '0')}`;
  }

  fs.writeFileSync(statusPath, JSON.stringify(status, null, 2));
}

fs.writeFileSync(
  path.join(__dirname, 'score.json'),
  JSON.stringify(resultado, null, 2)
);
