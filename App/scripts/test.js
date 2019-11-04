class test {
  constructor(changeTime, phaseTime) {
    this.changeTime = changeTime;
    this.phaseTime = phaseTime;
    this.changer = 0;
  }
  beginChanger() {
    this.changer = setInterval(function() {
      if (document.getElementById("capiA").hidden == true) {
        document.getElementById("capiB").hidden = true;
        setTimeout(function() {
          document.getElementById("capiA").hidden = false;
        }, 1000);
      } else if (document.getElementById("capiB").hidden == true) {
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
