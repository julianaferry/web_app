(function(controlador){
    "use strict";

    $(".novoCartao").submit(function(event){
        event.preventDefault();

        var campoConteudo = $(".novoCartao-conteudo");
        var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>")
                                                .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                                                .replace(/\*(.+?)\*/g, "<em>$1</em>")
                                            

        if(conteudo){
            controlador.adicionaCartao(conteudo);
            $(document).trigger("precisaSincronizar");
        }
        
        campoConteudo.val("");
    });
        
})(controladorDeCartoes);



    


      