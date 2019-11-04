class modal {
  constructor(collectTime, teste, element, header, footer, collect) {
    this.element = document.getElementById(element);
    this.header = document.getElementById(header);
    this.footer = document.getElementById(footer);
    this.collectTime = collectTime;
    this.btn = document.getElementById(collect);
    this.compChanger = teste;
    this.timer;
  }
  showModal(color, signal, component) {
    this.header.style.backgroundColor = color;
    this.footer.style.backgroundColor = color;
    this.element.style.display = "block";
    this.element.focus();
    var that = this;
    clearInterval(that.compChanger.changer);
    if (signal == "pos") {
      console.log(that.compChanger);
      setTimeout(function() {
        if (that.element.style.display == "block") {
          that.element.style.display = "none";
          that.compChanger.beginChanger();
          component.posViCount();
        }
      }, this.collectTime);
    }
    if (signal == "neg") {
      setTimeout(function() {
        if (that.element.style.display == "block") {
          that.element.style.display = "none";
          component.negViCount();
        }
      }, this.collectTime);
    }
  }
  hideModal() {
    this.element.style.display = "none";
  }
}
module.exports = modal;
