async function loadCommands(client, dir = "./Commands") {
    const fs = require('node:fs');
    await client.commands.clear();
    let commandsArray = [];

    const commandFolder = fs.readdirSync("./Commands");

    for (const folder of commandFolder) {
        const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const commandFile = require(`../Commands/${folder}/${file}`);
            const properties = { folder, ...commandFile };
            client.commands.set(commandFile.data.name, properties);
            commandsArray.push(commandFile.data.toJSON());
        }
    }

    client.application.commands.set(commandsArray);
    return console.log(`Se cargaron ${client.commands.size} comandos.`);
}

module.exports = {loadCommands};