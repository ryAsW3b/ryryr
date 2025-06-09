const discord = require('discord.js');

module.exports = async (client, oldEmoji, newEmoji) => {
    const logsChannel = await client.getLogs(newEmoji.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Emoji mis à jour`,
        desc: `Un emoji a été mis à jour`,
        fields: [
            {
                name: `> Emoji`,
                value: `- ${newEmoji}`
            },
            {
                name: `> Avant`,
                value: `- ${oldEmoji.name}`
            },
            {
                name: `> Après`,
                value: `- ${newEmoji.name}`
            },
            {
                name: `> ID`,
                value: `- ${newEmoji.id}`
            }
        ]
    }, logsChannel).catch(() => { })
};