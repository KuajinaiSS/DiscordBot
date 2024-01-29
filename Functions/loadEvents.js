async function loadEvents(client, dir = "./Events") {
    const fs = require('node:fs');
    await client.events.clear();

    const eventFolder = fs.readdirSync('./Events');

    for (const folder of eventFolder) {
        const eventFiles = fs.readdirSync(`./Events/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of eventFiles) {
            const event = require(`../Events/${folder}/${file}`);

            if (event.rest) {
                if (event.once) client.rest.once(event.name, (...args) => event.execute(...args, client));
                else client.rest.on(event.name, (...args) => event.execute(...args, client));
            }else {
                if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
        }
    }
    return console.log(`Se cargaron ${client.events.size} eventos.`);
}

module.exports = {loadEvents};