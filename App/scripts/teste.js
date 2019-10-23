//req de class
const expParam = require("./App/scripts/le_experiment.js").le_experiment();
const componentClass = require("./App/scripts/componente.js");
const modalClass = require("./App/scripts/modal.js");
const scoreClass = require("./App/scripts/placar.js");
const VI = require("./App/scripts/gera_vi.js");

const compParamA = expParam.Stages[0].CompA;
const compParamB = expParam.Stages[0].CompB;

var posVIA = new VI();
var negVIA = new VI();
var posVIB = new VI();
var negVIB = new VI();

var score = new scoreClass(expParam.TestSet.ShowScoreInterval);
var pointsA = new modalClass(expParam.TestSet.CollectTime);
var pointsB = new modalClass(expParam.TestSet.CollectTime);

var componentA = new componentClass(
  compParamA.ComponentColor,
  posVIA,
  negVIA,
  pointsA,
  "capiA"
);
var componentB = new componentClass(
  compParamB.ComponentColor,
  posVIB,
  negVIB,
  pointsB,
  "capiB"
);

score.scoreShow(score.showInterval);

setInterval(function() {
  if (componentA.element.hidden == true) {
    componentB.element.hidden = true;
    setTimeout(function() {
      componentA.element.hidden = false;
    }, 1000);
  } else if (componentB.element.hidden == true) {
    componentA.element.hidden = true;
    setTimeout(function() {
      componentB.element.hidden = false;
    }, 1000);
  }
}, expParam.Stages[0].IntervalTime);

componentA.posViCount(componentA.element, componentA.points, componentA.posVIUsing);
console.log(componentA.posVI.get_interval(30));

//fazer that no javascript