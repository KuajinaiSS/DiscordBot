const { SlashCommandBuilder, Client, ChatInputCommandInteraction, MessageActionRow, MessageSelectMenuBuilder } = require('discord.js');
const ms = require('ms');
const axios = require('axios');
const colorNumber = parseInt('b2ffff', 16);

module.exports = {
    // Cooldown: ms('2s'),
    data: new SlashCommandBuilder()
        .setName('sfw')
        .setDescription('Comandos para contenido SFW.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('waifu')
                .setDescription('Muestra una imagen de una waifu normal.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('neko')
                .setDescription('Muestra una imagen de una neko normal.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('pat')
                .setDescription('pat pat pat.')
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction interacion del usuario con el bot
     * @param {Client} client cliente que ejecuta el comando 
     */
    async execute(interaction, client) {
        // Verificar subcomando y responder según sea necesario
        const subcommand = interaction.options.getSubcommand();
        
        switch (subcommand) {
            case 'waifu':
                // Lógica para el comando "sfw waifu"
                fetchData(interaction, 'waifu');
                break;

            case 'neko':
                // Lógica para el comando "sfw neko"
                fetchData(interaction, 'neko');
                break;

            case 'pat':
                // Lógica para el comando "sfw pat"
                fetchData(interaction, 'pat');
                break;

            default:
                return interaction.reply('Subcomando no reconocido.');
        }
    },
};

function fetchData(interaction, category) {
    axios.get(`https://api.waifu.pics/sfw/${category}`)
        .then((response) => {
            // Obtener la URL de la imagen desde la respuesta
            const imageUrl = response.data.url;

            // Crear un mensaje embed con la imagen
            const embed = {
                title: `Imagen ${category}`,
                image: { url: imageUrl },
                color: colorNumber,
            };

            // Responder con el embed
            return interaction.reply({ embeds: [embed] });
        })
        .catch((error) => {
            console.error('Error al hacer la solicitud a la API:', error.message);
            return interaction.reply('Ocurrió un error al obtener la imagen de la waifu.');
        });
};

// TODO: Agregar un menú de selección para que el usuario pueda elegir entre varias imágenes
// async function fetchData(interaction, category) {
//     try {
//         const response = await axios.get(`https://api.waifu.pics/sfw/${category}`);
//         const imageUrl = response.data.url;

//         // Crear un mensaje embed con la imagen
//         const embed = {
//             title: `Waifu SFW - ${category}`,
//             image: { url: imageUrl },
//             color: colorNumber,
//         };

//         // Crear un mensaje de acción con un menú de selección
//         const selectMenu = new MessageSelectMenuBuilder()
//             .setCustomId('imageSelector')
//             .setPlaceholder('Selecciona una opción');

//         // Agregar opciones al menú de selección (puedes ajustar esto según tus necesidades)
//         for (let i = 1; i <= 5; i++) {
//             selectMenu.addOption({
//                 label: `Opción ${i}`,
//                 value: `option${i}`,
//                 description: `Descripción de la opción ${i}`,
//             });
//         }

//         // Crear una fila de acciones con el menú de selección
//         const row = new MessageActionRow().addComponents(selectMenu);

//         // Responder con el embed y la fila de acciones
//         interaction.reply({ embeds: [embed], components: [row] });
//     } catch (error) {
//         console.error('Error al hacer la solicitud a la API:', error.message);
//         interaction.reply('Ocurrió un error al obtener la imagen de la waifu.');
//     }
// };




