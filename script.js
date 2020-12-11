let container = document.querySelector('.container');

let createElement = (type, name) => {
  let element = document.createElement(type);
  element.classList.add(name);
  return element;
}

let serverList = createElement('div', 'serverList');
let channelList = createElement('div', 'channelList');
let chatBox = createElement('div', 'chatBox');
let userList = createElement('div', 'userList');

let servers = [{
    "servername": "test1",
    "channels": {
      "text": ["general", "announcements", "commands"],
      "voice": ["general", "music"]
    },
    "messages" : []
  },
  {
    "servername": "test2",
    "channels": {
      "text": ["general75", "announcements7867", "commands7645"],
      "voice": ["general", "music"]
    },
    "messages" : []
  },
  {
    "servername": "test3",
    "channels": {
      "text": ["general456", "announcements6786", "commands78576"],
      "voice": ["general", "music"]
    },
    "messages" : []
  }
];

let users = ['user1', 'user2', 'user3'];

servers.forEach(server => {
  let symbol = createElement('div', 'symbol');
  let img = createElement('img', 'image');
  img.src = 'https://picsum.photos/48/48';
  img.title = server.servername;
  img.setAttribute('data-servername', server.servername);
  symbol.appendChild(img);
  serverList.appendChild(symbol);
});

container.appendChild(serverList);

servers[0].channels.text.forEach(channelName => {
  let textChannel = createElement('div', 'textChannel');
  textChannel.textContent = channelName;
  textChannel.setAttribute('data-servername', servers[0].servername);
  channelList.appendChild(textChannel);
});

container.appendChild(channelList);

let messageForm = createElement('form', 'messageForm');
let messageInput = createElement('input', 'messageInput');
messageForm.appendChild(messageInput);
messageForm.setAttribute('data-servername', servers[0].servername);
chatBox.appendChild(messageForm);
container.appendChild(chatBox);

users.forEach(user => {
  let userProfile = createElement('div', 'user');
  userProfile.textContent = user;
  userList.appendChild(userProfile);
})
container.appendChild(userList);

document.addEventListener('click', (e) => {
  let pos = servers.findIndex(server => server.servername == e.target.dataset.servername);
  if (pos != -1) {
    console.log('??"??"');
    chatBox.innerHTML = '';
    messageForm.setAttribute('data-servername', servers[pos].servername);
    chatBox.appendChild(messageForm);
    servers[pos].messages.forEach(message => chatBox.appendChild(message));
    if (e.target.tagName == 'IMG') {
      document.querySelector('.channelList').innerHTML = '';

      servers[pos].channels.text.forEach(channelName => {
        let textChannel = createElement('div', 'textChannel');
        textChannel.textContent = channelName;
        textChannel.setAttribute('data-servername', servers[pos].servername);
        channelList.appendChild(textChannel);
      })
    } else {

    }
  }
})

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let pos = servers.findIndex(server => server.servername == e.target.dataset.servername);
  let message = createElement('div', 'message');
  message.textContent = messageInput.value;
  chatBox.appendChild(message);
  servers[pos].messages.push(message);
})