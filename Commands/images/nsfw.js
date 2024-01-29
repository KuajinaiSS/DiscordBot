const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction } = require('discord.js');
const ms = require('ms');
const axios = require('axios');
const colorNumber = parseInt('ffb2ba', 16);

module.exports = {
    // Cooldown: ms('0.5s'),
    data: new SlashCommandBuilder()
        .setName('nsfw')
        .setDescription('Comandos para contenido NSFW.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('waifu')
                .setDescription('Muestra una imagen de una waifu en pelotas.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('neko')
                .setDescription('Muestra una imagen de una neko en pelotas.')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('blowjob')
                .setDescription('mona china haciendo un blowjob XDXDXDXXDX.')
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction interacion del usuario con el bot
     * @param {Client} client cliente que ejecuta el comando  
     */
    async execute(interaction, client) {
        // Verificar subcomando y responder según sea necesario
        const subcommand = interaction.options.getSubcommand();

        if (!interaction.channel.nsfw) return interaction.reply('la sala no es NSFW, oni-chancho.');

        switch (subcommand) {
            case 'waifu':
                // Lógica para el comando "nsfw waifu"
                fetchData(interaction, 'waifu');
                break;

            case 'neko':
                // Lógica para el comando "nsfw neko"
                fetchData(interaction, 'neko');
                break;

            case 'blowjob':
                // Lógica para el comando "nsfw blowjob"
                fetchData(interaction, 'blowjob');
                break;

            default:
                return interaction.reply('Subcomando no reconocido.');
        }
    },
};

function fetchData(interaction, category) {
    axios.get(`https://api.waifu.pics/nsfw/${category}`)
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
