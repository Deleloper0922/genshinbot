const { Client } = require("discord.js")
const mongoose = require("mongoose");

module.exports = {
    name: "ready",
    once: true,
    /**
     * 
     * @param {Client} client
     */
    execute(client) {
        console.log("The client is now ready!")
        client.user.setActivity("Genshin Impact", {type:0})

        /*if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to the database!")
        }).catch((err) => {
            console.log(err)
        });*/
    }
}