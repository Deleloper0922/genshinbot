const { CommandInteraction, Client,ApplicationCommandType, ApplicationCommandOptionType,EmbedBuilder} = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
    name: "guildMemberAdd",
    once: false,

    execute(member,client) {
        welcomeChannel = client.channels.cache.get("887647473886187530");
        embed = new EmbedBuilder()
        .setAuthor({name:member.user.tag,iconURL:member.user.avatarURL()})
        .setColor("#95A2D4")
        .setThumbnail(member.guild.iconURL())
        .setDescription(`\`\`${member.guild.name}\`\`에 오신걸 환영 합니다
\`\`\` \`\`\`
╭✦・원붕이님 반갑습니다
︱・서버를 이용하기 전에 간단한 절차를 진행할 예정입니다
︱・<#888221310067548161>에 적힌 규칙을 읽습니다
︱・이후  개인정보 설정을 진행해주세요
︱・모두 확인 후 인증 절차를 진행해주세요
╰✦・<#888429019085807676> 에서 원하는 역할을 부여받아주세요
\`\`\` \`\`\``)
        welcomeChannel.send({content:`${member}`,embeds:[embed]});
    }
}