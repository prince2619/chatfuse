const socket = io ()
// logic of client sent message this is for taking the name of user
let name;
//impoting text area
let textarea = document.querySelector('#textarea')
//importing message area
let messageArea = document.querySelector('.message_area')
// this loop will show a pupoff box till user name is not provided.
do{
   name = prompt('Please Enter Your Name:')
}while(!name)

textarea.addEventListener('keyup',(e)=>{
     if(e.key == 'Enter'){
        sendMessage(e.target.value)
     }
})
// in the above function keyup is trigger when any key is pressed but we have to send message when User press ENTER so if loop is added. (e)- its showing an event. 

function sendMessage(message){
    //creating an object
    let msg ={
        user: name,
        message:message.trim()
    }
    //Append
    appendMessage(msg,'outgoing')
    textarea.value=''
    scrollToBottom()
    //send to server via webSocket connection.
    socket.emit('message',msg)
}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div')
    let className= type
    mainDiv.classList.add(className,'message')

    //html markup
    let markup=`
       <h4>${msg.user}</h4>
       <p>${msg.message}</p> 
    `
    //calling this markup in main div.
    mainDiv.innerHTML = markup
    // Now appending the mainDiv in messageArea
    messageArea.appendChild(mainDiv)


}

// Recieve Message
socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})

// Scroll to bottom when we sending a message
function scrollToBottom(){
    messageArea.scrollTop =messageArea.scrollHeight
}