const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkPerms({
        flags: [Discord.PermissionsBitField.Flags.ManageMessages],
        perms: [Discord.PermissionsBitField.Flags.ManageMessages]
    }, interaction);

    if (perms == false) return;

    const amount = interaction.options.getNumber('amount');

    if (amount > 100) return client.errNormal({
        error: "Je ne peux pas supprimer plus de 100 messages à la fois",
        type: 'editreply'
    }, interaction);

    if (amount < 1) return client.errNormal({
        error: "Je ne peux pas supprimer moins d'un message",
        type: 'editreply'
    }, interaction);

    interaction.channel.bulkDelete(amount + 1).then(() => {
        client.succNormal({
            text: `J'ai supprimé les messages avec succès`,
            fields: [
                {
                    name: "Nombre de messages supprimés",
                    value: `${amount}`,
                    inline: true
                }
            ],
            type: 'ephemeraledit'
        }, interaction)
    }).catch(err => {
        client.errNormal({
            error: "Une erreur s'est produite lors de la suppression de messages dans ce canal",
            type: 'editreply'
        }, interaction);
    });
}

 