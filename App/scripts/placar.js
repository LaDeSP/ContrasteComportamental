//Timer do placar

setInterval(function (){
    let placar = document.getElementById('placar');
    if(placar.hidden == false)
        placar.hidden = true;
    else
        placar.hidden = false;
}, 10000);