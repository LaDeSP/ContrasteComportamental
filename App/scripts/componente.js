//Componente
class component {
  constructor(color, posVI, negVI, points, componentID) {
    this.color = color;
    this.points = points;
    this.qtdClicks = 0;
    this.element = document.getElementById(componentID);
    this.posVI = posVI;
    this.posVIUsing = 10000;
    this.negVI = negVI;
    this.negVIUsing = 10000;
    this.score = 0;
  }
  getClick(color) {
    this.element.addEventListener("mousedown", function() {
      this.style.backgroundColor = color;
      if (this.posVIUsing <= 0) {
        givePosPoints(this.element, this.points, this.posVI.get_interval());
      }
      if (this.negVIUsing <= 0) {
        giveNegPoints(this.element, this.points, this.negVI.get_interval());
      }
    });
    this.element.addEventListener("mouseup", function() {
      this.style.backgroundColor = "white";
    });
    this.qtdClicks = this.qtdClicks + 1;
    console.log(this.qtdClicks);
  }
  posViCount(element, modal, newVI) {
    let timer = setInterval(function() {
      if(element.hidden == false) {
        console.log(newVI);
        if(newVI > 0){
          console.log("haha foi");
          newVI = newVI - 100;
        }
        else if(newVI<=0){
          clearInterval(timer);
          modal.showModal(this.color, "neg");
        }
      }
      
    }, 100);
  }
  negViCount(element, modal, newVI) {
    let timer = setInterval(function() {
      if(element.hidden == false) {
        console.log(newVI);
        if(newVI > 0){
          console.log("haha foi");
          newVI = newVI - 100;
        }
        else if(newVI<=0){
          clearInterval(timer);
          modal.showModal(this.color, "neg");
        }
      }
      
    }, 100);
  }
}
module.exports = component;
