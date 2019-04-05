var vi_numero = require('./gera_vi.js')



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
var verde = "#000FF00";
var vermelho = "#0FF0000";


function preload(){
    this.load.setBaseURL('http://127.0.0.1:8000/')
    this.load.image('componente', 'app/image/circulo-mario.png');

}


var componente = {
    type: "componente",
    color: "red",
    clickCount: 0, //Quantidade total de cliques(independente de cor) 
    click_A: 0, // cliques totais no componente A
    //click_B: 0, //cliques totais no componente B
    clickCount_showA: 0, //Cliques no componente A durante cada tempo de exibição
    //clickCount_showB: 0, //Cliques no componente B durante cada tempo de exibição
    tempo_exibicao: 60,
    tempo_total: 0,
    vi_novo: vi_numero.gera_vi(),
    show: 0,
};


function create(){
    
    componente.show = this.physics.add.image(400, 300, 'componente').setInteractive()
    
    console.log(componente.vi_novo);
     //Cria um objeto interativo
        
     document.body.style.background = "red";
        componente.show.body.allowGravity = false;//Anula a gravidade para que o objto não se mova
        console.log(componente.tempo_exibicao);

        componente.show.on('pointerdown', function (pointer){
            this.setTint(vermelho);
            componente.clickCount_show++;
            componente.clickCount++;
        });
            
        componente.show.on('pointerup', function (pointer) {
            
           this.clearTint();
            
        });
            
        componente.show.on('pointerout', function (pointer) {
            
            this.clearTint();
            
        });
        

        onEvent_red();

            setInterval(onEvent_red(), 1500);
            setInterval(console.log(componente.clickCount + "\n" + componente.click_A + "cliques no VERMELHO"), 2000);

            setInterval(function(){
                console.log(componente.clickCount + "\n" + componente.click_A + "cliques no VERMELHO");
                }, 3000);
        }


    function onEvent_red (){         
        componente.clickCount_showR = componente.clickCount_showA;
        componente.click_A = componente.click_A + componente.clickCount_;
        clickCount_exibicao = 0;
        document.body.style.background = "red";
    }
    
    /*function onEvent_green (){  
        console.log(componente.clickCount + " cliques totais \n" + componente.click_B + "cliques no VERDE");
        componente.clickCount_showG = componente.clickCount_showB;
        componente.click_B = componente.click_B + componente.clickCount_exibicao;
        clickCount_exibicao = 0;
        document.body.style.background = "green";
        
        this.time.delayedCall(6000, onEvent_red, [], this);
    }*/

