const Discord = require('discord.js');

const TempSchema = require("../../database/models/tempban");

module.exports = async (client, interaction, args) => {
  const perms = await client.checkPerms({
    flags: [Discord.PermissionsBitField.Flags.BanMembers],
    perms: [Discord.PermissionsBitField.Flags.BanMembers]
  }, interaction)

  if (perms == false) return;

  const member = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
  const reason = interaction.options.getString('reason') || 'Not given';

  if (member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers) || member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) return client.errNormal({
    error: "Vous ne pouvez pas bannir un modérateur",
    type: 'editreply'
  }, interaction);

  client.embed({
    title: `Ban`,
    desc: `Vous avez été banni de **${interaction.guild.name}**`,
    fields: [
      {
        name: "Banni par",
        value: interaction.user.tag,
        inline: true
      },
      {
        name: "Raison",
        value: reason,
        inline: true
      }
    ]
  }, member).then(async function () {
    member.ban({ reason: reason })
    client.succNormal({
      text: "L'utilisateur spécifié a été banni avec succès et a reçu une notification",
      fields: [
        {
          name: "Utilisateur banni",
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

    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + parseInt(interaction.options.getNumber('time')))

    await new TempSchema({
      guildId: interaction.guild.id,
      userId: member.id,
      expires,
    }).save();

  }).catch(async function () {
    member.ban({ reason: reason })
    client.succNormal({
      text: "L'utilisateur en question a été banni avec succès, mais n'a pas reçu de notification",
      type: 'editreply'
    }, interaction);

    const expires = new Date()
    expires.setMinutes(expires.getMinutes() + parseInt(interaction.options.getNumber('time')))

    await new TempSchema({
      guildId: interaction.guild.id,
      userId: member.id,
      expires,
    }).save();
  });
}

 
