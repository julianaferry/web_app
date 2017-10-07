var criaOpcoesDoCartao = (function() {
    "use strict";

    function removeCartao(){
        var cartao = document.querySelector("#cartao_" + this.dataset.ref);
        cartao.classList.add("cartao--some");
        setTimeout(function(){
            cartao.remove();
            $(document).trigger("precisaSincronizar");
        },200);
    }

    var ehPraEditar = false;
    function toggleEdicao(){
        var cartao = $("#cartao_" + this.dataset.ref);

        var conteudo = cartao.find(".cartao-conteudo");

        if(ehPraEditar){
            ehPraEditar = false;
            conteudo.attr("contenteditable", false);
            conteudo.blur();
        } else {
            ehPraEditar = true;
            conteudo.attr("contenteditable", true);
            conteudo.focus();
        }
    }

    function opcoesDeCoresDoCartao(idNovoCartao){
        var cores = [
            {nome:"Padrao", codigo:"#EBEF40"},
            {nome:"Importante", codigo:"#F05450"},
            {nome:"Tarefa", codigo:"#92C4EC"},
            {nome:"Inspiracao", codigo:"#76EF40"}
        ];

        var opcoesDeCor = $("<div>").addClass("opcoesDoCartao-cores")
                                    .attr("data-ref", idNovoCartao);

        cores.forEach(function(cor){

            var idInputCor = "cor" + cor.nome + "_cartao" + idNovoCartao;

            var inputCor = $("<input>").attr("type","radio")
                                        .attr("name","corDoCartao" + idNovoCartao)
                                        .val(cor.codigo)
                                        .attr("id",idInputCor)
                                        .addClass("opcoesDoCartao-radioCor");

            var labelCor = $("<label>").css("color",cor.codigo)
                                        .attr("for", idInputCor)
                                        .attr("tabindex", 0)
                                        .addClass("opcoesDoCartao-cor")
                                        .addClass("opcoesDoCartao-opcao")
                                        .text(cor.nome);


            opcoesDeCor.data("ref",idNovoCartao).append(inputCor).append(labelCor);    

        });

        opcoesDeCor.on("change", function(event) {
            
            var elemento = event.target;
            if (elemento.classList.contains("opcoesDoCartao-radioCor")) {
                var cor = $(elemento);
                var cartao = $("#cartao_"+ $(this).data("ref"));

                cartao.css("background-color", cor.val());

                $(document).trigger("precisaSincronizar");
            }
        });

        return opcoesDeCor;
    }

    return function(idNovoCartao){

        var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                        .addClass("opcoesDoCartao-opcao")
                                        .attr("data-ref", idNovoCartao)
                                        .text("Remover")
                                        .click(removeCartao);

        var botaoEdita = $("<button>").addClass("opcoesDoCartao-edita")
                                        .addClass("opcoesDoCartao-opcao")
                                        .attr("data-ref", idNovoCartao)
                                        .text("Editar")
                                        .click(toggleEdicao);

        var opcoesDeCor = opcoesDeCoresDoCartao(idNovoCartao);

        var opcoes = $("<div>").addClass("opcoesDoCartao")
                                .append(botaoRemove)
                                .append(botaoEdita)
                                .append(opcoesDeCor);
                            
        return opcoes;

    }
})();


