const { CommandInteraction } = require("discord.js");
const request = require('request');
const axios = require("axios");
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const getData = require('../Validation/source').getData;
const worldRole = require('../Validation/source').worldRole;
const serverRole = require('../Validation/source').serverRole;
module.exports = {
    name: "정보",
    description: "유저의 인게임 정보를 가져옵니다",
    //permissions: "ADMINISTRATOR",
    options:[
        {
            name:"uid",
            description:"uid를 입력해주세요",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    async execute(interaction) {
        const { channel, options } = interaction;
        const uid = interaction.options.getString("uid");

        axios.get(`https://enka.network/u/${uid}/__data.json`)
            .then((res)=>{
                if(res.data.showAvatarInfoList===undefined){
                    errEmbed = {
                        color : 0xff0000,
                        title : `오류 발생!!`,
                        description:`ESC => <:edit:1044999188011810846> => 프로필 설정 캐릭터 상세정보 보기 ON => 캐릭터 진열장 채우기`,
                        image:{
                            url:'https://media.discordapp.net/attachments/863398345635266580/1045001607554793472/howto.png?width=1111&height=671'
                        }
                    }
                    interaction.reply({embeds:[errEmbed]});
                }
            })














        /*if(uid === NULL){
            interaction.member.roles.add(interaction.guild.roles.cache.get('887874562006589470'));
            interaction.member.setNickname(`${interaction.member.name} | 미인증`,(err)=>{console.log(err)});
        }
        else{
            getData(uid).then((data)=>{
                nickname = data[0];
                level = data[1];
                worldlevel = data[2];
                server = data[3];
                console.log(worldlevel)
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

        }*/
    }
}