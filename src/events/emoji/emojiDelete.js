const discord = require('discord.js');

module.exports = async (client, emoji) => {
    const logsChannel = await client.getLogs(emoji.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Emoji supprimé`,
        desc: `Un emoji a été supprimé`,
        fields: [
            {
                name: `> Nom`,
                value: `- ${emoji.name}`
            },
            {
                name: `> ID`,
                value: `- ${emoji.id}`
            }
        ]
    }, logsChannel).catch(() => { })
};