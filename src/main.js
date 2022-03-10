// referenciando o input
let input = document.querySelector('input[name=tarefa]');

// referenciando o button
let btn = document.querySelector('#botao');

// referenciando a lista
let lista = document.querySelector('#lista');

// card
let card = document.querySelector('.card');

// resgata as tarefas no banco de dados do navegador Storage, JSON.parse transforma string em array
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; // pega valores no banco de dados, 
                                                    //caso não haja cria array vazio para evitar erro

// executar a função para reenderizar a lista
reenderizasTarefas();
                                  
function reenderizasTarefas(){
    // Limpar a listagem de tarefas antes de reenderizar novamente a tela
    lista.innerHTML = '';

    for(tarefa of tarefas){
       
        // Criando item da lista
        let itemLista = document.createElement('li');

        // adicionando classes no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action');

        // adicionar evento de clique no item da lista
        itemLista.onclick = function(){
            deletarTarefa(this);
        }

        // criar um texto
        let itemTexto = document.createTextNode(tarefa);

        // adiciona o texto no item da lista
        itemLista.appendChild(itemTexto);

        //adiciona o item da lista na lista
        lista.appendChild(itemLista);
    }
}



// verificar o clique no botão
btn.onclick = function(){
    // capturar o texto digitado no input
    let novaTarefa = input.value;
   
    // validar o valor, se foi digitada nova tarefa
    if(novaTarefa !==""){
        // atualizar a nova tarefa na lista (array) de tarefas e reenderizar a tela
        tarefas.push(novaTarefa);

        // executar a função para reenderizar as tarefas
        reenderizasTarefas();

        // limpar o input
        input.value = '';

        // limpar mensagens de erro, spans
        removerSpans();

        // Salva os novos dados no banco de dados Storage
        salvarDadosNoStorage();

    } else{
         // limpar mensagens de erro, spans, para deixar apenas um span visivel
         removerSpans();

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa digitar uma tarefa');

        span.appendChild(msg);

        card.appendChild(span);
    }
}

function removerSpans(){
    let spans = document.querySelectorAll('span');

    for( let i = 0; i < spans.length; i++ ){
        card.removeChild(spans[i]);
    }
}

function deletarTarefa (tar){
    // limpar mensagens de erro, spans, para deixar apenas um span visivel
    removerSpans();

    // remove a tarefa do array tarefas
    tarefas.splice(tarefas.indexOf(tar.textContent),1);

    // reeenderiza novamente a tela
    reenderizasTarefas();

    // Salva os novos dados no banco de dados Storage
    salvarDadosNoStorage();
}

function salvarDadosNoStorage(){
    
    localStorage.setItem('tarefas', JSON.stringify(tarefas));  // JSON transfora array m string

}


