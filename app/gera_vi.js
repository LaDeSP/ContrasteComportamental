var interval_componentA=0;
var vi_componentA = [];
var index_phase=0;
var number_of_phases_componentA;
var interval_componentB=0;
var vi_componentB = [];
var index_phase=0;
var number_of_phases_componentB;
module.exports = {
  gera_vi_componentA: function(){//está função devolve um valor do vi especifico

    if(vi_componentA[0]===undefined){
      vi_componentA=module.exports.carries_lista_componentA();//isso talvez não deve ficar em definitivo aqui
      vi_componentA=module.exports.embaralha(vi_componentA);//embaralha aqui
    }
    interval_componentA=module.exports.gera_intervalo(vi_componentA,interval_componentA);//talvez tenha problema
    vi_componentA=module.exports.remove_da_lista(vi_componentA,interval_componentA);
    return interval_componentA;
  },
  gera_intervalo: function(vi){//está função devolve um valor do vi especifico
    var index=Math.floor((Math.random() * vi.length));
    var returns= vi[index];
    return returns;
  },
  carries_lista_componentA : function(){//carrega o json para as variaveis
    var lista=module.exports.return_lista();
    var vi_componentA=module.exports.define_vi_cpA(index_phase);
    var vi_used=module.exports.load_vi_componentA(lista)//vi_used//_componentA
    var max=module.exports.max_of_vi(vi_used,lista)
    return module.exports.interval_list(lista,vi_used);
  },
  interval_list:function(lista,vi_used){
    var list=lista
    var vi_usado=['VI.vi',vi_used,'.vi']
    vi_usado=vi_usado.join('')
    vi_usado = vi_usado.split('.')
    vi_usado.forEach((item) => {
      list = list[item]
    })
    return list
  },
  max_of_vi:function(vi_used,lista){
    var max_of_vi=lista
    var vi_usado=['VI.vi',vi_used,'.tamanho']
    vi_usado=vi_usado.join('')
    vi_usado = vi_usado.split('.')
    vi_usado.forEach((item) => {
      max_of_vi = max_of_vi[item]
    })
    return max_of_vi

  },
  load_vi_componentA: function(lista){//func em teste
    var experiment=module.exports.load_experiment()
    var vi_used = lista 
    var vi_usado =['VI.vi',experiment.phases[index_phase].componentA_vi]
    vi_usado=vi_usado.join('')
        vi_usado += '.tamanho'
        vi_usado = vi_usado.split('.')
    vi_usado.forEach((item) => {
      vi_used = vi_used[item]
    })
    return vi_used
  },
  load_experiment:function(){//carrega experiment.json
    var fs = require('fs'),
    path = require('path')
    filePath = path.join(__dirname+'/json', 'experiment.json');
    try {
        var fsexperiment = fs.readFileSync(filePath)
        var experiment = JSON.parse(fsexperiment);
    } catch (error) {
        return false;
    }
    return experiment
  },
  return_lista:function(){//carrega lista.json
    var fs = require('fs'),
    path = require('path')
    filePath = path.join(__dirname+'/json', 'lista.json');
    try {
        var fslista = fs.readFileSync(filePath)
        var lista = JSON.parse(fslista);
    } catch (error) {
        return false;
    }
    return lista
  },
  define_vi_cpA : function(fase){ //devolve o vi usado no teste no componete 1 //func em teste
    var experiment=module.exports.load_experiment();
    number_of_phases=experiment.number_of_phases
    return experiment.phases[fase].componentA_vi
  },
  embaralha : function(vi){//embaralha as variaveis
    var index_atual = vi.length, temp, index_aleatorio;

    while (0 !== index_atual) {
      index_aleatorio = Math.floor(Math.random() * index_atual);
      index_atual -= 1;
      temp = vi[index_atual];
      vi[index_atual] = vi[index_aleatorio];
      vi[index_aleatorio] = temp;
    }
    return vi;
  },
  remove_da_lista :function(vi, returns){//remove o item usado da lista
    var i;
    var j=0;
    var temp=[];
    len=vi.length;
    for(i=0;i<len;i++){
      if(vi[i]!=returns){
        temp[j]=vi[i];
        j++;
      }
    }
    return temp;
  },
  /*componenteB */
  gera_vi_componentB: function(){//está função devolve um valor do vi especifico

    if(vi_componentB[0]===undefined){
      vi_componentB=module.exports.carries_lista_componentB();//isso talvez não deve ficar em definitivo aqui
      vi_componentB=module.exports.embaralha(vi_componentB);//embaralha aqui
    }
    interval_componentB=module.exports.gera_intervalo(vi_componentB,interval_componentB);//talvez tenha problema
    vi_componentB=module.exports.remove_da_lista(vi_componentB,interval_componentB);
    return interval_componentB;
  },
  carries_lista_componentB : function(){//carrega o json para as variaveis
    var lista=module.exports.return_lista();
    var vi_componentB=module.exports.define_vi_cpA(index_phase);
    var vi_used=module.exports.load_vi_componentB(lista)//vi_used//_componentB
    var max=module.exports.max_of_vi(vi_used,lista)
    return module.exports.interval_list(lista,vi_used);
  },
  load_vi_componentB: function(lista){//func em teste
    var experiment=module.exports.load_experiment()
    var vi_used = lista 

    var vi_usado =['VI.vi',experiment.phases[index_phase].componentB_vi]
    vi_usado=vi_usado.join('')
        vi_usado += '.tamanho'
        vi_usado = vi_usado.split('.')
        //aqui
    vi_usado.forEach((item) => {
      vi_used = vi_used[item]
    })
    return vi_used
  },
  define_vi_cpA : function(fase){ //devolve o vi usado no teste no componete 1 //func em teste
    var experiment=module.exports.load_experiment();
    number_of_phases=experiment.number_of_phases
    return experiment.phases[fase].componentB_vi
  },
  change_phase: function(){
    if (index_phase<number_of_phases){
      index_phase+=1;
    }
  }
};

