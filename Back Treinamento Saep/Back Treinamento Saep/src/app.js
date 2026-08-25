const express = require("express");
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const routes = require("./routes");
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "pontuacao")));
app.use(routes);
const avaliadorDir = path.join(__dirname, "avaliador");
const scorePath = path.join(avaliadorDir, "score.json");
const statusPath = path.join(avaliadorDir, "prova-status.json");
const provaPath = path.join(avaliadorDir, "prova.json");
function lerJson(p,fallback){try{return JSON.parse(fs.readFileSync(p,"utf8"));}catch{return fallback;}}
function salvar(p,v){fs.writeFileSync(p,JSON.stringify(v,null,2));}
function recalcular(){execFileSync(process.execPath,[path.join(avaliadorDir,"corretor.js")],{stdio:"ignore"});return lerJson(scorePath,{pontos:0,total:100,itens:[],nota:0});}
app.get("/score",(req,res)=>res.json(recalcular()));
app.get("/prova",(req,res)=>{const status=lerJson(statusPath,{}),prova=lerJson(provaPath,{duracaoMinutos:15});res.json({...status,duracaoMinutos:prova.duracaoMinutos});});
app.post("/iniciar-prova",(req,res)=>{let status=lerJson(statusPath,{});if(!status.inicio||status.encerrada){status={inicio:new Date().toISOString(),encerrada:false,notaFinal:null,status:"EM ANDAMENTO",tempoUtilizado:null};salvar(statusPath,status);}res.json(status);});
app.post("/encerrar-prova",(req,res)=>{let status=lerJson(statusPath,{});if(status.encerrada)return res.json({ok:true,status});const score=recalcular();status.encerrada=true;status.notaFinal=score.nota;status.status=req.query.tipo||"ENCERRADA POR TEMPO";if(status.inicio){const segundos=Math.max(0,Math.floor((Date.now()-new Date(status.inicio).getTime())/1000));status.tempoUtilizado=`${String(Math.floor(segundos/60)).padStart(2,'0')}:${String(segundos%60).padStart(2,'0')}`;}salvar(statusPath,status);res.json({ok:true,status});});
module.exports=app;
