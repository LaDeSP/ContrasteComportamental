//arquivos que o codigo acessa
var experimentJSON=load_experiment();//arquivo com as configurações do teste
var listJSON=return_lista();//arquivo com as listas dos VIs
//objetos do JSON experiment
var stagesSet=return_stagesSet();
var stages=return_stages();
//constantes do codigo
var indexOfPhases=0;//indice das fases
var compUseds=[];//lista de objeto JSON
var maxIndex=stagesSet.NumberOfStages;//numero de indices que o teste tera
var compA;//Objeto Componete A
var compB;//Objeto Componete B
/**carregar arquivos*/
function load_experiment(){//carrega experiment.json
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
function return_lista(){//carrega lista.json
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
//carrega objetos do experiment JSON
function return_stages(){
    return experimentJSON.Stages;
}
function return_stagesSet(){
    return experimentJSON.StagesSet;
}
function return_testSet(){
    return experimentJSON.TestSet;
}
/**Definição de classe*/
class Comp{
    constructor(index,Component){
        this.indexComp=index;//indice do Componente
        this.visCompPOS=this.load_interval_visPos(Component);//VI positivo do Componente indicado para a fase
        this.visCompNEG=this.load_interval_visNeg(Component);//VI negativo do Componente indicado para a fase 
        this.listVisCompPOS=this.load_list(this.visCompPOS);//lista dos VIs positivos do Componente
        this.listVisCompNEG=this.load_list(this.visCompNEG);//lista dos VIs negativos do Componente        
        this.usedVisComp=[];//lista de VIs usados pelo Componete
    }
    //metodos do objeto
    load_interval_visPos(Component){//carrega os indicadores da lista positiva que sera usada no Comp
        if(Component=="A"){
            return stages[this.indexComp].CompA.ComponentViPOS;//lista dos VIs do Componente positivo
        }
        else{
            return stages[this.indexComp].CompB.ComponentViPOS;//lista dos VIs do Componente positivo
        }
    }
    load_interval_visNeg(Component){//carrega os indicadores da lista negativa que sera usada no Comp
        if(Component=="A"){
            return stages[this.indexComp].CompA.ComponentViNEG;//lista dos VIs do Componente negativo
        }
        else{
            return stages[this.indexComp].CompB.ComponentViNEG;//lista dos VIs do Componente negativo
        }
    }
    load_list(interval){//carrega a lista de intervalos definida
        let list=listJSON;
        let usedVI=['VI.vi',interval,'.vi'];
        usedVI=usedVI.join('');
        usedVI = usedVI.split('.');
        usedVI.forEach((item) => {
        list = list[item];
        })
        list=this.shuffles(list);
        return list;
    }
    shuffles(listVi){//embaralha a lista de intervalos 
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
    random_pick(listVI){//está função devolve um valor do vi especifico
        let scrambled=this.shuffles(listVI);//embaralha a lista
        let returns=scrambled.pop();//variavel recebe o ultimo item da lista que esta sendo removido
        listVI=scrambled;//sobrescreve lista que foi modificada
        return returns;//devolve intervalo a ser usado
    }
    visComp_recive_pushed(element){//insere o intervalo definido na lista de intervalos usados
        let temp=[];
        temp=this.usedVisComp;
        temp.push(element);
        this.usedVisComp=temp;
    }
    visComp_recive_poped(){//remove o ultimo intervalo usado na lista de intervalos usados
        let temp=[];
        temp=this.usedVisComp;
        temp.pop();
        this.usedVisComp=temp;
    }
}
module.exports = {
    generate_vi : function(component,type){//função devolve um intervalo relacionado ao componente passado
        if(component==="A"){//verifica de qual componente é necessario enviar o intervalo 
           return module.exports.generate_vi_CompA(type);
        }
        else{
           return module.exports.generate_vi_CompB(type);
        }
   },
   /**Processos do Componete A*/
    generate_vi_CompA :function(type){
        if(compA==undefined){//Constroi o Objeto componente caso ele não tenha sido construido nessa fase
            compA= new Comp(indexOfPhases,"A");
        }
        if(type=="POS"){
            if(compA.listVisCompPOS==undefined){//Verifica se a lista de intervalos do Componente esta vazia e preenche caso necessário
                compA.listVisCompPOS=compA.load_list(compA.visCompPOS);
            }
            let intervalUsed=compA.random_pick(compA.listVisCompPOS);//Sortei um intervalo que sera removido da lista de intervalos
            compA.visComp_recive_pushed(intervalUsed);//Insere o inetervalo usado na lista intevalos 
            return intervalUsed;
        }
        else if(type=="NEG"){
            if(compA.listVisCompNEG==undefined){//Verifica se a lista de intervalos do Componente esta vazia e preenche caso necessário
                compA.listVisCompNEG=compA.load_list(compA.visCompNEG);
            }
            let intervalUsed=compA.random_pick(compA.listVisCompNEG);//Sortei um intervalo que sera removido da lista de intervalos
            compA.visComp_recive_pushed(intervalUsed);//Insere o inetervalo usado na lista intevalos 
            return intervalUsed;
        }
    },
   /**Processos do Componete B*/
    generate_vi_CompB :function(type){
        if(compB==undefined){//Constroi o Objeto componente caso ele não tenha sido construido nessa fase
            compB= new Comp(indexOfPhases,"B");
        }
        if(type=="POS"){
            if(compB.listVisCompPOS==undefined){//Verifica se a lista de intervalos do Componente esta vazia e preenche caso necessário
                compB.listVisCompPOS=compB.load_list(compB.visCompPOS);
            }
            let intervalUsed=compB.random_pick(compB.listVisCompPOS);//Sortei um intervalo que sera removido da lista de intervalos
            compB.visComp_recive_pushed(intervalUsed);//Insere o inetervalo usado na lista intevalos 
            return intervalUsed;
        }
        else if(type=="NEG"){
            if(compB.listVisCompNEG==undefined){//Verifica se a lista de intervalos do Componente esta vazia e preenche caso necessário
                compB.listVisCompNEG=compB.load_list(compB.visCompNEG);
            }
            let intervalUsed=compB.random_pick(compB.listVisCompNEG);//Sortei um intervalo que sera removido da lista de intervalos
            compB.visComp_recive_pushed(intervalUsed);//Insere o inetervalo usado na lista intevalos 
            return intervalUsed;
        }
    },
    change_phase : function(){//está função troca o indice dos componentes simbolizando a finalização de uma fase
        if(CompA.indexComp<maxIndex && CompA.indexComp<maxIndex){
            indexOfPhases+=1;
        }
        module.exports.end_phase();//aramazena os dados da fase e limpa as variaveis para a proxima fase
    }, 
    end_phase : function(){//esta função armazena os dados dos VI's utilizados ate o momento e esvazia os componentes 
        let temp={
            "componentA":[compA],
            "componentB":[compB]
        };
        compUseds.push(temp);
        //sempre limpar os objetos componentes antes de finalizar essa função
        compA=undefined;
        compB=undefined;
    },
    report_intervals: function(){//esta função devolve a lista dos vis utilizados no teste por cada componente
        module.exports.end_phase();
        return compUseds;
    }
}