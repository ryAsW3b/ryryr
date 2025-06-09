const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { ChannelType } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('automod')
        .setDescription('Gestion de l\'auto mod')
        .addSubcommand(subcommand =>
            subcommand
                .setName('help')
                .setDescription('Obtenir des informations sur les commandes de l\'auto-mod')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antiinvite')
                .setDescription('Activer/désactiver l\'anti-invite')
                .addBooleanOption(option => option.setName('active').setDescription('Sélectionner une variable').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antilinks')
                .setDescription('Activer/désactiver l\'anti-liens')
                .addBooleanOption(option => option.setName('active').setDescription('Sélectionner une variable').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('antispam')
                .setDescription('Activer/désactiver l\'anti-spam')
                .addBooleanOption(option => option.setName('active').setDescription('Sélectionner une variable').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('linkschannel')
                .setDescription('Ajout d\'un channel autorisé à envoyer des liens')
                .addStringOption(option =>
                    option.setName('type')
                        .setDescription('Que voulez-vous faire avec le channel ?')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Add', value: 'add' },
                            { name: 'Remove', value: 'remove' }
                        )
                )
                .addChannelOption(option => option.setName('channel').setDescription('Sélectionner un channel').setRequired(true).addChannelTypes(ChannelType.GuildText))
        )
        .addSubcommandGroup(group =>
            group
                .setName('blacklist')
                .setDescription('Gestion de la blacklist')
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('display')
                        .setDescription('Montrer toute la blacklist')
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('add')
                        .setDescription('Ajouter un mot dans la blacklist')
                        .addStringOption(option => option.setName('word').setDescription('Le mot pour la blacklist').setRequired(true))
                )
                .addSubcommand(subcommand =>
                    subcommand
                        .setName('remove')
                        .setDescription('Retirer un mot de la blacklist')
                        .addStringOption(option => option.setName('word').setDescription('Le mot pour la blacklist').setRequired(true))
                )
        )
    ,

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const perms = await client.checkUserPerms({
            flags: [Discord.PermissionsBitField.Flags.ManageMessages],
            perms: [Discord.PermissionsBitField.Flags.ManageMessages]
        }, interaction)

        if (perms == false) return;

        client.loadSubcommands(client, interaction, args);
    },
};

 