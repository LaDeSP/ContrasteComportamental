
var vi = [];
var interval=0;
module.exports = {
  gera_vi: function(){//está função devolve um valor do vi especifico
    //console.log("vi antes:",vi);


    if(vi[0]===undefined){
      //console.log("carrega");
      vi=module.exports.load_lista();//isso talvez não deve ficar em definitivo aqui
      vi=module.exports.embaralha(vi);//embaralha aqui
    }

    interval=module.exports.gera_intervalo(vi,interval);
    vi=module.exports.remove_da_lista(vi,interval);
    //console.log("vi depois:",vi);
    //console.log("interval:",interval);
    return interval;
  },
  gera_intervalo: function(vi){//está função devolve um valor do vi especifico
    //console.log("vi antes:",vi);
    var index=Math.floor((Math.random() * vi.length));
    var returns= vi[index];
    return returns;
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
  }
};

