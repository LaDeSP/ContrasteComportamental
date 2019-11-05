const remote = require('electron').remote;
const btn = document.getElementById("next");
const storage = require("electron-json-storage");

  btn.onclick = function(){
    let window = remote.getCurrentWindow();
    window.loadFile("index.html");
  }

