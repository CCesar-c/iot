const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pastas = [
'../config',
'../models',
'../database',
'../seeders'
];
// Remove as pastas criadas pelo aluno
pastas.forEach(pasta => {
const caminho = path.join(__dirname, pasta);

if (fs.existsSync(caminho)) {
fs.rmSync(caminho, {
recursive: true,
force: true
});


console.log(`Removido: ${caminho}`);


}
});



// =====================================
// REMOVE UPDATE E DESTROY DO CONTROLLER
// =====================================

const controllerPath = path.join(
    __dirname,
    "../controllers/produtoController.js"
);

if (fs.existsSync(controllerPath)) {

    let controllerContent = fs.readFileSync(
        controllerPath,
        "utf8"
    );

    // Remove o método update()
    controllerContent = controllerContent.replace(
        /async\s+update\s*\(req,\s*res\)\s*\{[\s\S]*?Produto atualizado com sucesso"\s*\}\);\s*\}/,
        ""
    );

    // Remove o método destroy()
    controllerContent = controllerContent.replace(
        /async\s+destroy\s*\(req,\s*res\)\s*\{[\s\S]*?Produto excluído com sucesso"\s*\}\);\s*\}/,
        ""
    );

    fs.writeFileSync(
        controllerPath,
        controllerContent
    );

    console.log("Métodos update() e destroy() removidos.");
}

// =====================================
// REMOVE ROTAS PUT E DELETE
// =====================================

const routesPath = path.join(
    __dirname,
    "../routes.js"
);

if (fs.existsSync(routesPath)) {

    let routesContent = fs.readFileSync(
        routesPath,
        "utf8"
    );

// remover sequelize


// Remove a importação do produtoController
routesContent = routesContent.replace(
    /const\s+produtoController\s*=\s*require\(["']\.\/controllers\/produtoController["']\)\s*;\s*/g,
    ""
);

// Remove a rota GET
routesContent = routesContent.replace(
    /routes\.get\s*\(\s*["']\/produto["']\s*,\s*produtoController\.index\s*\)\s*;?\s*/g,
    ""
);

// Remove a rota POST
routesContent = routesContent.replace(
    /routes\.post\s*\(\s*["']\/produto["']\s*,\s*produtoController\.store\s*\)\s*;?\s*/g,
    ""
);

// Remove a rota PUT
routesContent = routesContent.replace(
    /routes\.put\s*\(\s*["']\/produto\/:id["']\s*,\s*produtoController\.update\s*\)\s*;?\s*/g,
    ""
);

// Remove a rota DELETE
routesContent = routesContent.replace(
    /routes\.delete\s*\(\s*["']\/produto\/:id["']\s*,\s*produtoController\.destroy\s*\)\s*;?\s*/g,
    ""
);



    fs.writeFileSync(
        routesPath,
        routesContent
    );

    console.log("Rotas PUT e DELETE removidas.");
}


// =====================================
// RESETA SCORE
// =====================================

const scorePath = path.join(
    __dirname,
    'score.json'
);

fs.writeFileSync(
    scorePath,
    JSON.stringify({
        pontos: 0,
        total: 100,
        itens: [
    
        ],
        nota: 0
    }, null, 2)
);

// =====================================
// RESETA STATUS
// =====================================

const provaStatusPath = path.join(
    __dirname,
    'prova-status.json'
);

fs.writeFileSync(
    provaStatusPath,
    JSON.stringify({
        inicio: null,
        encerrada: false,
        notaFinal: null,
        status: 'EM ANDAMENTO',
        tempoUtilizado: null
    }, null, 2)
);

console.log('✅ Score resetado');
console.log('✅ Status resetado');
console.log('✅ Prova resetada');



// =====================================
// REMOVE DEPENDÊNCIAS INSTALADAS
// =====================================

console.log('📦 Removendo dependências da prova...');

try {

    const projetoPath = path.join(
        __dirname,
        '..',
        '..'
    );

    execSync(
        'npm uninstall sequelize pg pg-hstore',
        {
            cwd: projetoPath,
            stdio: 'inherit',
            shell: true
        }
    );

    execSync(
        'npm uninstall -D sequelize-cli',
        {
            cwd: projetoPath,
            stdio: 'inherit',
            shell: true
        }
    );

    console.log('✅ Dependências removidas');

} catch (error) {

    console.error('❌ Erro ao remover dependências');
    console.error(error.message);

}

console.log('✅ Prova resetada');

