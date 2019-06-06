/*criar variaveis usados na estrutura json ressultados*/
var report_results=[];
var phases=[];
var component_A;
var component_B;
module.exports = {

    create_report:function(componentA,componentB){
        /*carrega os dados necessarios*/
        experiment=module.exports.load_experiment();//experiment.json
        lista=module.exports.load_lista();//lista.json
        /* escreve nas variaveis o necessario para o json resultado*/
        var session_time=experiment.game_time //tempo de sessão
        var training_time=experiment.training_time//tempo de treino
        var number_of_phases=experiment.number_of_phases //numero de fases
        var show_score_interval=experiment.score_show //tempo de espera para mostrar a pontuação 
        var total_click_number=componentA.click+componentB.click //calculo feito (cliques no componete A + cliques no componete B + cliques fora do componete A + cliques fora do componete B)
        var component_time=experiment.component_time //tempo de exibição de cada componente
        //numero de fases e fazer o processo abaixo pra cada
        
        /*array phases*/
        for(i=0;i<number_of_phases;i++){
            if(i>0 && i<number_of_phases){
                phases+=", "
            }
            var number_of_cycles=experiment.phases[i].number_of_cycles // quantidade de ciclos de aparição de cada componente
            var interval_time=experiment.phases[i].interval_time // intervalo entre componetes
            /*Objeto Componente*/
            component_A=module.exports.build_component(componentA,i,experiment,lista,1)
            component_B=module.exports.build_component(componentB,i,experiment,lista,2)
        
            phases.push({
            "number_of_cycles":""+number_of_cycles,
            "interval_time":""+interval_time,
            component_A,
            component_B
            })
        }
        report_results= {
            "session_time":session_time,
            "training_time":training_time,
            "show_score_interval": show_score_interval,
            "total_click_number":""+total_click_number,
            "component_time":component_time,
            "number of phases":number_of_phases,
            "phases":phases
        }
        module.exports.whrite_report(report_results)
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
    //carrega lista.json
    load_lista:function(){
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
    
    //constroi o componente
    build_component:function(temp_component,index_phase,experiment,lista,ab){
    
        if(ab==1){
            var vi_used=experiment.phases[index_phase].componentA_vi //VI usado no teste para o componente A
        }
        else{
            var vi_used=experiment.phases[index_phase].componentB_vi //VI usado no teste para o esse componente B
        }
    
        var vi_usado =['VI.vi',experiment.phases[index_phase].componentA_vi]
    
        if(ab==1){
            var number_of_clicks=componentA.click //carrega do objeto que veio de teste_sequencial
        }
        else{
            var number_of_clicks=componentB.click //carrega do objeto que veio de teste_sequencial
        }
    
        vi_usado=vi_usado.join('')
        vi_usado += '.tamanho'
        vi_usado = vi_usado.split('.')
        
        var number_of_intevals = lista //numero de intervalos usado no componente
        
        vi_usado.forEach((item) => {
            number_of_intevals = number_of_intevals[item]
        })
        
        if(ab==1){
            var color=experiment.phases[index_phase].componentA_color //cor do componente      
        }
        else{
            var color=experiment.phases[index_phase].componentB_color //cor do componente      
        }
    
        return temp_component={
            "vi_used":"vi"+vi_used,
            "number_of_clicks":""+number_of_clicks,
            "number_of_intevals":""+number_of_intevals,
            "color":color
        }
    },
    /*grava relatorio*/
    whrite_report :function(report_results){
        var archive;
        var fs = require('fs'),
        path = require('path')
        filePath = path.join(__dirname+'/json', 'results.json' );
        try {
            var fsarchive = fs.readFileSync(filePath)
            var archive = JSON.parse(fsarchive);
        } catch (error) {
            console.log("error")
            return false;
        }
    
        archive.push(report_results)
        let data = JSON.stringify(archive);
        console.log(archive); 
    
        fs.writeFileSync(__dirname+'/json/results.json', data);
    
    }
};