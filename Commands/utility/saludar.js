const { SlashCommandBuilder, EmbedBuilder, Client, ChatInputCommandInteraction } = require('discord.js');
const ms = require('ms');

module.exports = {
	// Cooldown: ms('0.5s'),
	data: new SlashCommandBuilder()
		.setName('hola')
		.setDescription('Saludara y mostrara los comandos disponibles'),
	/**
	 * 
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {Client} client 
	 */
	async execute(interaction, client) {
		return interaction.reply({content: `Hola ${interaction.user}`});
	},
};