const Discord = require('discord.js');

const Schema = require('../../database/models/functions');

module.exports = async (client, interaction, args) => {
    const boolean = interaction.options.getBoolean('active');

    const data = await Schema.findOne({ Guild: interaction.guild.id });
    if (data) {
        data.AntiSpam = boolean;
        data.save();
    }
    else {
        new Schema({
            Guild: interaction.guild.id,
            AntiSpam: boolean,
        }).save();
    }

    client.succNormal({
        text: `L'anti-spam est maintenant **${boolean ? 'activé' : 'désactivé '}** dans cette guilde`,
        type: 'editreply'
    }, interaction);
}

 