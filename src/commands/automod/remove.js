const Discord = require('discord.js');

const Schema = require("../../database/models/blacklist");

module.exports = async (client, interaction, args) => {
    const word = interaction.options.getString('word');

    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data) {
            if (!data.Words.includes(word)) {
                return client.errNormal({
                    error: `Ce mot n'existe pas dans la database`,
                    type: 'editreply'
                }, interaction);
            }

            const filtered = data.Words.filter((target) => target !== word);

            await Schema.findOneAndUpdate({ Guild: interaction.guild.id }, {
                Guild: interaction.guild.id,
                Words: filtered
            });

            client.succNormal({
                text: `Le mot est retiré de la blacklist`,
                fields: [
                    {
                        name: `Blacklist`,
                        value: `${word}`
                    }
                ],
                type: 'editreply'
            }, interaction);
        }
        else {
            client.errNormal({
                error: `Cette guilde n'a pas de mot(s) blacklisté.`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 