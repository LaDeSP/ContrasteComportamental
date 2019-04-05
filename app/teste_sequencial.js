var vi_numero = require('./gera_vi.js')



var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 768,
    backgroundColor: "#FFFFFF",
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


function preload(){
    this.load.setBaseURL('http://127.0.0.1:8000/')
    this.load.image('componente', 'app/image/circulo-mario.png');

}

function create(){
    var componenteA = {
        type: "componente",
        color: "red",
        tempo_exibicao: 60,
        tempo_total: 0,
        vi_novo: vi_numero.gera_vi(),
        show: this.physics.add.image(400, 300, 'componente').setInteractive(),
        
    };
    console.log(componenteA.vi_novo);
     //Cria um objeto interativo
    
    componenteA.show.body.allowGravity = false; //Anula a gravidade para que o objto não se mova
    
    console.log(componenteA.tempo_exibicao);

    componenteA.show.on('pointerdown', function (pointer){
        this.setTint(vermelho);
    });
    
    componenteA.show.on('pointerup', function (pointer) {
    
        this.clearTint();
    
    });
    
    componenteA.show.on('pointerout', function (pointer) {
    
        this.clearTint();
    
    });
}


