var compA = document.getElementById("capiA");
var compB = document.getElementById("capiB");
var param = require("./App/scripts/le_relatorio.js");
param = param.le_experiment();
setInterval(function() {
  if (compA.hidden == true) {
    compB.hidden = true;
    setTimeout(function() {
      compA.hidden = false;
    }, 1000);
  } else if (compB.hidden == true) {
    compA.hidden = true;
    setTimeout(function() {
      compB.hidden = false;
    }, 1000);
  }
}, param.Stages[0].IntervalTime);
