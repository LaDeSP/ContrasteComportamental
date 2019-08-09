var vi_num = require("./gera_vi.js");
var experimentParam = require("./le_experiment");
const { dialog } = require("electron");
const $ = require("./modal/jquery.min.js");
const relatorio = require("./gerarelatorio");



var timer_A;
var timer_B;
var changeTimerA;
var changeA = experimentParam.component_time;
var changeTimerB;
var changeB = experimentParam.component_time;
experimentColor = experimentParam;
experimentParam = experimentParam.le_exeperimet();
var phaseNum = 0;

var pontuaFlag = false;

var config = {
  //Variável padrão de configuração do phaser
  type: Phaser.AUTO,
  width: 1200,
  height: 768,
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create
  }
}; //Define as configurações do tamanho do phaser dentro da janela.

var game = new Phaser.Game(config);

function preload() {
  //Carrega os assets para o teste (imagens, localhost, etc)
  this.load.setBaseURL("http://127.0.0.1:8000/");
  this.load.image("componente", "app/image/Capivara.png");
}
var elem = new Event("color");

var componentA = {
  //variável do tipo componente
  type: "componente",
  color: experimentColor.componentA(phaseNum),
  click: 0, // cliques totais no componente A
  //click_B: 0, //cliques totais no componente B
  vi: vi_num.gera_vi_componentA(), //recebe novo valor de intervalo
  score: 0
};
var componentB = {
  //variável do tipo componente
  type: "componente",
  color: experimentColor.componentB(phaseNum),
  click: 0, // cliques totais no componente A
  //click_B: 0, //cliques totais no componente B
  vi: vi_num.gera_vi_componentB(),
  score: 0
};
/*  */
var component_selector = {
  click: 0, // cliques totais no componente A
  show: null,
  point: 0,
  flag_A: 0,
  flag_B: 0
  //click_B: 0, //cliques totais no componente B
};
function create() {
  //Cria a cena com um componente
  
  pontua(); //Inicia a contagem regressiva para pontuar
  document.body.style.background = "white";
  component_selector.show = this.physics.add
    .image(400, 300, "componente")
    .setInteractive(); //Adiciona física e cliques
  component_selector.show.body.allowGravity = false; //Anula a gravidade para que o objto não se mova

  component_selector.show.on("pointerdown", function(pointer) {
    //Conta o clique de acordo com o componente mostrado
    //Determina o componente de acordo com a background color
    if (component_selector.flag_A == 1) {
      if (document.body.style.background == componentA.color) {
        modalShow();
        component_selector.flag_A = 0;
        componentA.vi = vi_num.gera_vi_componentA();
        timersOn();
      }
    }
    if (component_selector.flag_B == 1) {
      if (document.body.style.background == componentB.color) {
        modalShow();
        component_selector.flag_B = 0;
        componentB.vi = vi_num.gera_vi_componentB();
        timersOn();
      }
    }

    component_selector.click++;
    if (document.body.style.background == componentA.color) {
      componentA.click++;
    }
    if (document.body.style.background == componentB.color) {
      componentB.click++;
    }
    this.setTint('blue');
  });

  component_selector.show.on("pointerup", function(pointer) {
    this.clearTint();
  });

  component_selector.show.on("pointerout", function(pointer) {
    this.clearTint();
  });
  console.clear();
  console.log(experimentParam.component_time);
  console.log(
    "\n valor do Componente A:\n",
    componentA.vi,
    "\nvalor do componente B\n",
    componentB.vi
  );
  componentChange();
  //Inicia o looping para a troca dos componentes a partir da background color
  //showScore();
}

function componentChange() {
  if (document.body.style.background == "white") {
    setTimeout(function() {
      document.body.style.background = componentA.color;
      changeA = experimentParam.component_time;
      document.body.dispatchEvent(elem);
      componentChange();
    }, experimentParam.component_time);
  }
  if (document.body.style.background == componentA.color) {
    clearInterval(changeTimerB);
    changeTimerA = setInterval(function() {
      if (changeA > 0) {
        changeA = changeA - 10;
      } else {
        document.body.style.background = componentB.color;
        changeB = experimentParam.component_time;
        document.body.dispatchEvent(elem);
        clearInterval(changeTimerA);
        componentChange();
      }
    }, 10);
  }

  if (document.body.style.background == componentB.color) {
    changeTimerB = setInterval(function() {
      if (changeB > 0) {
        changeB = changeB - 10;
      } else {
        document.body.style.background = componentA.color;
        changeA = experimentParam.component_time;
        document.body.dispatchEvent(elem);
        clearInterval(changeTimerB);
        componentChange();
      }
    }, 10);
  }
}

function pontua() {
  //A cada troca de cor, o contador de VI de cada componente é pausado ou iniciado
  document.body.addEventListener(
    "color",
    function() {
      // adiciona listener à troca de cor dos background

      if (document.body.style.background == componentA.color) {
        //Timer dos dois componentes

        clearInterval(timer_B); //Pausa o timer do outro componente
        timer_A = setInterval(function() {
          if (componentA.vi > 0) componentA.vi = componentA.vi - 10;
          else {
            component_selector.flag_A = 10;
            clearInterval(timer_A);
          }
        }, 10);
      }

      if (document.body.style.background == componentB.color) {
        clearInterval(timer_A); //Pausa o timer do outro componente
        timer_B = setInterval(function() {
          if (componentB.vi > 0) componentB.vi = componentB.vi - 10;
          else {
            component_selector.flag_B = 10;
            clearInterval(timer_B);
          }
        }, 10);
      }
      console.clear();
      console.log(
        "\n valor do Componente A:\n",
        componentA.vi,
        "\nvalor do componente B\n",
        componentB.vi
      );
    },
    false
  );
}

function modalShow() {
  $(document).ready(function() {
    $(".modal").modal();
    setTimeout(function() {
      $(".modal").modal("hide");
    }, 5000);
  });
}

function clicaModal() {
  component_selector.point = component_selector.point + 10;
  console.clear();
  console.log(component_selector.point);
  console.log(
    "\n valor do Componente A:\n",
    componentA.vi,
    "\n valor do componente B\n",
    componentB.vi
  );
}

function timersOn() {
  if (document.body.style.background == componentA.color) {
    //Timer dos dois componentes

    clearInterval(timer_B); //Pausa o timer do outro componente

    timer_A = setInterval(function() {
      if (componentA.vi > 0) componentA.vi = componentA.vi - 10;
      else {
        component_selector.flag_A = 1;
        clearInterval(timer_A);
      }
    }, 10);
  }

  if (document.body.style.background == componentB.color) {
    clearInterval(timer_A); //Pausa o timer do outro componente
    timer_B = setInterval(function() {
      if (componentB.vi > 0) componentB.vi = componentB.vi - 10;
      else {
        component_selector.flag_B = 1;
        clearInterval(timer_B);
      }
    }, 10);
  }
}

setTimeout(function(){
  const remote = require('electron').remote
  let w = remote.getCurrentWindow()
  w.close()  
}, 10000);