const Discord = require('discord.js');

const Schema = require("../../database/models/blacklist");

module.exports = async (client, interaction, args) => {
    Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
        if (data && data.Words.length > 0) {
            client.embed({
                title: "Mot(s) blacklist",
                desc: data.Words.join(", "),
                type: 'editreply'
            }, interaction)
        }
        else {
            client.errNormal({
                error: `Cette guilde n'a pas de mot(s) blacklisté.`,
                type: 'editreply'
            }, interaction);
        }
    })
}

 