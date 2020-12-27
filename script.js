let windows = document.querySelectorAll(".window");
let desktop = document.querySelector(".desktop");
let top_bar = document.querySelector(".top-bar");
for (let i = 0; i < windows.length; i++) {
  dragElement(windows[i]);
}

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.className + "header" + elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.className + "header" + elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:

    if (e.layerX < 0 || e.layerX > desktop.offsetWidth) return;
    if (e.layerY < 0 || e.layerY > desktop.offsetHeight) return;

    let top = elmnt.style.top.slice(0, -2);
    let left = elmnt.style.left.slice(0, -2);

    if (left < 5 && left != "") {
      elmnt.style.left = 5 + "px";
    } else if (left > desktop.offsetWidth - elmnt.offsetWidth - 5) {
      elmnt.style.left = desktop.offsetWidth - elmnt.offsetWidth - 5 + "px";
    } else {
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    if (top < 5 && top != "") {
      elmnt.style.top = 5 + "px";
    } else if (top > desktop.offsetHeight - elmnt.offsetHeight - 50) {
      elmnt.style.top = desktop.offsetHeight - elmnt.offsetHeight - 50 + "px";
    } else {
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

let available_chars_lables = document.querySelectorAll('.available-chars');
var areas = document.querySelectorAll('.message-input');

for (let i = 0; i < areas.length; i++) {
  if (areas[i].addEventListener) {
    areas[i].addEventListener('input', function () {
      available_chars_lables[i].textContent = `${areas[i].value.length}/144`;
    }, false);
  } else if (areas[i].attachEvent) {
    areas[i].attachEvent('onpropertychange', function () {
      console.log(areas[i].textContent.length);
    });
  }
}

let message_forms = document.querySelectorAll('.message-form');
let message_inputs = document.querySelectorAll(".message-input");
let message_histories = document.querySelectorAll('.message-history');

for (let i = 0; i < message_forms.length; i++) {
  message_forms[i].addEventListener("submit", (e) => {
    e.preventDefault();
    if (e.isTrusted) {
      newMessage("Me", message_inputs[i].value, "message", message_histories[i]);
      message_inputs[i].value = "";
      available_chars_lables[i].textContent = `0/144`;
    }
  });
}

function newMessage(author, message, type, target) {
  if (message == "") return;
  if (type == "message") {
    let div = document.createElement('div');
    div.className = "message";
    div.textContent = `${author}:~$ ${message}`;
    target.appendChild(div);
    target.scrollTop = target.scrollHeight;
  } else {
    //type = command
  }
}