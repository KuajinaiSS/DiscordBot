const { Client, PermissionFlagsBits, EmbedBuilder, ChatInputCommandInteraction } = require("discord.js");
const cooldown = new Set();

module.exports = {
    name: "interactionCreate",
    once: false,

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client 
     */
    async execute(interaction,client) {
        if(!interaction.guild || !interaction.channel) return;
        if(!interaction.isChatInputCommand) return;

        const command = client.commands.get(interaction.commandName);
        const cooldowns = await command.Cooldown;

        if(command){
            if(!command) return interaction.reply({content: "Este comando no existe.", ephemeral: true});
            if(command.Cooldown && cooldowns.has(interaction.user.id)) return interaction.reply({content: `Debes esperar ${cooldown / 1000} segundos para volver a usar este comando.`, ephemeral: true});
            cooldown.add(interaction.user.id);
            try{
                setTimeout(() => {
                    cooldown.delete(interaction.user.id);
                }, cooldowns);
                command.execute(interaction, client);
            }catch(err){
                console.log(err);
                interaction.reply({content: "Ha ocurrido un error al ejecutar este comando.", ephemeral: true});
            }
        }
    }
};