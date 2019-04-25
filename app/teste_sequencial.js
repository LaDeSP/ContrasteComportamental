var vi_num = require('./gera_vi.js')
var experimentParam = require('./le_experiment')


experimentParam = experimentParam.le_exeperimet();


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

function preload(){
    this.load.setBaseURL('http://127.0.0.1:8000/')
    this.load.image('componente', 'app/image/Capivara.png');

}


var componentA = {
    type: "componente",
    color: experimentParam.faseA.componentA_color,
    click: 0, // cliques totais no componente A
    //click_B: 0, //cliques totais no componente B
    vi: vi_num.gera_vi() //recebe novo valor de intervalo
};
var componentB = {
    type: "componente",
    color: experimentParam.faseA.componentB_color,
    click: 0, // cliques totais no componente A
    //click_B: 0, //cliques totais no componente B
    vi: vi_num.gera_vi()
};

var component_selector = {
    click: 0, // cliques totais no componente A
    show: null,
    point: 0
    //click_B: 0, //cliques totais no componente B
};

function create(){
    document.body.style.background = componentB.color;
    component_selector.show = this.physics.add.image(400, 300, 'componente').setInteractive()
    component_selector.show.body.allowGravity = false;//Anula a gravidade para que o objto não se mova

    component_selector.show.on('pointerdown', function (pointer){
        
        component_selector.click++;
        if(document.body.style.background == componentA.color){
            componentA.click++;   
            this.setTint('#FF0000');
        }
        if(document.body.style.background == componentB.color){
            componentB.click++;
            this.setTint('#008000');
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

    showScore();
}

function showScore(){
    setInterval(function(){
        document.body.getElementById(score).style.display = 'block';
        setTimeout(function(){}, experimentParam.score_show);
        hideScore();
    }, experimentParam.show_score_interval);
}
function hideScore(){
    setInterval(function(){
        document.body.getElementById(score).style.display = 'none';
        showScore();
    }, experimentParam.show_score_interval);
}

function changeToRed(){
    setInterval(function(){
        document.body.style.background = componentA.color
        changeToGreen();
    }, experimentParam.component_time);
}

function changeToGreen(){
    setInterval(function(){
        document.body.style.background = componentB.color
        changeToRed();
    }, experimentParam.component_time); 

}
