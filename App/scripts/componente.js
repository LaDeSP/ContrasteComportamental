//Componente
class component {
  constructor(color, posVI, negVI, points, componentID) {
    this.color = color;
    this.points = points;
    this.qtdClicks = 0;
    this.element = document.getElementById(componentID);
    this.posVI = posVI;
    this.posVIUsing = 10;
    this.negVI = negVI;
    this.negVIUsing = 10;
    this.score = 0;
    this.check = false;
  }
  getClick() {
    var that = this;
    this.element.addEventListener(
      "mousedown",
      function() {
        that.element.style.backgroundColor = that.color;
      },
      false
    );
    that.element.addEventListener(
      "mouseup",
      function() {
        that.element.style.backgroundColor = "white";
        that.qtdClicks = that.qtdClicks + 1;
        console.log(
          "Quantidade de cliques do elemento atual: ",
          that.qtdClicks
        );
        if (that.posVIUsing <= 0) {
          that.points.showModal(that.color, "pos", that);
        }
        if (that.negVIUsing <= 0) {
          that.points.showModal(that.color, "neg", that);
        }
      },
      false
    );
    that.element.addEventListener("mousedown", that.clickVerify, false);
  }
  posViCount() {
    clearInterval(timer);
    var that = this;
    that.posVIUsing = that.posVI.get_interval(30);
    var timer = setInterval(function() {
      if (that.element.hidden == false) {
        if (that.posVIUsing > 0) {
          console.log("VI positivo do componente", that.posVIUsing);
          that.posVIUsing = that.posVIUsing - 500;
        } else if (that.posVIUsing <= 0) {
          clearInterval(timer);
        }
      }
    }, 500);
  }
  negViCount() {
    var that = this;
    that.negVIUsing = that.negVI.get_interval(30);
    var timer = setInterval(function() {
      if (that.element.hidden == false) {
        console.log(that.negVIUsing);
        if (that.negVIUsing > 0) {
          that.negVIUsing = that.negVIUsing - 100;
        } else if (that.negVIUsing <= 0) {
          clearInterval(timer);
        }
      }
    }, 100);
  }
}
module.exports = component;
