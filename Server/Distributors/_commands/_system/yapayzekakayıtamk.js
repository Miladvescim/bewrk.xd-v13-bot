const { Client, MessageActionRow, MessageButton, MessageEmbed, Permissions } = require("discord.js");
const fetch = require('node-fetch');


const ALLOWED_ROLE_ID = '1233653169448550442'; // kayıtsızrolünün ıdd amcıkkk
const EXCLUDED_ROLE_ID = '1162695189308133506'; // Booster rolününnünn ıdd amkk malıı 
const WELCOME_CHANNEL_ID = '1196080810881724488'; // Hoşgeldin mesajı gönderilecek kanalınn ıdd ilerde setuba dahil edilecek merak etmek yarrak kafgasıı 

module.exports = {
    Isim: "otokayıt",
    Komut: ["otokayıt", "yarrakkayit", "yarrakkayıt"],
    Kullanim: "otokayıt",
    Aciklama: "Belirli bir roldeki kullanıcıların kayıt olmasını sağlar.",
    Kategori: "genel",
    Extend: true,

    onLoad: function (client) {
        console.log(`${this.Isim} komutu yüklendi!`);
    },

    onRequest: async function (client, message, args) {
        if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
            return message.reply('Bu komutu kullanmak için yönetici iznine sahip olmalısınız.');
        }

        const embed = new MessageEmbed()
            .setTitle('Created By Bewrk.xd')
            .setDescription('Aşağıdaki düğmeye tıklayarak Diğer Sunucudaki Bilgileriniz Bulunursa Hızlıca kayıt olabilirsiniz.')
            .setColor('#3498db');

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('otokayit_btn')
                    .setLabel('Kayıt Olmak İçin Tıklaa')
                    .setEmoji("1233163012249223229")
                    .setStyle('SUCCESS')
            );

        await message.reply({
            content: '<a:rubyBit:1129491565077864520> Yapayzeka Kayıt Kanalına Hoş Geldin. <a:rubyBit:1129491565077864520>',
            embeds: [embed],
            components: [row]
        });
    }
};

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton() || interaction.customId !== 'otokayit_btn') return;

    if (!interaction.member.roles.cache.has(ALLOWED_ROLE_ID)) {
        return await interaction.reply({
            content: 'Zaten kayıtlısın ya Mall <:bewrkcik:1257910044616298516>.',
            ephemeral: true 
        });
    }

    await interaction.reply({
        content: 'Verileriniz çekiliyor, lütfen bekleyin...',
        ephemeral: true
    });

    try {
        const userId = interaction.user.id;
        const API_ENDPOINT = `https://discordpanel.vercel.app/api/user/${userId}`;

        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
            throw new Error(`API'den veri alınırken hata oluştu: HTTP status ${response.status}`);
        }
        const data = await response.json();

        if (!isValidUserData(data)) {
            throw new Error('API yanıtı beklenen verileri içermiyor.');
        }

        const specialSymbol = "❤️";
        let displayName;

        if (data.TopName.includes(specialSymbol)) {
            displayName = `${specialSymbol} ${data.TopName} | ${data.TopAge}`;
        } else {
            displayName = `• ${data.TopName} | ${data.TopAge}`;
        }

        let roleIDsToAdd = [];
        let roleIDsToRemove = [];

        if (data.TopSex.toLowerCase() === 'erkek') {
            roleIDsToAdd = ['1257467760120954982', '1257467773832134686'];
            roleIDsToRemove = ['1257469215657693344', '1257468543847370773'];
        } else if (data.TopSex.toLowerCase() === 'kadin') {
            roleIDsToAdd = ['1257469215657693344', '1257468543847370773'];
            roleIDsToRemove = ['1257467760120954982', '1257467773832134686'];
        } else {
            throw new Error('Kullanıcının cinsiyeti belirtilmedi veya geçerli değil.');
        }

        const guild = interaction.guild;
        const member = await guild.members.fetch(userId);
        const currentRoles = member.roles.cache.map(role => role.id);

       
        const rolesToRemove = currentRoles.filter(roleId => roleId !== EXCLUDED_ROLE_ID && !roleIDsToAdd.includes(roleId));
        await member.roles.remove(rolesToRemove);
        await member.roles.add(roleIDsToAdd);
        await member.setNickname(displayName);

        await interaction.followUp({
            content: `${displayName} olarak kaydedildiniz.`,
            ephemeral: true 
        });

        // siko sokıoooo hosgeldinnn mesajıı
        const welcomeChannel = guild.channels.cache.get(WELCOME_CHANNEL_ID);
        if (welcomeChannel) {
            const welcomeMessage = await welcomeChannel.send(`${member}, Sunucumuza YapayZeka İle Kayıt Oldun İçin Teşekkür Ederiz! Umarım burada keyifli vakit geçirirsin! <:Respect:1258432824508416094>`);
          
        }
    } catch (error) {
        console.error('Kayıt işlemi sırasında bir hata oluştu:', error.message);

        if (error.message.includes('API yanıtı beklenen verileri içermiyor') || error.message.includes('Kullanıcının cinsiyeti belirtilmedi veya geçerli değil')) {
            await interaction.followUp({
                content: 'Verileriniz bulunamadı veya eksik. Lütfen yetkililerle iletişime geçin. <a:rubyBit:1129491565077864520>',
                ephemeral: true 
            });
        } else {
            await interaction.followUp({
                content: 'Kayıt işlemi sırasında bir hata oluştu. Lütfen daha sonra tekrar deneyin.',
                ephemeral: true 
            });
        }
    }
});

function isValidUserData(data) {
    return data && data.TopName && data.TopAge && data.TopSex;
}
