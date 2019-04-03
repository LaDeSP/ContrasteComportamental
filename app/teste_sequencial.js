var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
var verde = "000FF00";
var vermelho = "0FF0000";
var componenteA = new componente(vermelho);
var combonenteB = new componente(verde); 
function componente (cor){
    this.cor = this.setTint(cor);;
    this.time = 60;
    this.qtdClique = 0;
}
function preload(){
    this.load.setBaseURL('http://127.0.0.1:8000/')
    this.load.image('background', 'app/image/background.jpg');
    this.load.image('componenteA', 'app/image/circulo-mario.png');

}

function create(){
    this.add.image(400, 300, 'background');
    componenteA = this.physics.add.image(400, 300, 'componenteA').setInteractive(); //Cria um objeto interativo
    componenteA.body.allowGravity = false; //Anula a gravidade para que o objto não se mova



    componenteA.on('pointerdown', function (pointer){

        this.setTint(verde);
        
    });
    
    componenteA.on('pointerup', function (pointer) {
    
        this.clearTint();
    
    });
    
    componenteA.on('pointerout', function (pointer) {
    
        this.clearTint();
    
    });
}


