class interactionTime{
    constructor(){
        this.iT = 0;
        this.tT = 0;
        this.timer = 0;
    }
    getClick(){
        var that = this;
        if(that.iT == 0){
            that.iT = 0;
            this.startTimer();
        }
        else{
            if(that.iT <= 1500){
                that.tT+=that.iT;
                this.startTimer();
            }
            else{
                this.startTimer();
            }
        }
    }
    startTimer(){
        var that = this;
        this.stopTimer();
        that.timer = setInterval(function() {
            that.iT += 100;
          }, 100);
    }
    stopTimer(){
        var that = this;
        clearInterval(that.timer);
        that.iT = 0;
    }
}
module.exports = interactionTime;