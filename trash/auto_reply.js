
module.exports = {
    name: "messageCreate",
    once: false,
    execute(message, client) {
        if(message.mentions.members){
            message.mentions.members.forEach(member => {
                if(member.id === '801776768402718751' && !message.author.bot){
                    message.reply(`원붕이 자동 응답기 입니다
지금은 해당 관리자가 자리에 없습니다
다른 관리자를 통해 해결해주세요`)
        }
            });
                
            }
    
    
    }

}
