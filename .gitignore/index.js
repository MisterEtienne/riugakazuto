const discord = require('discord.js');
const bot = new discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('databasejson');
const db = low(adapter);

db.defaults({histoires: [], xp: []}).write()

var prefix = ("%")
var setGame = ("")

bot.on('ready', function() {
    bot.user.setGame('%help')
    console.log("Connected");
});

bot.login(process.env.TOKEN);

 bot.on("guildMemberAdd", member => {
    let role = member.guild.roles.find("name", "👤[Nouveau/elle]👤");
     member.guild.channels.find("name", "général").send(` :smiley:  ${member.user.username} Bienvenue dans le serveur :smiley: `)
    member.addRole(role)
})
    
bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "💖accueil💗").send(` :slight_frown: ${member.user.username} nous a quitté :slight_frown: RIP`)
})

bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if(message.content.startsWith(prefix + "creat")){
        message.delete()
    message.guild.createChannel('sondage', 'text')
  .then(console.log)
  .catch(console.error);
    message.guild.createRole({
    name: 'Nouveau',
    color: 'YELLOW',
  })
    .then(role => console.log(`Created new role with name ${role.name} and color ${role.color}`))
    .catch(console.error)
    }

    if(message.content.startsWith(prefix + "info")){
        message.delete()
    var embed = new discord.RichEmbed()
        .setDescription("Imformation sur le Serveur")
        .addField("Nom du Serveur", message.guild.name)
        .addField("Créé le", message.guild.createdAt)
        .addField("Tu as rejoin le", message.guild.joinedAt)
        .addField("Utilisateurs sur le Serveur", message.guild.createdAt)
        .setColor("0x0000FF")
    message.channel.sendEmbed(embed)
    }

    if(message.content.startsWith(prefix + "sondage")){
        message.delete()
        let args = message.content.split(" ").slice(1);
        let thingToEcho = args.join(" ")
        var embed = new discord.RichEmbed()
        .setDescription("Sondage")
        .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
        .setColor("0x840404")
    message.guild.channels.find("name", "sondage").sendEmbed(embed)
    .then(function (message){
        message.react("✅")
        message.react("❌")
    }).catch(function(){
    });
    }
   
    if(message.content.startsWith(prefix + "setgame")){
        let game = message.content.split(` `).slice(1);
        message.delete()
        if (!game){
        game = null;
         }
        if(message.author.id == "339131189791031297" || message.author.id == "440063149274562570"){
        bot.user.setGame('' + game + '')
        message.channel.send("Game changé !")
        }else{
        return message.reply(":comet: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut.");
        }
        }

        if(message.content.startsWith(prefix + "say")){
            let args = message.content.split(``).slice(1);
            message.delete()
            if (!args){
            args = null;
             }
            if(message.author.id == "339131189791031297" || message.author.id == "440063149274562570"){
          
            message.channel.send(args.join( ``))
            }else{
            return message.reply(":comet: Vous n'avez pas la permission de faire cette commande. Seul mon créateur le peut");
            }
            }

    if (command === "kick"){
        message.delete()
        let modRole = message.guild.roles.find("name", "Test");
        if(!message.member.roles.has(modRole.id)){
            return message.reply("tu n'as la permission de faire cette commande.").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Merci de mentionner l'utilisateur à expulser.").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("Cet utilisateur est introuvable ou impossible à expulser.")
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")){
            return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
        }
        kickMember.kick().then(member =>{
            message.reply(`${member.user.username} a été expulsé avec succès.`).catch(console.error);


        }).catch(console.error);
    }

    if (command === "ban"){
        message.delete()
        let modRole = message.guild.roles.find("name", "Test");
        if(!message.member.roles.has(modRole.id)){
            return message.reply("Tu n'as pas la permission de faire cette commande.").catch(console.error);
        }
        const member = message.mentions.member.first();
        if (!member) return message.reply("Merci de mentionner l'utilisateur à bannir.");
        member.ban().then(member => {
            message.reply('${member.user.username} a été banni avec succés.').catch(console.error);
        }).catch(console.error);
    }


    if (message.content === prefix + "help"){
        message.delete()
        var embed = new discord.RichEmbed()
            .setTitle("Help Commande")
            .setDescription("Ceci est une aide pour ce bot")
            .addField("%help", "Page d'aide", true)
            .addField("%creat", "cela créé ce que le bot a besoin dans le discord (a faire une seule fois)", true)
            .addField("%info", "donne de info sur le serveur", true)
            .addField("%sondage ...", "créer un sondage rapide", true)
            .addField("%say ...", "Le bot répète ce que tu as écrit", true)
            .addField("%setgame ...", "met le setgame choisi au bot", true)
            .addField("%kick @nom de la personne", "expulse la personne mentionné", true)
            .addField("%ban @nom de la personne", "Ban la personne mentionné", true)
            .setColor("0xFF8000")
            .setFooter("Bonne continuation")
        message.channel.sendEmbed(embed);
    }
    
    
});  
