//Timer do placar
class Placar{
    constructor(showInterval){
        this.showInterval = showInterval;
        this.show;
        this.info = document.getElementById('scoreText').innerHTML;
    }
    scoreShow(){
        this.show = setInterval(function(){
            let placar = document.getElementById('placar');
            if(placar.hidden == false)
                placar.hidden = true;
            else
                placar.hidden = false;
        }, this.showInterval);
    }
    scoreHide(){
        clearInterval(this.show);
    }
}
module.exports = Placar;