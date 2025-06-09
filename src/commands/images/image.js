
module.exports = async (client, interaction, args) => {

    const image = interaction.options.getString('image-url');
    const channel = interaction.options.getChannel('channel');

    if (!channel) return client.errNormal({ error: `Aucun channel trouvé`, type: 'editreply' }, interaction)

    client.succNormal({
        text: `L'image a été envoyée avec succès dans ${channel}`,
        type: 'editreply'
    }, interaction)

    client.simpleEmbed({
        image: `${image}`
    }, channel)
}

 