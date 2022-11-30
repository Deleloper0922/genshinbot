const { CommandInteraction } = require("discord.js");
const request = require('request');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const getData = require('../../Validation/source').getData;
const worldRole = require('../../Validation/source').worldRole;
const serverRole = require('../../Validation/source').serverRole;
module.exports = {
    name: "업데이트",
    description: "자신의 정보를 업데이트 합니다",

    async execute(interaction) {
        const { channel, options } = interaction;
        nickArray = interaction.member.nickname.split(' | ')
        if(nickArray.length === 3){
            uid = nickArray[2];
            getData(uid).then((data)=>{
                nickname = data[0];
                level = data[1];
                worldlevel = data[2];
                server = data[3];
                worldR = interaction.guild.roles.cache.get(eval(`worldRole[${worldlevel}]`));
                for(i=0;i<=8;i++){
                    if(eval(`worldRole[${worldlevel}]`)===worldRole[i]){
                        continue;
                    }
                    interaction.member.roles.remove(interaction.guild.roles.cache.get(worldRole[i]))
                }
                //console.log(eval(`worldRole[${worldlevel}-1]`))
                interaction.member.roles.add(worldR);
                interaction.member.setNickname(`${nickname} | ${level} | ${uid}`).catch((err)=>{console.log(err)});
                interaction.reply(`업데이트 되었습니다`);
                
            })
        }else{
            interaction.reply('업데이트가 불가능 합니다')
        }
    }
}