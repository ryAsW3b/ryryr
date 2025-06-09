const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    client.embed({
        title: `Owner`,
        thumbnail: client.user.avatarURL({ dynamic: true, size: 1024 }),
        fields: [{
            name: "Compte Discord",
            value: `rj4n`,
            inline: true,
        }],
        type: 'editreply'
    }, interaction)
}

 