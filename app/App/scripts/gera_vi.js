class VIS{
    constructor(){
        this.VIS=[];
        this.available=0;
        this.lastSend=undefined;
    }
    get_interval(interval){//retorna um intervalo da lista
        if(this.available == 0){//verifica se a lista esta vazia e a preenche caso necessario
            this.get_VI(interval);
        }
        return this.remove_return();
    }
    get_VI(interval){//carrega a lista determinada
        this.get_list_interval(interval,this.get_list_archive());
        this.available=10;
    }
    get_list_archive(){//carrega lista.json
        return require("./json/lista.json");
    }
    get_list_interval(interval,listJSON){//carrega a lista de intervalos definida
        let list=listJSON;
        let usedVI=['VI.vi',interval,'.vi'];
        usedVI=usedVI.join('');
        usedVI = usedVI.split('.');
        usedVI.forEach((item) => {
        list = list[item];
        })        
        this.VIS=this.shuffles(list);
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
        if(listVi==this.lastSend){
            listVi=this.shuffles(listVi);
        }
        return listVi;
    }
    remove_return(){//tira e devolve um elemento da lista dos VIS
        let returns=this.VIS[this.available-1];
        this.available-=1;
        this.lastSend=returns;
        return returns;
    }
}
module.exports=VIS;