const { CommandInteraction, Client } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Obtenir de l\'aide avec le bot'),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        await interaction.deferReply({ fetchReply: true });
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.StringSelectMenuBuilder()
                    .setCustomId('Panel Commandes')
                    .setPlaceholder('Rien de sélectionné')
                    .addOptions([
                        {
                            label: `Commandes`,
                            description: `Afficher les commandes du bot`,
                            value: "commands-m",
                        },
                    ]),
            );
    },
};

 