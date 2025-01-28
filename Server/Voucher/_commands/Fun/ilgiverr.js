const { Client, Message, MessageActionRow, MessageSelectMenu, MessageEmbed } = require("discord.js");

let iltifatlar = [
    "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
    "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
    "Mucizelerden bahsediyordum. Tam o sırada gözlerin geldi aklıma.",
    "Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
    "Mavi gözlerin, gökyüzü oldu dünyamın.",
    "Seni gören kelebekler, narinliğin karşısında mest olur.",
    "Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.",
    "Sabah olmuş. Sen mi uyandın yoksa gönlüme güneş mi doğdu.",
    "Huzur kokuyor geçtiğin her yer.",
    "En güzel manzaramsın benim, seyretmeye doyamadığım.",
    "Sen benim düşlerimin surete bürünmüş halisin.",
    "Bir sahil kasabasının huzuru birikmiş yüzüne.",
    "Gülüşünde nice ilaçlar var yarama merhem olan.",
    "Gece nasıl sabahı bekliyorsa aydınlanmak için ben de seni öyle bekliyorum.",
    "Işığınla gecemi aydınlatıyorsun.",
    "Yağmurdan sonra açan gök kuşağı gibisin, öyle güzel ve özel!",
    "Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
    "Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.",
    "Seni kelimeler ile anlatmak çok zor. Muhteşem desem yine eksik kalıyor anlamın.",
    "Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.",
    "Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.",
    "Bu kadar muhteşem olamaz bir insan. Bu kadar kusursuz bu kadar mükemmel.. Kirpiklerinin dizilişi bile sırayla senin.",
    "Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
    "Senin güzelliğini anlatmaya dünyalar değil, lisanlar bile yetmez.",
    "Etkili gülüş kavramını ben senden öğrendim.",
    "Seni yanlışlıkla cennetten düşürmüşler. Dünyada yaşayan bir meleksin sen.",
    "Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.",
    "Gözlerinin gördüğü her yer benimdir. Bakışına şahit olan her toprak benim de vatanımdır.",
    "Gözlerinle baharı getirdin garip gönlüme.",
    "Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.",
    "Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.",
    "Seni de bu dünyada görünce yaşama sebebimi anladım. Meğer senmişsin beni dünyada yaşamaya zorlayan.",
    "Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.",
    "Sen benim yanımda olduğun sürece benim nerde olduğum hiç önemli değil .Kokunu aldığım her yer cennet bana.",
    "Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.",
    "Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.",
    "Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.",
    "Aynı zaman diliminde yaşamak benim için büyük ödüldür.",
    "Seninle aşkı yaşamak çok güzel bir şey ama sensiz kalma korkusunu düşünmek korkutuyor beni.",
    "Seni severek meslek sahibi oldum ben. Seni sevmeye başladıkça şair oldum.",
    "Gülüşün güzelliğine anlam katıyor. Gamzelerin ise bambaşka diyarların kapılarını açıyor.",
    "Senin gülüşünü gördüğüm günden beri ağlamalarımı unuttum.",
    "Kimse konuşmasın yalnız sen konuş bana. Yalnız sen bak gözlerimin içine. Kimse olmasın yalnızca sen ol benim hayatımda.",
    "Ben seninle birlikte yaşayabilmek için ikinci kere geldim hayata.",
    "Senin attığın adımlarda seni korumak için geçtiğin yol olmak isterdim. Seni emniyete alan ve sonsuz bir yolculuğa çıkaran bir yol.",
    "Aklıma sevmek geldiğinde, gözlerimin önüne sen geliyorsun. Günün her saati canım sevmek istiyor ve seni düşünüyor kalbim",
    // Diğer iltifatlar buraya eklenecek
];

module.exports = {
    Isim: "ilgiverr",
    Komut: ["ilgiverr"],
    Kullanim: "ilgiverr",
    Aciklama: "Bir üyenin coin bilgisini görüntüler.",
    Kategori: "eco",
    Extend: true,
    
    onRequest: async function (client, message, args) {
        const member = message.member; // Kullanıcıyı almak için message objesini kullanın

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('kurulumselect')
                    .setPlaceholder('İlgi/Süründür/Öp/Tokat')
                    .addOptions([
                        { 
                            label: "İlgi Ver!",
                            value: "ilgi",
                            description: "İlgi sevgi verir azıcıkdaa götünü kaldırır",  
                        },
                        { 
                            label: "Süründür!",
                            value: "süründür",
                            description: "İlgi vermez trip atarak süründürür",
                        },
                        { 
                            label: "Öp!",
                            value: "öp",
                            description: "Tatlışş bi öpücükk verir",
                        },
                        { 
                            label: "Tokat!",
                            value: "tokat",
                            description: "Koydun mu oturtur yerden yere vurursun.",
                        },
                        { 
                            label: "Kucağına Al",
                            value: "kucak",
                            description: "Kucağına alır sevişmeye başlar.",
                        },
                        { 
                            label: "Kapat",
                            description: "Menüyü kapatır.",
                            value: "closeMenu",
                        }
                    ])
            );

        const kylcokz = new MessageEmbed()
            .setDescription(`Birileri bişeyler mi yapmak istiyormuşş nE
            Heyy ${member} ${message.author} senden hoşlaşıyormuşşş gibi hissediyorum ben.
            
            Ayrıca aşağıdaki menüden istediğiniz diğer istekleri de uygulayabilirsiniz.`)
            .setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

        let msg = await message.channel.send({ embeds: [kylcokz], components : [row] });

        const filter = i => i.user.id == message.author.id;
        const collector = msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });

        collector.on("collect", async (interaction) => {
            if (interaction.values[0] == "ilgi") {
                const ilgi = new MessageEmbed().setDescription(`${member} **${iltifatlar[Math.floor(Math.random() * iltifatlar.length)]}**`);
                interaction.update({ embeds: [ilgi], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000));
            } else if (interaction.values[0] == "süründür") {
                const süründür = new MessageEmbed().setDescription(`${member} git konuşmuyom senlee, tripliyim sanaa burnun sürünsün biraz.`).setImage("https://cdn.discordapp.com/attachments/1196080656833318962/1258176403422183515/tenor_1.gif?ex=66871796&is=6685c616&hm=ab4e6848c04ce9309ccb624014adc5080f507e6812c38d194584e4600c7fb7a6&");
                interaction.update({ embeds: [süründür], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000));
            } else if (interaction.values[0] == "kucak") {
                const öp = new MessageEmbed().setDescription(`${member} kucağına aldı bacakları okşuyor mmmh`).setImage("https://cdn.discordapp.com/attachments/1196080656833318962/1258175257466900560/peach-cat-hug.gif?ex=66871685&is=6685c505&hm=4888d0aa8f8f6c0720df1bb117fe0da3d2a0aa6381ceeda613024cd3343470b4&");
                interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000));
            } else if (interaction.values[0] == "öp") {
                const öp = new MessageEmbed().setDescription(`${member} gell gell yaklaşş yanıma öpücüklere boğayım seni.`).setImage("https://cdn.discordapp.com/attachments/1196080656833318962/1258175802818826250/cat-cat-kiss.gif?ex=66871707&is=6685c587&hm=506e01fb62527fb2afa2f69d6fdc4b80377a31d8ded4e16e3bde80ecb4dc42ab&");
                interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000));
            } else if (interaction.values[0] == "tokat") {
                const öp = new MessageEmbed().setDescription(`${member} haaağğkkk puu Allahına kavuşturdumm.`).setImage("https://cdn.discordapp.com/attachments/1196080656833318962/1258175070191489165/tenor.gif?ex=66871658&is=6685c4d8&hm=cf46491ce92aec4254aae8fd112b5c9ed68c6760187e881dbca824a281a845b4&");
                interaction.update({ embeds: [öp], ephemeral: true }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000));
            } else if (interaction.values[0] == "closeMenu") {
                interaction.message.delete();
            }
        });
    }
};
