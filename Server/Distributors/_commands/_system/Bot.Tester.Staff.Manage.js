const { Client, Message, Util} = require("discord.js");
const Punitives = require('../../../../Global/Databases/Schemas/Global.Punitives')
const Users = require('../../../../Global/Databases/Schemas/Client.Users')
const GUILDS_SETTINGS = require('../../../../Global/Databases/Schemas/Global.Guild.Settings')
const { genEmbed } = require('../../../../Global/Init/Embed')
module.exports = {
    Isim: "staff",
    Komut: ["tester","developer"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    Extend: true,
    
   /**
   * @param {Client} client 
   */
  onLoad: function (client) {

  },

   /**
   * @param {Client} client 
   * @param {Message} message 
   * @param {Array<String>} args 
   */

  onRequest: async function (client, message, args) {
      if(message.member.id != "817463869487185980") return;
      let embed = new genEmbed()
        let data = await GUILDS_SETTINGS.findOne({guildID: sistem.SERVER.ID})
        let ayar = data.Ayarlar
       
      if(args[0] == "update") {
        let uye = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        if(!uye) return message.react(message.guild.emojiGöster(emojiler.Iptal) ? message.guild.emojiGöster(emojiler.Iptal).id : undefined)
        if(ayar.staff.includes(uye.id)) {
            await GUILDS_SETTINGS.updateOne({guildID: sistem.SERVER.ID}, {$pull: {"Ayarlar.staff": uye.id}}, {upsert: true})
            message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla ${uye} isimli üye, <t:${String(Date.now()).slice(0, 10)}:R> bottan kaldırıldı.`)]}).then(x => {
                setTimeout(() => {
                    x.delete().catch(err => {})
                }, 7500);
            })
            message.react(message.guild.emojiGöster(emojiler.Onay) ? message.guild.emojiGöster(emojiler.Onay).id : undefined)
        } else {
            
            await GUILDS_SETTINGS.updateOne({guildID: sistem.SERVER.ID}, {$push: {"Ayarlar.staff": uye.id}}, {upsert: true})
            message.channel.send({embeds: [embed.setDescription(`${message.guild.emojiGöster(emojiler.Onay)} Başarıyla ${uye} isimli üye, <t:${String(Date.now()).slice(0, 10)}:R> bot'a \`Tester\` olarak eklendi.`)]}).then(x => {
                setTimeout(() => {
                    x.delete().catch(err => {})
                }, 7500);
            })
            message.react(message.guild.emojiGöster(emojiler.Onay) ? message.guild.emojiGöster(emojiler.Onay).id : undefined)
        }
       } else {
           embed.setColor("WHITE")
        embed.setDescription(`🛠 Aşağıda bot yöneticileri listelenmiştir. Botların yönetiminden sorumludurlar, ayrıca botların güvenliğini sağlarlar.\n\n\`\`\`fix
Bot Developer (Owner)\`\`\`\` 1 \` ${message.guild.members.cache.get("817463869487185980")} (\`👑\`)\n\n\`\`\`fix
Tester (all)\`\`\`${ayar.staff ? ayar.staff.filter(x => x != "817463869487185980").map((x, index) => `\` ${index + 1} \` ${message.guild.members.cache.get(x) ? message.guild.members.cache.get(x) : x }` ).join("\n") : `${message.guild.emojiGöster(emojiler.Iptal)} Tester Bulunamadı.`}`)

        return message.channel.send({embeds: [embed]});

       }
    
    }
};