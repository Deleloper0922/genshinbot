const { CommandInteraction, SelectMenuOptionBuilder } = require("discord.js");
const request = require('request');
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const getData = require('../../Validation/source').getData;
const worldRole = require('../../Validation/source').worldRole;
const serverRole = require('../../Validation/source').serverRole;
module.exports = {
    name: "인증",
    description: "서버의 입장을 위해 인증을 합니다",
    //permissions: "ADMINISTRATOR",
    options:[
        {
            name:"uid",
            description:"uid를 입력해주세요",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(interaction) {
        const { channel, options } = interaction;
        const uid = interaction.options.getString("uid");
        if(1){
            getData(uid)
            .then(async function(data){
                if(data[0]===-1){
                    throw new Error(`API Error : 정확한  UID를 적어주세요`);
                }
                nickname = data[0];
                level = data[1];
                worldlevel = data[2];
                server = data[3];

                interaction.member.setNickname(`${nickname} | ${level} | ${uid}`).catch((err)=>{console.log(err)});

                worldR = interaction.guild.roles.cache.get(worldRole[worldlevel]);
                serverR = interaction.guild.roles.cache.get(eval(`serverRole.${server}`));
                
                interaction.member.roles.add(interaction.guild.roles.cache.get('887874562006589470')).catch((err)=>{console.log(err)});
                interaction.member.roles.add(worldR).catch((err)=>{console.log(err)});
                interaction.member.roles.add(serverR).catch((err)=>{console.log(err)});

                interaction.reply({content:`인증되었습니다`,ephemeral:true});
                interaction.guild.channels.cache.get('998614523978199161').send(`${interaction.member} 님 어서오세요 원붕이의 원신생활에 잘오셨어요!
<:47:1005042460877144075> <#1028972906685927424>는 저희 서버의 중요 공지가 여기서 올라와요 새로운 공지가 올라오면 꼭 확인해주세요
<:48:1005042463360167947> <#940226351540088904> 는 고정된 메세지에 있는 양식을 복사해서 자신을 소개해주세요!
<:49:1005042466250043402> <#888429019085807676> 에서 역할을 아직 안받으셨으면 받고 싶은 역할을 꼭 받아주세요! 
<:50:1005042469022478467> 원붕이의 원신생활에서 즐거운 활동 되세요!
모두 환영해주세요`);
            
                
            })
            .catch((err)=>{
                errEmbed = {
                    color:0xff0000,
                    title : "오류 발생",
                    description : `${err}`
                }
                interaction.reply({content:`다시 시도해주세요\n계속 문제가 발생시 관리자를 멘션해주세요(@관리자)`,embeds:[errEmbed],ephemeral:true});
            })

        }
    }
}