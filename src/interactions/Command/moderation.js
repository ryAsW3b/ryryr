const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('modération')
        .setDescription('Gérer la modération du serveur')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de la catégorie de modération')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('ban')
                .setDescription('Bannir un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison du ban'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Clear les messages')
                .addNumberOption(option => option.setName('amount').setDescription('Nombre de messages').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clearuser')
                .setDescription('Clear les messages d\'un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('demote')
                .setDescription('Rétrograder un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('kick')
                .setDescription('Exclure un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison du kick'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('softban')
                .setDescription('Softban a user')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('The reason for the ban'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('timeout')
                .setDescription('Timeout un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('time').setDescription('Nombre des minutes').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison pour le time-out').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('tempban')
                .setDescription('Bannir temporairement un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addNumberOption(option => option.setName('time').setDescription('Nombre des minutes').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison pour le bannissement temporaire'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unban')
                .setDescription('Débannir un utilisateur')
                .addStringOption(option => option.setName('user').setDescription('ID de l\'utilisateur').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('banlist')
                .setDescription('Liste de tous les utilisateurs bannis')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('warn')
                .setDescription('Warn un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addStringOption(option => option.setName('reason').setDescription('La raison pour le warn').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('unwarn')
                .setDescription('Unwarn un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
                .addIntegerOption(option => option.setName('case').setDescription('Donner un numéro de dossier').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('warnings')
                .setDescription('Voir les avertissements d\'un utilisateur')
                .addUserOption(option => option.setName('user').setDescription('Sélectionner un utilisateur').setRequired(true))
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        client.loadSubcommands(client, interaction, args);
    },
};

 