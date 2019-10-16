TopCaliber Ranked Bot
====================
This Discord Bot is created in order to maintain a crowd of people all wanting to play together. Due to the nature of the video game, only a certain number of players can play at once, therefore some must wait. This bot manages those people waiting and attempts to streamline them into joining with the group of people already playing once they are ready.<br/><br/>

Comands: <br/>
+me 			- Add yourself to the queue.<br/>
-me 			- Remove yourself from the queue.<br/>
-remove {user}	- Removes 'user' from the queue.<br/>
-next			- Removes first user and announces its their turn<br/>
-clear or ?view	- Clears the current queue<br/>
?list or ?view	- Displays the current queue.<br/>
<br/>
The bot will remove the commands, if typed correctly, in order to prevent spam. Also to reduce spam, the bot will show the current ranked queue after each command typed, but will then be automatically removed after 5 minutes.


Control of the bot
====================

node index.js - Start locally

- Server
	Use the following commands through SSH to start the bot: 
	Start and persist through SSH: node index.js > console_error.txt > console_output.txt &

	Look at active background processes: ps -ax | grep node
	Kill the process running in the background: kill -9 {ProcessNum}
		Obtain the {ProcessNum} after looking at the active background processes.
	Use "Exit" when finished, before closing console.


Installation
====================

How to get a token: https://www.writebots.com/discord-bot-token/
*If using this bot on your own, you will need to setup your own config.json of the format:*
{<br/>
	"prefix": "+",<br/>
	"token": *Censored*<br/>
}<br/>
