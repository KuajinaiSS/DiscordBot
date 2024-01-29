const { Client } = require("discord.js");
const mongoose = require("mongoose");
require('colors');

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client 
     */
    async execute(client) {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DatabaseURL, {
            keepAlive: true,
        }).then(() => {
            console.log("Conectado a la base de datos.".green);
        }).catch((err) => {
            console.log(`No se pudo conectar a la base de datos: ${err}`.red);
        });

        console.log(`${client.user.tag}: Hola Mundo!!!`.cyan);
    }
};