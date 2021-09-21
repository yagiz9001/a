const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const { MessageEmbed } = require('discord.js')

var prefix = ayarlar.prefix;

const embed = new MessageEmbed()
.setTitle('Yardım Menüsü')
.addField('Moderator Komutu:' , 'p!at p!oylama p!yasakla')
.addField('eylence komutu:' , 'yaz bir şey , kedi , sa ,p!çal (URL)')


client.on('message' , msg => {
  if (msg.content === 'p!yardım')
  msg.delete()
  msg.channel.send(embed);
  msg.delete()
})

client.on('ready', () => {
  console.log(`botun olan ${client.user.tag} sunucuya giriş yaptı ve artık aktif!`);
});
client.on('guildMemberAdd', member => {
  const girişçıkış = member.guild.channels.cache.find(channel => channel.name === 'gelen-giden');
  girişçıkış.send(`aramıza hoş geldin, ${member}`);
});
client.on('message' , message => {
  if (message.content.startsWith('p!oylama')) {
    const args = message.content.split(' ').slice(1)
    const botmesajı = args.join(" ")
    if (!message.member.hasPermission('MANAGEMESSAGES')) return message.reply('oylama yapmak için admin rolüne sahip değlsin.');
    if(!botmesajı) return message.reply('oylamanın ne olacağını yazmadın.');
    message.delete(message.author)
    const embed = new MessageEmbed()
    .setTitle('OYLAMA')
    .setDescription(botmesajı)
    .setFooter('PHANTOM MOD');
    message.channel.send({ embed: embed }).then( embedMessage => {
      embedMessage.react("✔️")
      embedMessage.react("❌");
    })
  }
})
client.on('message', async message => {
  if (message.content.startsWith('p!çal')) {
    const args = message.content.split(' ').slice(1)
    const botmesajı = args.join(" ")
    if (!botmesajı) return message.reply('URL koymadan nasıl şarkı dinlemeyi düşünüyorsun? <:pog:837971229968433163>')
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join()
      const ytdl = require('ytdl-core')
      connection.play(ytdl(`${botmesajı}` , {filter: 'audioonly'}))
    } else {
message.reply('bir sesli kanala katıl.');

    }
  }
})
client.on('message', msg => {
  if (msg.content.toLowerCase() === 'yaz bir şey') {
    msg.reply('yazdım <a:amoungus:838068057993248788>!');
  }
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('aleyküm selam hoş geldin');
  }
  if (msg.content.toLowerCase() === prefix + 'kedi') {
    msg.channel.send('https://ichef.bbci.co.uk/news/640/cpsprodpb/16FA9/production/_92712149_gettyimages-480164327.jpg');
  }
  client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('p!at')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
    message.delete()
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
          const log = message.guild.channels.cache.find(channel => channel.name === 'log-kanalı')
           log.send(`${user.tag} kişisi kicklenmiştir`);
           message.delete()
          })
          .catch(err => {
            message.reply('Bunu yapamam.');
            message.delete()
            console.error(err);
          });
      } else {
        message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
        message.delete()
      }
    } else {
      message.reply("Atılacak kişiyi yazmadın");
      message.delete()
    }
  }
});
client.on('message', message => {
  if (!message.guild) return;
if (message.content.startsWith('p!yasakla')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
          const log = message.guild.channels.cache.find(channel => channel.name === 'log-kanalı')
           log.send(`${user.tag} kişisi banlanmıştır.`);
           message.delete();
          })
          .catch(err => {
            message.reply('Bunu yapamam.');
            message.delete()
            console.error(err);
          });
      } else {
        message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
        message.delete()
      }
    } else {
      message.reply("Yasaklanacak kişiyi yazmadın.");
      message.delete()
    }
  }
});
});
client.login('ODM2OTg3NzM5NzY0ODE3OTQw.YIl_kw.zcxbkLerPk_VJmz5g5IyZ6BCdcU');
