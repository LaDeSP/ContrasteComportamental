var vi_num = require('./gera_vi.js')
var experimentParam = require('./le_experiment')


var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 768,
    transparent: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
};//Define as configurações do tamanho do phaser dentro da janela.

var game = new Phaser.Game(config);

var component_time = 15000;

function preload(){
    this.load.setBaseURL('http://127.0.0.1:8000/')
    this.load.image('componente', 'app/image/Capivara.png');

}


var componentA = {
    type: "componente",
    color: "red",
    click: 0, // cliques totais no componente A
    //click_B: 0, //cliques totais no componente B
    vi_novo: vi_num.gera_vi() //recebe novo valor de intervalo
};
var componentB = {
    type: "componente",
    color: "red",
    click: 0, // cliques totais no componente A
    //click_B: 0, //cliques totais no componente B
    vi_new: vi_num.gera_vi()
};

var component_selector = {
    click: 0, // cliques totais no componente A
    show: null,
    //click_B: 0, //cliques totais no componente B
};

function create(){
    document.body.style.background = "green";
    component_selector.show = this.physics.add.image(300, 600, 'componente').setInteractive()
    component_selector.show.body.allowGravity = false;//Anula a gravidade para que o objto não se mova

    component_selector.show.on('pointerdown', function (pointer){
        this.setTint();
        component_selector.click++;
        if(document.body.style.background == "red"){
            componentA.click++;            
        }
        if(document.body.style.background == "green"){
            componentB.click++;
        }
    });
        
    component_selector.show.on('pointerup', function (pointer) {
        console.log("\n\n\n", componentA.click, "\n\n\n", componentB.click)
        console.log(document.body.style.background)
       this.clearTint();
        
    });
        
    component_selector.show.on('pointerout', function (pointer) {
        
        this.clearTint();
        
    });
    changeToRed();
}



function changeToRed(){
    setInterval(function(){
        document.body.style.background = "red"
        changeToGreen();
    }, component_time);
}

function changeToGreen(){
    setInterval(function(){
        document.body.style.background = "green"
        changeToRed();
    }, component_time);
    

}