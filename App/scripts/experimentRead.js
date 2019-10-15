module.exports = {
  le_exeperimet: function() {
    var resposta;

    var fs = require("fs"),
      path = require("path");
    filePath = path.join(__dirname + "/json", "experiment.json");
    //console.log(__dirname);
    try {
      var fsResposta = fs.readFileSync(filePath);
      var resposta = JSON.parse(fsResposta);
    } catch (error) {
      return false;
    }
    return resposta;
  },
  componentA: function(index_phase) {
    let experiment = module.exports.le_exeperimet();
    let color = experiment.phases[index_phase].componentA_color;
    console.log(color);
    return color;
  },
  componentB: function(index_phase) {
    let experiment = module.exports.le_exeperimet();
    let color = experiment.phases[index_phase].componentB_color;
    return color;
  }
};

export function experimentRead(){
    var resposta;
    
    var fs = require("fs"),
    path = require("path");
    filePath = path.join(__dirname + "/json", "experiment.json");
    //console.log(__dirname);
    try {
        var fsResposta = fs.readFileSync(filePath);
        var resposta = JSON.parse(fsResposta);
    } catch (error) {
       return false;
    }
    return resposta;
    }
}

