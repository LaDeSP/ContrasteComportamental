//Componente
class component {
  constructor(color, posVI, negVI, points, componentID, posVIUsing, negVIUsing, posVIinterval, negVIinterval, compPIT) {
    this.color = color;
    this.points = points;
    this.qtdClicks = 0;
    this.element = document.getElementById(componentID);
    this.posVI = posVI;
    this.posVIUsing = posVIUsing;
    this.negVI = negVI;
    this.negVIUsing = negVIUsing;
    this.score = 0;
    this.check = false;
    //teste
    this.posVIinterval=posVIinterval;
    this.negVIinterval=negVIinterval;
    this.posVIsUsed=[];
    this.negVIsUsed=[];
    this.compPIT=compPIT;
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
        that.compPIT.getClick();
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
    that.posVIUsing = that.posVI.get_interval(that.posVIinterval);
    that.posVIsUsed = this.pushValue(that.posVIsUsed,that.posVIUsing);//teste
    var timer = setInterval(function() {
      if (that.element.hidden == false) {
        if (that.posVIUsing > 0) {
          that.posVIUsing = that.posVIUsing - 500;
        } else if (that.posVIUsing <= 0) {
          clearInterval(timer);
        }
      }
    }, 500);
  }
  negViCount() {
    var that = this;
    that.negVIUsing = that.negVI.get_interval(that.negVIinterval);
    
    that.negVIsUsed = this.pushValue(that.negVIsUsed,that.negVIUsing);//teste

    var timer = setInterval(function() {
      if (that.element.hidden == false) {
        if (that.negVIUsing > 0) {
          that.negVIUsing = that.negVIUsing - 100;
        } else if (that.negVIUsing <= 0) {
          clearInterval(timer);
        }
      }
    }, 100);
  }
  pushValue(array,value){
    let temp=array;
    temp.push(value);
    return temp;
  }
}
module.exports = component;
