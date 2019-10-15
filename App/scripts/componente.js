//Função de receber cliques do componente

//const leJson = require('experimentReader');
const componentTimer = 3000;
let clickCount = 0;
const component = document.getElementById("capi");
const activeComponent = {
    colorA: "red",
    colorB: "green",
    color: "white",
    timer: function(){
      console.log('opa joia?');
    }
};

activeComponent.timer();
activeComponent.color = activeComponent.colorA;
function getClick() {
  clickCount += 1;
  console.log(clickCount);
  component.addEventListener("mousedown", function() {
    component.style.backgroundColor = activeComponent.color;
  });
  component.addEventListener("mouseup", function() {
    component.style.backgroundColor = "white";
  });
}
//timer para troca de componente ativo por cor
setInterval(function(){
    if(activeComponent.color == activeComponent.colorA)
      activeComponent.color = activeComponent.colorB;    
    else if(activeComponent.color == activeComponent.colorB)
      activeComponent.color = activeComponent.colorA;
    
}, componentTimer);
