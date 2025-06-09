const discord = require('discord.js');

module.exports = async (client, emoji) => {
    const logsChannel = await client.getLogs(emoji.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Emoji crée`,
        desc: `Un emoji a été crée`,
        fields: [
            {
                name: `> Emoji`,
                value: `- ${emoji}`
            },
            {
                name: `> Nom`,
                value: `- ${emoji.name}`
            },
            {
                name: `> ID`,
                value: `- ${emoji.id}`
            },
            {
                name: `> URL`,
                value: `- ${emoji.url}`
            }
        ]
    }, logsChannel).catch(() => { })
};