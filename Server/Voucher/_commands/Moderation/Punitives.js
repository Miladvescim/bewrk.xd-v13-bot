const Punitives = require('../../../../Global/Databases/Schemas/Global.Punitives');
const table = require('table')

module.exports = {
    Isim: "cezalar",
    Komut: ["sicil"],
    Kullanim: "cezalar <@KyLockz/ID>",
    Aciklama: "Belirlenen üyenin bütün ceza verisini gösterir.",
    Kategori: "diğer",
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
    let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || await client.getUser(args[0]) || message.member;
    if(!uye) return message.reply(cevaplar.üye).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    await Punitives.find({Member: uye.id}).exec(async (err, res) => {
        if(err) return message.reply('Hata: `Bazı hatalar oluştu :(`').then(x => x.delete({timeout: 5000}));
        if(!await Punitives.findOne({Member: uye.id})) return message.reply(`${uye} üyesinin ceza-i bilgilerine ulaşılamadı.`).then(x => setTimeout(() => {x.delete()}, 7500));;
        let data = [["ID", "🔵", "Ceza Tarihi", "Ceza Türü", "Ceza Sebebi"]];
        data = data.concat(res.map(value => {          
            return [
                `#${value.No}`,
                `${value.Active == true ? "✅" : "❌"}`,
                `${tarihsel(value.Date)}`,
                `${value.Type}`,
                `${value.Reason}`
            ]
        }));
        let veriler = table.table(data, {
           columns: { 0: { paddingLeft: 1 }, 1: { paddingLeft: 1 }, 2: { paddingLeft: 1 }, 3: { paddingLeft: 1, paddingRight: 1 }, },
           border : table.getBorderCharacters(`void`),  
           drawHorizontalLine: function (index, size) {
               return index === 0 || index === 1 || index === size;
           }
        });
        message.channel.send(`:no_entry_sign: <@${uye.id}> üyesinin ceza bilgileri aşağıda belirtilmiştir. Tekli bir cezaya bakmak için \`.ceza ID\` komutunu uygulayınız.\n\`\`\`${veriler}\`\`\``).then(x => {
            setTimeout(() => {
                x.delete()
            }, 60000);
        }).catch(kylockz => {
            message.channel.send({content: `:no_entry_sign: <@${uye.id}> üyesinin cezaları **Discord API** sınırını geçtiği için metin belgesi hazırlayıp gönderdim, oradan cezaları kontrol edebilirsin.\nTekli bir cezaya bakmak için \`.ceza bilgi ID\` komutunu uygulayınız.`,     files: [{
                attachment: Buffer.from(veriler),
                name: `${uye.id}-cezalar.txt`
            }]}); 
        });
    })
    }
};