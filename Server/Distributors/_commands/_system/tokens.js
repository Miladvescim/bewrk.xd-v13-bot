const { Client, Message} = Discord = require("discord.js");
const children = require("child_process");

module.exports = {
    Isim: "token-restart",
    Komut: ["t-r","trest"],
    Kullanim: "",
    Aciklama: "",
    Kategori: "-",
    
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
    let load = await message.reply({content: `Tokenler yeniden başlatılırken. Lütfen bekleyin.`})
    const ls = children.exec(`pm2 restart tokens`);
    ls.stdout.on('data', function (data) {
        load.edit({content: `Başarıyla  ses Tokenleri yeniden başlatıldı. ${message.guild.emojiGöster(emojiler.Onay)}`})
        .then(x => {
          message.react(message.guild.emojiGöster(emojiler.Onay) ? message.guild.emojiGöster(emojiler.Onay).id : undefined).catch(err => {})
          setTimeout(() => {
            x.delete().catch(err => {

            })
          }, 7500);  
        })
    });
    }
};