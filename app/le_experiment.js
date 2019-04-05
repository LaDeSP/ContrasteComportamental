exports.le_exeperimet = function() {
    var resposta;

    var fs = require('fs'),
    path = require('path')
    filePath = path.join(__dirname+'/json', 'experiment.json' );
    //console.log(__dirname);
    try {
      var fsResposta = fs.readFileSync(filePath)
      var resposta = JSON.parse(fsResposta);
    } catch (error) {
      return false;
    }
    return resposta;
  }