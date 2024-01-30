const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const colorNumber = parseInt('FF0000', 16);

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sismos')
    .setDescription('Obtener información sobre los últimos sismos en Chile'),
  async execute(interaction) {
    try {
      // Realizar la solicitud a la API
      const response = await axios.get('https://api.gael.cloud/general/public/sismos');
      const sismos = response.data;

      // Crear un mensaje embed con la información de los sismos
      const embed = {
        title: 'Últimos Sismos en Chile',
        fields: sismos.map(sismo => ({
          name: `Magnitud ${sismo.Magnitud} - Profundidad ${sismo.Profundidad} km`,
          value: `*Ubicación:* ${sismo.RefGeografica}\n*Fecha:* ${sismo.Fecha}\n *.*`,
        })),
        color: colorNumber, // Puedes ajustar el color según tus preferencias
      };

      // Responder con el embed
      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error al obtener la información de sismos:', error.message);
      await interaction.reply('Ocurrió un error al obtener la información de sismos.');
    }
  },
};
