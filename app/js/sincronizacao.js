
 const moduloUsuario = (function(controlador){ 
        var usuario = "seu.email@exemplo.com.br";


        $(document).on("precisaSincronizar", function(){
            $("#sync").removeClass("botao--sincronizado");
            $("#sync").addClass("botaoSync--esperando");
        });

        $(document).on("precisaSincronizar", function(){
            var cartoes = [];
            
            
            $(".cartao").each(function(){
                var cartao = {};
                cartao.conteudo = $(this).find(".cartao-conteudo").html();
                cartao.cor = $(this).css("background-color");
                cartoes.push(cartao);
            });
            var mural = {
                usuario: usuario,
                cartoes: cartoes
            }
    
            $.ajax({
                url: "http://ceep.herokuapp.com/cartoes/salvar",
                method: "POST",
                data: mural,
                success: function(res){
                    $("#sync").addClass("botaoSync--esperando");
                    console.log(res.quantidade + "cartoes salvos em " + res.usuario);
                },
                error:function(){
                    $("$sync").addClass("botaoSync--deuRuim");
                    console.log("Nao foi possivel salvar o mural");
                },
                complete:function(){
                    $("#sync").removeClass("botaoSync--esperando");
                }
            });
        });

        $("#sync").click(function(){
            $(document).trigger("precisaSincronizar");
        });

        $.getJSON(
            "http://ceep.herokuapp.com/cartoes/carregar?callback=?",
            {usuario:usuario},
            function(res){
                var cartoes = res.cartoes;
                console.log(cartoes.length + " carregados em " + res.usuario);
                cartoes.forEach(function(cartao){
                    controlador.adicionaCartao(cartao.conteudo, cartao.cor);
                });
            }
        );

})(controladorDeCartoes);

