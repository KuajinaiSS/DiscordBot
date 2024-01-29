require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits, Partials, Collection } = require('discord.js');
const prefix = '%';
const { loadCommands } = require('./Functions/loadCommands');
const { loadEvents } = require('./Functions/loadEvents');

// const client = new Client({
//     intents: 34563
// });

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});

client.commands = new Collection();
client.events = new Collection();

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'hola') {
        // message.reply('Si');
        message.channel.send('SI');
    }
});

client.login(process.env.TOKEN)
    .then( async () => {
        await loadCommands(client);
        await loadEvents(client);
        // console.log(client.commands);
    })
    .catch((err) => {
        console.log(err);
    });