const Discord = require('discord.js');

const Schema = require('../../database/models/userBans');

const webhookClientLogs = new Discord.WebhookClient({
  id: "",
  token: "",
});

module.exports = async (client, interaction, args) => {
    const boolean = interaction.options.getBoolean('new');
    const member = interaction.options.getUser('user');
  
    if (boolean == true) {
        if (member.id === interaction.user.id) { // add the check here
            return client.errNormal({
                error: `Vous ne pouvez pas vous bannir du bot`,
                type: `editreply`
            }, interaction);
        }

        Schema.findOne({ User: member.id }, async (err, data) => {
            if (data) {
                return client.errNormal({
                    error: `<@!${member.id}> (${member.id}) a déjà été banni du bot.`,
                    type: `editreply`
                }, interaction);
            }
            else {
                new Schema({
                    User: member.id
                }).save();

                client.succNormal({
                    text: `<@!${member.id}> (${member.id}) a été banni du bot`,
                    type: 'editreply'
                }, interaction)

                let embedLogs = new Discord.EmbedBuilder()
                    .setTitle(`Ban`)
                    .setDescription(`<@!${member.id}> (${member.id}) a été banni du bot`)
                    .addFields(
                        { name: "Banni par", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                    )
                    .setColor('#050505')
                webhookClientLogs.send({
                    username: 'Bannissement du bot',
                    embeds: [embedLogs],
                });
            }
        })
    }
    else if (boolean == false) {
        Schema.findOne({ User: member.id }, async (err, data) => {
            if (data) {
                Schema.findOneAndDelete({ User: member.id }).then(() => {
                    client.succNormal({
                        text: `<@!${member.id}> (${member.id}) a été débanni du bot`,
                        type: 'editreply'
                    }, interaction)

                    let embedLogs = new Discord.EmbedBuilder()
                        .setTitle(`Banissement révoqué`)
                        .setDescription(`<@!${member.id}> (${member.id})  a été débanni du bot`)
                        .addFields(
                            { name: "Débanni par", value: `${interaction.user} (${interaction.user.tag})`, inline: true },
                        )
                        .setColor('#050505')
                    webhookClientLogs.send({
                        username: 'Bannissement du bot',
                        embeds: [embedLogs],
                    });
                })
            }
            else {
                return client.errNormal({
                    error: `<@!${member.id}> (${member.id}) n'a pas été banni du bot`,
                    type: `editreply`
                }, interaction);
            }
        })
    }
}

