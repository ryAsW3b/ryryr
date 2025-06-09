const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');

const model = require('../../database/models/badge');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('dev')
        .setDescription('Commandes pour les devs')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Commandes Devs')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Bannissements du bot')
                .addBooleanOption(option => option.setName('new').setDescription('Choisissez une variable').setRequired(true))
                .addUserOption(option => option.setName('user').setDescription('Choisissez un utilisateur').setRequired(true))
        )
,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        model.findOne({ User: interaction.user.id }, async (err, data) => {
            if (data && data.FLAGS.includes("DEVELOPER")) {
                await interaction.deferReply({ fetchReply: true });
                client.loadSubcommands(client, interaction, args);
            } else {
                return client.errNormal({
                    error: 'Only Bot developers are allowed to do this',
                    type: 'ephemeral'
                }, interaction)
            }
        })
    },
};

 