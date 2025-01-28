const { Client, Message} = require("discord.js");

module.exports = {
    Isim: "emojikur",
    Komut: ["emkur"],
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
    const emojis = [

            // Penal & Require
        { name: "kylockz_Onay", url: "https://cdn.discordapp.com/emojis/1169088612894261338.gif" },
        { name: "kylockz_Iptal", url: "https://cdn.discordapp.com/emojis/1185601926126108694.gif" },

        { name: "chatMute", url: "https://cdn.discordapp.com/emojis/1172236898266259516.webp?size=96&quality=lossless"},
        { name: "mavibas", url: "https://cdn.discordapp.com/emojis/1166539356253736990.gif"},
        { name: "maviorta", url: "https://cdn.discordapp.com/emojis/1166539357805609112.gif?size=96&quality=lossless" },
        { name: "mavison", url: "https://cdn.discordapp.com/emojis/1166539360167022603.gif?size=96&quality=lossless" },
        { name: "yesilbas", url: "https://cdn.discordapp.com/emojis/1166541233297031170.gif?size=96&quality=lossless" },
        { name: "yesilorta", url: "https://cdn.discordapp.com/emojis/971176312104427571.gif?size=96&quality=lossless" },
        { name: "yesilson", url: "https://cdn.discordapp.com/emojis/971176305334833194.gif?size=96&quality=lossless" },
        { name: "turkuazbas", url: "https://cdn.discordapp.com/emojis/1166539375312633896.gif?size=96&quality=lossless" },
        { name: "turkuazorta", url: "https://cdn.discordapp.com/emojis/1166539377770512417.gif?size=96&quality=lossless" },
        { name: "turkuazson", url: "https://cdn.discordapp.com/emojis/1166541206973583480.gif?size=96&quality=lossless" },
        { name: "redbas", url: "https://cdn.discordapp.com/emojis/1166539361957978222.gif?size=96&quality=lossless" },
        { name: "redorta", url: "https://cdn.discordapp.com/emojis/1166539363434381342.gif?size=96&quality=lossless" },
        { name: "redson", url: "https://cdn.discordapp.com/emojis/1166539365825126540.gif?size=96&quality=lossless" },
        { name: "saribas", url: "https://cdn.discordapp.com/emojis/1166263060189687848.gif?size=96&quality=lossless" },
        { name: "sariorta", url: "https://cdn.discordapp.com/emojis/1166263207590105159.gif?size=96&quality=lossless" },
        { name: "sarison", url: "https://cdn.discordapp.com/emojis/1166539372330496000.gif?size=96&quality=lossless" },
        { name: "kylockzdev", url: "https://cdn.discordapp.com/emojis/1175069659150692362.gif?size=44&quality=lossless"},
        { name: "a_rich", url: "https://cdn.discordapp.com/emojis/1100928500535414814.gif?size=44&quality=lossless"},
       
       
            // Task
        
      ];
  
      const numEmojis = [
      
      ];
  
      emojis.forEach(async (x) => {
        if (message.guild.emojis.cache.find((e) => x.name === e.name)) return;
        const emoji = await message.guild.emojis.create(x.url, x.name);
        message.channel.send(`\`${x.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`);
      });

    }
};