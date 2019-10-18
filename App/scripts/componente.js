//Componente
const modalControl = require("./App/scripts/modal.js");
const compVI = require("./App/scripts/gera_vi.js");
var report = require("./App/scripts/gerarelatorio.js");
var parameters = require("./App/scripts/le_relatorio.js");
parameters = parameters.le_experiment();

var compParamA = parameters.Stages[0].CompA;
var compParamB = parameters.Stages[0].CompB;
class component {
  constructor(color, posVI, negVI, posPt, negPt, componentID, posID, negID) {
    this.color = color;
    this.posPt = posPt;
    this.negPt = negPt;
    this.qtdClicks = -1;
    this.show = document.getElementById(componentID);
    this.posVI = posVI;
    this.negVI = negVI;
    this.score = 0;
    this.posID = posID;
    this.negID = negID;
  }
  getClick(color) {
    this.show.addEventListener("mousedown", function() {
      this.style.backgroundColor = color;
      if (this.posVI <= 0) {
        givePosPoints(this.posPt);
      }
      if (this.negVI <= 0) {
        giveNegPoints(this.negPt);
      }
    });
    this.show.addEventListener("mouseup", function() {
      this.style.backgroundColor = "white";
    });
    this.qtdClicks = this.qtdClicks + 1;
    console.log(this.qtdClicks);
  }
  givePosPoints(posPt) {
    modalControl.showModal(parameters.CollectTime, this.posID);
    this.score += posPt;
  }
  giveNegPoints(negPt) {
    modalControl.showModal(parameters.CollectTime, this.negID);
    this.score = negPt;
  }
  posViCount() {
    let timer = setInterval(function() {
      if (this.show.hidden == false) {
        this.posVI -= 100;
      }
      if (this.posVI <= 0) {
        clearInterval(timer);
      }
    }, 100);
  }
  negViCount() {
    let timer = setInterval(function() {
      if (this.show.hidden == false) {
        this.negVI -= 100;
      }
      if (this.negVI <= 0) {
        clearInterval(timer);
      }
    }, 100);
  }
}

console.log(parameters);

componentA = new component(
  compParamA.ComponentColor,
  compParamA.ComponentViPOS,
  compParamA.ComponentViNEG,
  compParamA.PosPtsGive,
  compParamA.NegPtsGive,
  "capiA",
  "posA",
  "negB"
);

componentB = new component(
  compParamB.ComponentColor,
  compParamB.ComponentViPOS,
  compParamB.ComponentViNEG,
  compParamB.PosPtsGive,
  compParamB.NegPtsGive,
  "capiB",
  "posB",
  "negB"
);

componentA.getClick();
componentB.getClick();

/*
componentA.posViCount();
componentB.negViCount();
*/

console.log(compVI.generate_vi("A"));
console.log(compVI.generate_vi("B"));

console.log(compParamA, compParamB);
