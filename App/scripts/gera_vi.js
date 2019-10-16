//arquivos que o codigo acessa
var experimentJSON=load_experiment();//arquivo com as configurações do teste
var listJSON=return_lista();//arquivo com as listas dos VIs
//objetos do JSON experiment
var stagesSet=return_stagesSet();
var stages=return_stages();
//constantes do codigo
//var maxIndex=stagesSet.NumberOfStages;//numero de indices que o teste tera
var indexOfPhases=0;//indice das fases
var listVIsUseds=[];//lista de objeto JSON
var maxIndex=stagesSet.NumberOfStages;//numero de indices que o teste tera
var compA;
var compB;
/**carregar arquivos*/
//carrega experiment.json
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
//carrega lista.json
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
//carrega objetos do experinet JSON
function return_stages(){
    return experimentJSON.Stages;
}
function return_stagesSet(){
    return experimentJSON.StagesSet;
}
function return_testSet(){
    return experimentJSON.TestSet;
}
module.exports = {
    comp_creator : function(Component){
        var Comp={};
        Comp.indexComp=indexOfPhases;//indice do Componente
        if(Component==="A"){
            Comp.visCompPOS=stages[this.indexComp].CompA.ComponentViPOS;//lista dos VIs do Componente positivo
            Comp.visCompNEG=stages[this.indexComp].CompA.ComponentViNEG;//lista dos VIs do Componente negativo
        }
        else{
            Comp.visCompPOS=stages[this.indexComp].compB.ComponentViPOS;//lista dos VIs do Componente positivo
            Comp.visCompNEG=stages[this.indexComp].CompB.ComponentViNEG;//lista dos VIs do Componente negativo
        }
        Comp.visComp=[];
        Comp.listVisCompPOS=[];//lista dos VIs positivos do Componente 
        Comp.listVisCompNEG=[];//lista dos VIs negativos do Componente
        this.fill();//prenche as listas dos VIs 
        this.listVisCompPOS=this.shuffles(this.listVisCompPOS);//embaralha a lista dos VIs positivos
        this.listVisCompNEG=this.shuffles(this.listVisCompNEG);//embaralha a lista dos VIs negativos
        
        //metodos do objeto
        this.fill = function(){
            this.visCompPOS=this.load_vis(this.visCompPOS);//carrega a lista positiva que sera usada no Comp
            this.visCompNEG=this.load_vis(this.visCompNEG);//carrega a lista negativa que sera usada no Comp
        };
        this.load_vis = function(interval){//carrega a lista do Componete de acordo com o intervalo selecionado
            let list=listJSON;
            let usedVI=['VI.vi',interval,'.vi'];
            usedVI=usedVI.join('');
            usedVI = usedVI.split('.');
            usedVI.forEach((item) => {
            list = list[item];
            })
            return list;
        };
        this.shuffles = function(listVi){//embaralha a lista de intervalos 
            let currentIndex = listVi.length, temp, index_random;
            while (0 !== currentIndex) {
            index_random = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temp = listVi[currentIndex];
            listVi[currentIndex] = listVi[index_random];
            listVi[index_random] = temp;
            }
            return listVi;
        };
        this.random_pick = function(listVI){//está função devolve um valor do vi especifico
            let scrambled=this.shuffles(listVI);//embaralha a lista
            let returns=scrambled.pop();//variavel recebe o ultimo item da lista que esta sendo removido
            listVI=scrambled;//sobrescreve lista que foi modificada
            return returns;//devolve intervalo a ser usado
        };
    },
    generate_vi : function(component){//função devolve um intervalo relacionado ao componente passado
         if(component==="A"){
            return generate_vi_CompA();
         }
         else{
            return generate_vi_CompB();
         }
    },
    /**Processos do Componete A*/
    generate_vi_CompA :function(){
        if(compA===undefined){//cria o Componete A caso não tenha sido criado nessa fase
            compA=comp_creator("A");
            compA.fill();
        }
        if(compA.listVisCompPOS===undefined){//caso a lista de intervalos do Componete A esteja vazia
            compA.listVisCompPOS=compA.load_vis(compA.visCompPOS);
            compA.listVisCompPOS=compA.shuffles(compA.listVisCompPOS);
        }
        let returns=CompA.random_pick(compA.listVisCompPOS);//escolhe um intervalo aleatorio e remove da lsita de VIs disponiveis
        Comp.visComp.push(returns);//adiciona o intervalo removido a lista de intevalos usados
        return returns;//retorna o intervalo que devera ser usado
    },
    /**Processos do Componete B*/
    generate_vi_CompB :function(){
        if(compB===undefined){//cria o Componete A caso não tenha sido criado nessa fase
            compB=comp_creator("B");
            compB.fill();
        }
        if(compB.listVisCompPOS===undefined){//caso a lista de intervalos do Componete B esteja vazia 
            compB.listVisCompPOS=compB.load_vis(compB.visCompPOS);
            compB.listVisCompPOS=compB.shuffles(compB.listVisCompPOS);
        }
        let returns=CompB.random_pick(compB.listVisCompPOS);//escolhe um intervalo aleatorio e remove da lsita de VIs disponiveis
        Comp.visComp.push(returns);//adiciona o intervalo removido a lista de intevalos usados
        return returns;//retorna o intervalo que devera ser usado
    },
    change_phase : function(){//está função troca o indice dos componentes simbolizando a finalização de uma fase
        if(CompA.indexComp<maxIndex && CompB.indexComp<maxIndex){
            CompA.indexComp+=1;
            CompB.indexComp+=1;
        }
        end_phase();//aramazena os dados da fase e limpa as variaveis para a proxima fase
    }, 
    end_phase : function(){//esta função armazena os dados dos VI's utilizados ate o momento e esvazia os componentes 
        let temp={
            "intervals":{
            "componentA":[CompA.visComp],
            "componentB":[CompB.visComp]
            }
        };
        listVIsUseds.push(temp);
        //sempre limpar os componentes antes de finalizar essa função
        CompA=[];
        CompB=[];
    },
    report_intervals: function(){//esta função devolve a lista dos vis utilizados no teste por cada componente
        module.exports.end_phase();
        return listVIsUseds;
    }
}