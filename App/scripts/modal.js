var modal = document.getElementById('myModal');
var btn = document.getElementById('coletaPonto');

module.exports = { 
    showModal: function(collectTime, compID){
        modal.style.display = "block";
        btn.onclick = function(){
            modal.style.display = "none"
            clearTimeout(timeout);
            if(compID == "posA")
                componentA.posViCount();
            else if(compID == "posB")
                componentB.posViCount();
            else if(compID == "negA")
                componentA.negViCount();
            else if(compID == "negB")
                componentB.negViCount();
        }
        var timeout = setTimeout(function(){
            modal.style.display = "none";
        }, collectTime);
    }
}