
module.exports = {
    gera_vi: function(vi=[]){//está função devolve um valor do vi especifico
      if(vis[0]==undefined){
        var vi=module.exports.load_lista();//isso talvez não deve ficar em definitivo aqui
        vi=module.exports.embaralha(vi);//embaralha aqui
        return vi;
      }
      else{
        intervalo=module.exports.gera_intervalo(vi);
        return intervalo;
      }
      
    },
    gera_intervalo: function(vi=[]){//está função devolve um valor do vi especifico
      var indice=Math.floor((Math.random() * 10));
      var retorna= vi[indice];console.log(retorna);
      module.exports.remove_da_lista(vis,retorna);
      return retorna;
    },
    load_lista : function(){//carrega o json para as variaveis
        var resposta;
        var fs = require('fs'),
        path = require('path')
        filePath = path.join(__dirname+'/json', 'lista.json' );
        //console.log(__dirname);
        try {
          var fsResposta = fs.readFileSync(filePath)
          var resposta = JSON.parse(fsResposta);
        } catch (error) {
          return false;
        }
        var i;
        var list= [];
        for(i=0;i<10;i++){
            list[i]=resposta.vi[i];
        }
        return list;
    },
    embaralha : function(vi){//embaralha as variaveis
      var indice_atual = vi.length, temp, indice_aleatorio;
 
      while (0 !== indice_atual) {
   
          indice_aleatorio = Math.floor(Math.random() * indice_atual);
          indice_atual -= 1;
   
          temp = vi[indice_atual];
          vi[indice_atual] = vi[indice_aleatorio];
          vi[indice_aleatorio] = temp;
      }
   
      return vi;
    },
    remove_da_lista :function(vi, indice){//remove o item usado da lista
      var i;
      var j=0;
      var temp=[];
      len=vi.length;
      for(i=0;i<len;i++){
        if(vi[i]!=indice){
          temp[j]=vi[i];
          j++;
        }
      }
      vi=temp;
    }
};

/*exemplo de uso*/
/*

var vis=[];
var intervalo;


carrega_vi(vis,intervalo)

console.log("vis antes:",vis,"intervalo: ",intervalo);
carrega_vi(vis,intervalo)



console.log("vis depois:",vis,"intervalo: ",intervalo);

function carrega_vi(vi=[],intervalo){
    if(vis[0]==undefined){
        vis=vi_numero.gera_vi();
    }
    else{
        intervalo=vi_numero.gera_intervalo(vis);
        console.log("intervalo",intervalo);
        vis=vi_numero.remove_da_lista(vis,intervalo);
    }
}

*/ 
