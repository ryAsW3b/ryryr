const { CommandInteraction, Client } = require('discord.js');
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const Schema = require("../../database/models/warnings");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Avertissements')
        .setType(2),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const perms = await client.checkPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false){
            client.errNormal({
                error: "You don't have the required permissions to use this command!",
                type: 'ephemeral'
            }, interaction);
            return;
        }
        await interaction.deferReply({ ephemeral: false });

        const member = interaction.guild.members.cache.get(interaction.targetId);

        Schema.findOne({ Guild: interaction.guild.id, User: member.id }, async (err, data) => {
            if (data) {
                var fields = [];
                data.Warnings.forEach(element => {
                    fields.push({
                        name: "Avertissements **" + element.Case + "**",
                        value: "Raison: " + element.Reason + "\nModérateur <@!" + element.Moderator + ">",
                        inline: true
                    })
                });
                client.embed({
                    title: `${client.emotes.normal.error}・Avertissements`,
                    desc: `Les avertissements de **${member.user.tag}**`,
                    fields: [
                        {
                            name: "Total",
                            value: `${data.Warnings.length}`,
                        },
                        ...fields
                    ],
                    type: 'editreply'
                }, interaction)
            }
            else {
                client.embed({
                    title: `${client.emotes.normal.error}・Avertissements`,
                    desc: `L\'utilisateur ${member.user.tag} n'a aucun avertissement`,
                    type: 'editreply'
                }, interaction)
            }
        })
    },
};

 