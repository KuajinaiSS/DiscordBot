require('dotenv').config();

const token = process.env.TOKEN;

if (!token) {
    console.error("Error: El token no está definido en el archivo .env");
    process.exit(1);
}

// requerimientos
const { Client, Intents } = require('discord.js'); // Agregamos la importación de Intents

// definir cliente
const Cliente = new Client(
    {
        intents: 33027
    }
);

// contenido
Cliente.on('ready', async () => {
    console.log(`${Cliente.user.tag}: Estoy vivo (lamentablemente :c)`);
});

// conectarse
Cliente.login(token);
