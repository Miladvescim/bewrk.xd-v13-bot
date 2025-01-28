const { GuildMember, Collection } = require('discord.js');
const GUILD_INVITE = require('../../../../Global/Databases/Schemas/Global.Guild.Invites');
const GUILD_SETTINGS = require('../../../../Global/Databases/Schemas/Global.Guild.Settings');
let Upstaff;
/**
 * @param {GuildMember} member 
 */
module.exports = async (member) => {
    if (member.guild.id !== sistem.SERVER.ID) return;

    try {
        const _findServer = await GUILD_SETTINGS.findOne({ guildID: sistem.SERVER.ID });
        if (!_findServer) return console.error('Guild settings not found.');

        const _set = _findServer.Ayarlar;
        const channel = member.guild.channels.cache.get(_set.etiketKanalı);
        if (!channel) return console.error('Invite channel not found.');

        const entry = await member.guild.fetchAuditLogs({ type: 'BOT_ADD' }).then(audit => audit.entries.first());
        if (member.user.bot && entry) {
            const botAddMessage = await channel.send({ content: `${member.guild.emojiGöster(emojiler.Onay)} ${member} isimli bot, **${entry.executor.tag}** tarafından \`${member.guild.name}\` sunucusuna davet edildi.` });
            setTimeout(() => {
                botAddMessage.delete().catch(console.error);
            }, 10000); 
            return;
        }

        const regularJoinMessage = await channel.send({ content: `${member.guild.emojiGöster(emojiler.Onay)} ${member} üyesi sunucumuza <t:${Math.floor(Date.now() / 1000)}:R> katıldı!` });
        setTimeout(() => {
            regularJoinMessage.delete().catch(console.error);
        }, 10000); 

        // Kullanıcının sunucuya katılmasından 7 saniye sonra belirtilen kanala etiketlenmesi
        setTimeout(async () => {
            const welcomeMessage = await channel.send({ content: `${member}, sunucuya hoş geldin!` }).catch(console.error);
            setTimeout(() => {
                welcomeMessage.delete().catch(console.error);
            }, 3000); // 10 saniye sonra mesajı siler
        }, 5000); 

    } catch (err) {
        console.error('Error:', err);
    }
};

module.exports.config = {
    Event: "guildMemberAdd"
};
