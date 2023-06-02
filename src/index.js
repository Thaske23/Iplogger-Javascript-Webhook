const {Discord, WebhookClient} = require('discord.js');
const express = require('express');
const app = express();
require('dotenv').config();

const hook = new WebhookClient({url: process.env.WEBHOOK_URL})

app.listen(3000, () => {
	console.log("Listening in 3000");
})

const date = new Date();
const datestr = date.toDateString();
const time = date.toLocaleTimeString();

const iplogger = function(req, res, next) {

	let datetimestr = "("+datestr+"/"+time+")"

	fetch('https://api64.ipify.org?format=json')
	.then(response => response.json())
	.then(data => hook.send({
		content: datetimestr + " New ip address detected: " + JSON.stringify(data.ip),
		username: 'Fri Jun',
		avatarURL: 'https://media.discordapp.net/attachments/1112913991971381249/1113927099649101934/732fdad313e46d189624b550e6cda2da.jpg'
	}));

	next();
}

app.use(iplogger)

app.get("/", function(req, res){
	res.sendFile(__dirname + '/public/index.html')
})