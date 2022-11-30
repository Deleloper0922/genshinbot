const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767});
const { token } = require("./config.json");
const sqlite3 = require("sqlite3").verbose();
client.commands = new Collection()

require("./Handlers/Events")(client);
require("./Handlers/Commands")(client);

client.login(token)