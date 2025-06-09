const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.KickMembers],
    perms: [Discord.PermissionsBitField.Flags.KickMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Not given';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.KickMembers)) return client.errNormal({
    error: "Un modérateur ne peut pas être kick",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `Kick`,
    desc: `Vous avez été kick de **${interaction.guild.name}**`,
    fields: [
      {
        name: "Kick par",
        value: interaction.user.tag,
        inline: true
      },
      {
        name: "Raison",
        value: reason,
        inline: true
      }
    ]
  }, member).then(function () {
    member.kick(reason)
    client.succNormal({
      text: "L'utilisateur spécifié a été kick avec succès et a reçu une notification",
      fields: [
        {
          name: "Utilisateur exclu",
          value: member.user.tag,
          inline: true
        },
        {
          name: "Raison",
          value: reason,
          inline: true
        }
      ],
      type: 'editreply'
    }, interaction);
  }).catch(function () {
    member.kick(reason)
    client.succNormal({
      text: "L'utilisateur en question a été kick avec succès, mais n'a pas reçu de notification",
      type: 'editreply'
    }, interaction);
  });
}

 