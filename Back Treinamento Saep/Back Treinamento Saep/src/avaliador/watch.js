const { exec } = require('child_process');

console.log('Monitor de pontuação iniciado...');

setInterval(() => {
    exec('node src/avaliador/corretor.js');
}, 2000);