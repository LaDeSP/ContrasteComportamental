class modal {
  constructor(collectTime) {
    this.element = document.getElementById("myModal");
    this.header = document.getElementById("header");
    this.footer = document.getElementById("footer");
    this.btn = document.getElementById("coletaPonto");
    this.btn.onclick = function() {
      document.getElementById("myModal").style.display = "none";
    };
    this.collectTime = collectTime;
  }
  showModal(color, signal, component) {
    this.header.style.backgroundColor = color;
    this.footer.style.backgroundColor = color;
    this.element.style.display = "block";

    if (signal == "pos") {
      setTimeout(function() {
        document.getElementById("myModal").style.display = "none";
        component.posViCount();
      }, this.collectTime);
    }
    if (signal == "neg") {
      setTimeout(function() {
        document.getElementById("myModal").style.display = "none";
        component.negViCount();
      }, this.collectTime);
    }
    setTimeout(function() {
      document.getElementById("myModal").style.display = "none";
    }, this.collectTime);
  }
  hideModal() {
    this.element.style.display = "none";
  }
}
module.exports = modal;
