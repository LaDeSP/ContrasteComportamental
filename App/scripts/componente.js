//Componente
class component{
  constructor(color, posPt, negPt, componentID){
    this.color = color;
    this.ptPositiva = posPt;
    this.ptNegativa = negPt;
    this.qtdClicks = 0;
    this.show = document.getElementById(componentID);
  }
  getClick(color){
    this.show.addEventListener("mousedown", function(){
      this.style.backgroundColor = color;
    });
    this.show.addEventListener("mouseup", function() {
      this.style.backgroundColor = "white";
    });
    this.qtdClicks = this.qtdClicks + 1;
    console.log(this.qtdClicks);
    }
  givePosPoints(posPt){    
  }
  giveNegPoints(negPt){
  }
}
const compVI = require("./App/scripts/gera_vi.js");
componentA = new component("red", 10, -10, 'capiA');
componentB = new component("green", 10, -10, 'capiB');
componentA.getClick();
componentB.getClick();
console.log(compVI.generate_vi("A"));
console.log(componentA.show);
console.log(componentB.show);

