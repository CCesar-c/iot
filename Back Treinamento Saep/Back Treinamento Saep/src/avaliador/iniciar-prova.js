const fs = require('fs');
const path = require('path');

const statusPath = path.join(
    __dirname,
    'prova-status.json'
);

const status = {
    inicio: new Date().toISOString(),
    encerrada: false,
    notaFinal: null,
    status: "EM ANDAMENTO"
};


fs.writeFileSync(
    statusPath,
    JSON.stringify(status, null, 2)
);

console.log('Prova iniciada com sucesso!');