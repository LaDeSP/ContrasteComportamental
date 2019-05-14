var vi_num = require('./gera_vi.js')
var experimentParam = require('./le_experiment')

const { dialog } = require('electron')


experimentParam = experimentParam.le_exeperimet();

var pontuaFlag = false;

var config = { //Variável padrão de configuração do phaser
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

function preload(){ //Carrega os assets para o teste (imagens, localhost, etc)
    this.load.setBaseURL('http://127.0.0.1:8000/')
    this.load.image('componente', 'app/image/Capivara.png');

}
var elem = new Event('color');

var componentA = { //variável do tipo componente
    type: "componente",
    color: experimentParam.faseA.componentA_color,
    click: 0, // cliques totais no componente A
    //click_B: 0, //cliques totais no componente B
    vi: vi_num.gera_vi(), //recebe novo valor de intervalo
    score: 0
};
var componentB = { //variável do tipo componente
    type: "componente",
    color: experimentParam.faseA.componentB_color,
    click: 0, // cliques totais no componente A
    //click_B: 0, //cliques totais no componente B
    vi: vi_num.gera_vi(),
    score: 0
};

var component_selector = {
    click: 0, // cliques totais no componente A
    show: null,
    point: 0
    //click_B: 0, //cliques totais no componente B
};


function create(){ //Cria a cena com um componente
    pontua(); //Inicia a contagem regressiva para pontuar
    document.body.style.background = "green";
    component_selector.show = this.physics.add.image(400, 300, 'componente').setInteractive() //Adiciona física e cliques
    component_selector.show.body.allowGravity = false;//Anula a gravidade para que o objto não se mova

    component_selector.show.on('pointerdown', function (pointer){ //Conta o clique de acordo com o componente mostrado
        //Determina o componente de acordo com a background color
        component_selector.click++;
        if(document.body.style.background == componentA.color){
            componentA.click++; 
        }
        if(document.body.style.background == componentB.color){
            componentB.click++; 
        }
        this.setTint('#FF0000'); 
    });
        
    component_selector.show.on('pointerup', function (pointer) {

        this.clearTint();
        
    });
        
    component_selector.show.on('pointerout', function (pointer) {

        this.clearTint();
        
    });
    console.clear();
    console.log("\n valor do Componente A:\n", componentA.vi ,"\nvalor do componente B\n", componentB.vi);
    changeToRed(); //Inicia o looping para a troca dos componentes a partir da background color
    //showScore();
}


function changeToRed(){ //Muda para o componente A
    setTimeout(function(){
        document.body.style.background = componentA.color
        document.body.dispatchEvent(elem);
        changeToGreen();
    }, experimentParam.component_time);
}

function changeToGreen(){ //Muda para o componente B
    setTimeout(function(){
        document.body.style.background = componentB.color
        document.body.dispatchEvent(elem);
        changeToRed();
    }, experimentParam.component_time); 

}
function pontua(){   //A cada troca de cor, o contador de VI de cada componente é pausado ou iniciado 
    document.body.addEventListener("color", function(){ // adiciona listener à troca de cor dos background
        
        if(document.body.style.background == "red"){
            
                componentA.score = componentA.score + 10;
                        
                componentA.vi = vi_num.gera_vi();
                console.clear();
                console.log("\nColetou ponto no componente A.\n ponduacao total em A é = ", componentA.score, "\n\n")
                console.log("\n novo valor do componente A é : ", componentA.vi)
                console.log("\nquantidade de cliques em A : ", componentA.click)
                
                pontuaFlag == false;
            
            
            

        }
        
        if(document.body.style.background == "green"){
           
                componentB.score = componentB.score + 10;
                        
                componentB.vi = vi_num.gera_vi();
                console.clear();
                console.log("\nColetou ponto no componente B.\n ponduacao total em B é = ", componentB.score, "\n\n")
                console.log("\n novo valor do componente B é : ", componentB.vi)
                console.log("\nquantidade de cliques em B : ", componentB.click)
                
                pontuaFlag == false;
            
            
        }

    }, false);
}

function pointCheck(){ //Verifica o clique ao final do contador de VI do componente ativo
    if(document.body.style.background == componentA.color){
        componentA.click++; 
        if(pontuaFlag == true){
            componentA.score = componentA.score + 10;
                    
            componentA.vi = vi_num.gera_vi();
            console.log("\nColetou ponto no componente A.\n pontuação total em A é = ", componentA.score, "\n\n")
            console.log("\n novo valor do componente A é : ", componentA.vi)
            console.log("\nquantidade de cliques em A : ", componentA.click)
            pontuaFlag == false;
        }
    }
    if(document.body.style.background == componentB.color){
        componentB.click++;
        if(pontuaFlag == true){
            componentB.score = componentB.score + 10;
                    
            componentB.vi = vi_num.gera_vi();
            console.log("\nColetou ponto no componente B.\n pontuação total em B é = ", componentB.score, "\n\n")
            console.log("\n novo valor do componente B é : ", componentB.vi)
            console.log("\nquantidade de cliques em B : ", componentB.click)
            pontuaFlag == false;
        }
    }
}