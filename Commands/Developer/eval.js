const { CommandInteraction, Client,ApplicationCommandType, ApplicationCommandOptionType  } = require("discord.js");
const { Colors } = require('discord.js');
const Discord = require('discord.js')
const Developer = require('../../Validation/source').owner
module.exports = {
    name: "eval",
    description: "EVAL",
    options: [
        {
            name: "code",
            description: "Write Eval Code.",
            type:ApplicationCommandOptionType.String,
            required: true
        }
    ],

    
    execute(interaction, client) {
        if (!Developer.includes(interaction.user.id)) return
        let shutdown = new Discord.EmbedBuilder().setAuthor({name: interaction.user.username, iconURL:interaction.user.displayAvatarURL()}).setTitle("오류").setDescription('잘못된 클라이언트 종료 방식입니다.').setColor(0xff0000)
        let text = interaction.options.getString("code")
        if(text === "") return interaction.reply("실행할 구문을 적어주세요")
        
        if (text.indexOf("exit") != -1 && text.indexOf("process") != -1) {
            return interaction.reply({embeds: [shutdown]})
            } else {
                const result = new Promise((resolve) => resolve(eval(text)))
                return result
                .then((output) => {
                    if (typeof output !== "string")
                        output = require("util").inspect(output, {
                        depth: 0,
                    })
                
                    if (output.includes(client.token)) output = output.replace(client.token, "토큰")
                    if (output.length > 1010) output = output.slice(0, 1010) + "\n..."
                
                    let embed = new Discord.EmbedBuilder().setColor(0x00ff00).setTitle('EVAL!').addField([
                        {
                            name:'📥ㅣINPUT',
                            value:```\`\`\`js\n${text}\n\`\`\``
                        },{
                            name:'📤ㅣOUTPUT',
                            value:```\`\`\`js\n${output}\n\`\`\``
                        }
                    ])//.addField(name:'📥ㅣINPUT', `\`\`\`js\n${text}\n\`\`\``).addField('📤ㅣOUTPUT', `\`\`\`js\n${output}\n\`\`\``)
                    interaction.reply({ embeds: [embed] })
                })
                .catch((error) => {
                    error = error.toString()
                    error = error.replace(client.token, "토큰")
    
                    if (error.includes(client.token)) error = error.replace(client.token, "토큰")
                
                    let embed = new Discord.EmbedBuilder().setTitle("Error!").setDescription(error).setColor(0xff0000)
                    interaction.reply({ embeds: [embed] })
                })
            }
    }
}