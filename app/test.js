
for(var i=0; i<10; i++){

    var botao = $("<button>").click(clicado).text("botao " + i);
    $("#painel").append(botao);
}

function clicado(){
    alert(1);
}