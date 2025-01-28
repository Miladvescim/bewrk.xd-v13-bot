const { Client, Message, MessageEmbed } = require("discord.js");
const fetch = require('node-fetch');

module.exports = {
    Isim: "sorgula",
    Komut: ["sorgula"],
    Kullanim: "sorgula <userId>",
    Aciklama: "Belirtilen kullanıcının bilgilerini API'den getirir.",
    Kategori: "teyit",
    Extend: true,

    /**
     * @param {Client} client 
     */
    onLoad: function (client) {
        console.log(`${this.Isim} komutu yüklendi!`);
        
    },

    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Array<String>} args 
     */
    onRequest: async function (client, message, args) {
        const API_ENDPOINT = 'https://discordpanel.vercel.app/api/user/';

        if (args.length !== 1) {
            return message.reply('Kullanım: .sorgula <userId>');
        }

        const userId = args[0];

        try {
            const response = await fetch(API_ENDPOINT + userId);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            console.log('Created By Bewrk.xd:', data);

            if (!isValidUserData(data)) {
                throw new Error('Created By Bewrk.xd is missing required fields');
            }

            const formattedData = {
                GuildStats: data.GuildStats.map(stat => ({
                    GuildName: stat.GuildName,
                    GuildID: stat.GuildID,
                    VoiceStat: stat.VoiceStat,
                    MessageStat: stat.MessageStat
                })),
                GuildStaff: data.GuildStaff.map(staff => ({
                    GuildName: staff.GuildName,
                    GuildId: staff.GuildId,
                    StaffStatus: staff.StaffStatus
                })),
                Guilds: data.Guilds.map(guild => ({
                    DisplayName: guild.displayName,
                    GuildName: guild.GuildName,
                    GuildId: guild.GuildId
                }))
            };

            // Send formatted data as an embed
            const embed = new MessageEmbed()
                .setTitle('Created By Bewrk.xd')
                .setDescription('```js\n' + JSON.stringify(formattedData, null, 2) + '\n```')
                .setColor('#ff9900');

            await message.channel.send({ embeds: [embed] });

        } catch (error) {
            console.error('API isteği sırasında bir hata oluştu:', error);
            await message.reply('Kullanıcı bilgileri alınırken bir hata oluştu.');
        }
    }
};

function isValidUserData(data) {
    const { UserData } = data;
    return UserData && UserData.UserName && UserData.UserGlobalName && UserData.UserdisplayAvatar;
}
