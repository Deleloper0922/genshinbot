const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "인증",
    description: "서버의 입장을 위해 인증을 합니다",
    permissions: "ADMINISTRATOR",
    options:[
        {
            name:"이름",
            description:"본인의 이름을 적어주세요",
            type: "STRING",
            required: true
        },{
            name:"학번",
            description:"본인의 학번(9자)을 적어주세요",
            type: "STRING",
            required: true
        },{
            name:"성별",
            description:"설별을 선택해주세요",
            type: "STRING",
            required: true,
            choices:[
                {
                    name:"남자",
                    value:"male"
                },{
                    name:"여자",
                    value:"female"
                }
            ],
        }
    ],
    execute(interaction) {
        const { channel, options } = interaction;
        const name = interaction.options.getString("이름");
        const stdID = interaction.options.getString("학번");
        const gender = interaction.options.getString("성별");
        interaction.member.setNickname(name);
        if(stdID.length!== 9){
            interaction.reply("본인의 9자 학번을 적어주세요");
            return 0;
        }else{
            grade_num = stdID.slice(2,4);
            class_num = stdID.slice(4,6);
            roleID = null;
            switch(grade_num){
                case "18":
                    roleID = "959446790791364608"
                    break;
                case "19":
                    roleID = "959446790791364608"
                    break;
                case "20":
                    roleID = "959446861134049371"
                    break;

                case "21":
                    roleID = "959446888527069234"
                    break;
                case "22":
                    roleID = "959434748642623528"
                    break;
                case "23":
                    roleID = "959446924237344861"
                    break;
                default:
                    break;
            }
            if(roleID!==null) {
                grade_role = interaction.guild.roles.cache.get(roleID);
                interaction.member.roles.add(grade_role);
            }else {
                interaction.reply("제대로 된 학번을 적어주세요");
                return 0;
            }

            if(class_num!=="21") 
            {interaction.reply("소프트웨어학과 학생이 아니면 들어올 수 없습니다");
            return 0;
        }
            roleID = null;
            switch(gender){
                case "male":
                    roleID = "959441578919878656"
                    break;
                case "female":
                    roleID = "959441608418406410"
                    break;
                default:
                    break;
            }
            if(roleID!==null) {
                gender_role = interaction.guild.roles.cache.get(roleID);
                interaction.member.roles.add(gender_role);
            }
            interaction.member.roles.add(interaction.guild.roles.cache.get("959454997505011743"))
            interaction.reply("인증이 완료되었습니다");
            return 0;
        }
    }
}