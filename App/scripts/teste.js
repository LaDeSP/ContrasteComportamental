var compA = document.getElementById('capiA');
var compB = document.getElementById('capiB');
setInterval(function(){
    if(compA.hidden == true){
        compB.hidden = true;
        compA.hidden = false;
    }
    else if(compB.hidden == true){
        compA.hidden = true;
        compB.hidden = false;
    }
}, 3000);