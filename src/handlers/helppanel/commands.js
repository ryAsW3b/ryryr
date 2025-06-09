const Discord = require('discord.js');

module.exports = async (client) => {
    const fields = [
        {
            name: `Auto Mod`,
            value: `\`/automod help\``,
            inline: true
        },
        {
            name: `Images`,
            value: `\`/images help\``,
            inline: true
        },
        {
            name: `Moderation`,
            value: `\`/moderation help\``,
            inline: true
        },
    ];

    client.on(Discord.Events.InteractionCreate, async (interaction) => {
        if (!interaction.isStringSelectMenu()) return;

        if (interaction.customId == "Bot-helppanel") {
            if (interaction.values == "commands-Bothelp") {
                interaction.deferUpdate();
                let page = 1;

                const row = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.ButtonBuilder()
                            .setCustomId('helpPrev')
                            .setEmoji('⬅️')
                            .setStyle(Discord.ButtonStyle.Secondary),

                        new Discord.ButtonBuilder()
                            .setCustomId('helpNext')
                            .setEmoji('➡️')
                            .setStyle(Discord.ButtonStyle.Secondary),
                    );

                const row2 = new Discord.ActionRowBuilder()
                    .addComponents(
                        new Discord.StringSelectMenuBuilder()
                            .setCustomId('Bot-helppanel')
                            .setPlaceholder('Rien de sélectionné')
                            .addOptions([
                                {
                                    label: `Commandes`,
                                    description: `Afficher les commandes du Bot`,
                                    value: "commands-Bothelp",
                                },
                            ]),
                    );

                client.embed({
                    title: `Utilitaire`,
                    desc: `Cette commande vous permet d'obtenir l'intégralité des commandes du bot.`,
                    fields: fields.slice(0, 24),
                    components: [row2, row],
                    type: 'edit'
                }, interaction.message).then(msg => {
                    const filter = i => i.user.id === interaction.user.id;

                    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 100000 });

                    collector.on('collect', async i => {
                        if (i.customId == "helpNext") {
                            if (page == 1) {
                                client.embed({
                                    title: `Utilitaire`,
                                    desc: `Cette commande vous permet d'obtenir l'intégralité des commandes du bot.`,
                                    fields: fields.slice(25, 49),
                                    components: [row2, row],
                                    type: 'update'
                                }, i)
                                page += 1;
                            }
                        }

                        else if (i.customId == "helpPrev") {
                            if (page == 2) {
                                client.embed({
                                    title: `Utilitaire`,
                                    desc: `Cette commande vous permet d'obtenir l'intégralité des commandes du bot.`,
                                    fields: fields.slice(0, 24),
                                    components: [row2, row],
                                    type: 'update'
                                }, i)
                                page -= 1;
                            }
                        }
                    });
                })
            }
        }
    }).setMaxListeners(0);
}

 