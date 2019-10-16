const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

var rankedList = []; // Array of ranked

client.login(token);
client.once('ready', () =>{
	console.log('Ready!');
})

/* Commands List
	+me 			- Add yourself to the queue.
	-me 			- Remove yourself from the queue.
	-remove {user}	- Removes 'user' from the queue.
	-next			- Removes first user and announces its their turn
	-clear or ?view	- Clears the current queue
	?list or ?view	- Displays the current queue.
	
	+add {user}		- Adds 'user' to the queue. *DISABLED*
*/

client.on('message', message =>{ 
	var messageContentUpper = message.content.toUpperCase(); // Used to provide non-case sensitive commands
	
	function showQueue(){
		message.channel.send(`=====Ranked List=====\n${rankedList.map((player,index) => `${index+1} - ${player.username}`).join('\n')}\n==================`).then((msg) => {
			msg.delete(30000);
			console.log("Queue list deleted.");
		});
		console.log("Queue list will be deleted in 5 minutes.");
	}

	// Add to queue
	if(messageContentUpper.startsWith(`${prefix}ME`) && !(rankedList.includes(message.author))){
		message.delete(); // Hide the command
		
		console.log(message.author.username + " joined queue.");
		message.channel.send(message.author + " joined the queue.");
		
		var temp = message.author;
		rankedList.push(temp);  // the array will dynamically grow
		
		// Show queue after adding
		showQueue();
	}
	else if (messageContentUpper.startsWith(`${prefix}ME`) && (rankedList.includes(message.author))){
		message.delete(); // Hide the commands
		message.channel.send(message.author.username + ", you are already in the queue...");
	}
	
	// Remove from queue
	if(messageContentUpper.startsWith(`-ME`) && (rankedList.includes(message.author))){
		message.delete(); // Hide the command
		
		console.log(message.author.username + " left the queue.");
		message.channel.send(message.author.username + " left the queue.");
		
		for( var i = 0; i < rankedList.length; i++){ 
			if ( rankedList[i] === message.author) {
				rankedList.splice(i, 1); 
				i--;
			}
		}
		
		// Show queue after removing
		showQueue();
	}
	else if (messageContentUpper.startsWith(`-ME`) && !(rankedList.includes(message.author))){
		message.delete(); // Hide the command
		message.channel.send(" You are not even in the queue yet...");
	}
	
	/*
	// Remove someone else from queue
	if(message.content.startsWith(`-remove`) && (rankedList.includes(message.mentions.members.first()))){
		let member = message.mentions.members.first();
		let memberTag = message.mentions.members.first().id;
		var found = false;
		
		// Search for the user
		for(var i = 0; i < rankedList.length; i++){
			console.log(i + " " + rankedList[i].username);
			if ((rankedList[i].username === member.username)){
				found = true;
				rankedList.splice(i, 1); 
				i--;
			}
		}
		
		message.channel.send(member.username + " removed from queue.");
		console.log(message.author.username + " removed " + member.username + " from queue.");
		
		// Show queue after removing
		message.channel.send(`=====Ranked List=====\n${rankedList.map((player,index) => `${index+1} - ${player.username}`).join('\n')}\n==================`);
	}
	else if (message.content.startsWith(`-remove`) && !(rankedList.includes(message.mentions.members.first()))){
		message.channel.send(message.mentions.members.first().username + " could not be found.");
		console.log(message.author.username + " attempted to remove " + message.mentions.members.first().username + " from queue, but couldn't be found.");
	} */
	
	
	// Add someone else to queue
	/*if(message.content.startsWith(`+add`) && !(rankedList.includes(message.mentions.members.first()))){
		let member = message.mentions.members.first();
		
		// Add the user if not already in queue
		if (rankedList.includes(member)){
			message.channel.send(member + " is already in the queue...");
		}
		else{
			rankedList.push(member);
			message.channel.send(member + " added to queue!");
			
			// Show queue after adding
			message.channel.send(`=====Ranked List=====\n${rankedList.map((player,index) => `${index+1} - ${player}`).join('\n')}\n==================`);
			console.log(message.author + " added " + member + " to the queue.");
		}
	}
	else if (message.content.startsWith(`+add`) && (rankedList.includes(message.mentions.members.first()))){
		message.channel.send(message.mentions.members.first() + " is already in the queue.");
		console.log(message.author + " attempted to add " + message.mentions.members.first() + " to queue, but is already in queue.");
	} */
	
	// Call next player
	if(messageContentUpper.startsWith(`-NEXT`) && !(rankedList.length < 1)){
		let member = rankedList[0];
		message.delete(); // Hide the command
		
		// Remove the user from the list
		for(var i = 0; i < rankedList.length; i++){ 
			if (rankedList[i] === member) {
				rankedList.splice(i, 1); 
				i--;
			}
		}
		
		// Announce it's their turn and show the new list
		message.channel.send("\nIt's " + member.username + "'s turn!");
		console.log("It's" + member.username + "'s turn!");
		message.member.send("Hey it's your turn for ranked!"); // Send a private message to them
		showQueue();
	}
	else if (messageContentUpper.startsWith(`-NEXT`) && (rankedList.length < 1)){
		message.delete(); // Hide the command
		message.channel.send("There is no one waiting to play :cry:");
	}
	
	// Clear the current queue
	if(messageContentUpper.startsWith(`-CLEAR`) || messageContentUpper.startsWith(`-RESET`)){
		message.delete(); // Hide the command
		if (rankedList.length === 0){
			message.channel.send(`The queue is already empty...`);
			console.log(message.author.username + " attmepted to clear the queue.");
		}
		else{
			rankedList = [];
			message.channel.send(`The queue has been cleared!`);
			console.log(message.author.username + " cleared the queue.");
		}
	}
	
	// Show the current queue
	if(messageContentUpper.startsWith(`?LIST`) || messageContentUpper.startsWith(`?VIEW`)){
		message.delete(); // Hide the command
		console.log(message.author.username + " displayed the queue.");
		if (rankedList.length < 1){
			message.channel.send(`The queue is empty!`);
		}
		else{
			showQueue();
		}
	}
	
	// Prevent twitch links in general
	if ((message.channel.id === "427302457849151490") && (messageContentUpper.includes("TWITCH.TV"))){
		message.delete();
		message.author.send("Please use the streaming channel.");
	}
})
