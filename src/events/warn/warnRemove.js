const discord = require('discord.js');

module.exports = async (client, user, mod) => {
    const logsChannel = await client.getLogs(user.guild.id);
    if (!logsChannel) return;

    client.embed({
        title: `Avertissement`,
        desc: `Suppression de l'avertissement`,
        fields: [
            {
                name: `> Utilisateur`,
                value: `- ${user}`
            },
            {
                name: `> ID`,
                value: `${user.id}`
            },
            {
                name: `> Modérateur`,
                value: `${mod} (${mod.id})`
            },
            {
                name: `> Raison`,
                value: `${reason}`
            }
        ]
    }, logsChannel).catch(() => { })
};