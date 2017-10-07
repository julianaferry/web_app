 var  controladorDeCartoes = (function(criaOpcoesCartao){
    "use strict";

    function decideTipoCartao(conteudo){
        var quebras = conteudo.split("<br>").length;
    
        var totalDeLetras = conteudo.replace(/<br>/g," ").length;
    
        var ultimoMaior = "";
        conteudo.replace(/<br>/g," ")
                .split(" ")
                .forEach(function (palavra){
                    if (palavra.length > ultimoMaior.length){
                        ultimoMaior = palavra;
                    }
                });
        var tamMaior = ultimoMaior.length;
        
        var tipoCartao = "cartao--textoPequeno";
        
        if(tamMaior < 9 && quebras < 5 && totalDeLetras < 55){
            tipoCartao = "cartao--textoGrande";
        } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75){
            tipoCartao = "cartao--textoMedio";
        }
    
        return tipoCartao;
    }    

    var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
         for(var i = 0; i < botoes.length; i++){
            botoes[i].addEventListener("click",removeCartao);
    }

        function removeCartao(){
            
            var cartao = document.querySelector("#" + this.dataset.ref);
            
            cartao.classList.add("cartao-some");
                setTimeout(function(){
                    cartao.remove();
                    $(document).trigger("precisaSincronizar");
                },200);
        } 

   var contador = 0;

    function adicionaCartao(conteudo,cor){
        
        contador++;

        var opcoes = criaOpcoesCartao(contador);

        var tipoCartao = decideTipoCartao(conteudo);

        var conteudoTag = $("<p>").addClass("cartao-conteudo")
                                    .addClass("contenteditable")
                                    .append(conteudo);

        $("<div>").attr("id","cartao_" + contador)
                    .attr("tabindex", 0)
                    .addClass("cartao")
                    .addClass(tipoCartao)
                    .append(opcoes)
                    .append(conteudoTag)
                    .css("background-color",cor)
                    .prependTo(".mural");
    }
     var timer;
    function editaCartaoHandler(event){
        clearTimeout(timer);

        timer = setTimeout(function(){
            $(document).trigger("precisaSincronizar");
        },1000);
    }

   /* var time;
    function debounce(event){
        return function(){
            clearTimeout(time),
            timer = setTimeout(event,1000);
        }
     
      }*/

   return {
      adicionaCartao: adicionaCartao,
      idUltimoCartao: function() {
          return contador;
      }
   };
})(criaOpcoesDoCartao);
