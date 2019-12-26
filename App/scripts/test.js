class test {
  constructor(changeTime, phaseTime, compPAIT, compPBIT) {
    this.changeTime = changeTime;
    this.phaseTime = phaseTime;
    this.changer = 0;
    this.compPAIT=compPAIT;
    this.compPBIT=compPBIT;
  }
  beginChanger() {
    var that = this;
    this.changer = setInterval(function() {
      if (document.getElementById("capiA").hidden == true) {
        that.compPBIT.stopTimer();
        document.getElementById("capiB").hidden = true;
        setTimeout(function() {
          document.getElementById("capiA").hidden = false;
        }, 1000);
      } else if (document.getElementById("capiB").hidden == true) {
        that.compPAIT.stopTimer();
        document.getElementById("capiA").hidden = true;
        setTimeout(function() {
          document.getElementById("capiB").hidden = false;
        }, 1000);
      }
    }, this.changeTime);
  }
  stopChanger(){
      clearInterval(this.changer);
  }

}

module.exports = test;
