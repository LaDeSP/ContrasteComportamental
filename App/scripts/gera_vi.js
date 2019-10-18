//Arquivos que o codigo acessa
var experimentJSON=load_experiment();//Arquivo com as configurações do teste
var listJSON=return_lista();//Arquivo com as listas dos VIs
//Objetos do JSON experiment
var stagesSet=return_stagesSet();
var stages=return_stages();
//Constantes do codigo
var indexOfPhases=0;//indice das fases
var listVIsUseds=[];//lista de objeto JSON
var maxIndex=stagesSet.NumberOfStages;//numero de indices que o teste tera
//Variaveis do CompA
var indexCompA=indexOfPhases;
var visCompAPOS;
var listVisCompAPOS;
var usedVisCompA=[];
//Variaveis do CompA
var indexCompB=indexOfPhases;
var visCompBPOS;
var listVisCompBPOS;
var usedVisCompB=[];



/**Carregar arquivos*/
//Carrega experiment.json
function load_experiment(){
    var fs = require('fs'),
    path = require('path')
    filePath = path.join(__dirname+'/json', 'experiment.json');
    try {
        var fsexperiment = fs.readFileSync(filePath)
        var experiment = JSON.parse(fsexperiment);
    } catch (error) {
        return false;
    }
    return experiment;
};
//Carrega lista.json
function return_lista(){
    var fs = require('fs'),
    path = require('path')
    filePath = path.join(__dirname+'/json', 'lista.json');
    try {
        var fslista = fs.readFileSync(filePath)
        var lista = JSON.parse(fslista);
    } catch (error) {
        return false;
    }
    return lista;
};
//Carrega objetos do experiment JSON
function return_stages(){
    return experimentJSON.Stages;
}
function return_stagesSet(){
    return experimentJSON.StagesSet;
}
function load_interval(interval) {
    return stages[interval].CompA.ComponentViPOS;
}

function load_vis(interval){//carrega a lista do Componete de acordo com o intervalo selecionado
    let list=listJSON;
    let usedVI=['VI.vi',interval,'.vi'];
    usedVI=usedVI.join('');
    usedVI = usedVI.split('.');
    usedVI.forEach((item) => {
    list = list[item];
    })
    return list;
}
function shuffles(listVi){//embaralha a lista de intervalos 
    let currentIndex = listVi.length, temp, index_random;
    while (0 !== currentIndex) {
    index_random = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = listVi[currentIndex];
    listVi[currentIndex] = listVi[index_random];
    listVi[index_random] = temp;
    }
    return listVi;
}
function random_pick(listVI){//está função devolve um valor do vi especifico
    let scrambled=shuffles(listVI);//embaralha a lista
    let returns=scrambled.pop();//variavel recebe o ultimo item da lista que esta sendo removido
    listVI=scrambled;//sobrescreve lista que foi modificada
    return returns;//devolve intervalo a ser usado
}

module.exports = {
    generate_vi : function(component){//Função devolve um intervalo relacionado ao componente passado
         if(component==="A"){
            return module.exports.generate_vi_CompA();
         }
         else{
            return module.exports.generate_vi_CompB();
         }
    },
    /**Processos do Componete A*/
    generate_vi_CompA : function(){
        if(listVisCompAPOS===undefined){//Caso a lista de intervalos positivos do Componete A esteja vazia
            visCompAPOS=load_interval(indexCompA);//carrega o intevalo usado pelo Componete A nessa fase
            console.log(visCompAPOS);

            listVisCompAPOS=load_vis(visCompAPOS);//carrega a lista de intevalos usados pelo Componete A nessa fase
            listVisCompAPOS=shuffles(listVisCompAPOS);//embaralha a lista de intevalos do Componete
        }
        let returns=random_pick(listVisCompAPOS);//Escolhe um intervalo aleatorio e remove da lsita de VIs disponiveis
        usedVisCompA.push(returns);//Adiciona o intervalo removido a lista de intevalos usados
        return returns;//Retorna o intervalo que devera ser usado
     },
    /**Processos do Componete B*/
    generate_vi_CompB : function(){
        if(listVisCompBPOS===undefined){//Caso a lista de intervalos positivos do Componete B esteja vazia
            visCompBPOS=load_interval(indexCompB);//carrega o intevalo usado pelo Componete B nessa fase
            listVisCompBPOS=load_vis(visCompBPOS);//carrega a lista de intevalos usados pelo Componete B nessa fase
            listVisCompBPOS=shuffles(listVisCompBPOS);//embaralha a lista de intevalos do Componete
        }
        let returns=random_pick(listVisCompBPOS);//Escolhe um intervalo aleatorio e remove da lsita de VIs disponiveis
        usedVisCompB.push(returns);//Adiciona o intervalo removido a lista de intevalos usados
        return returns;//Retorna o intervalo que devera ser usado
     }
}