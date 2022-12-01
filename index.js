const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const token = require("./config.js").token;
client.commands = new Collection()

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

var http = require('http');  

http.createServer(function (req, res) {   
  res.write("I'm alive");   
  res.end(); 
}).listen(8080);

client.login(token)