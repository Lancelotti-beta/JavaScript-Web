const form = document.getElementById('novoItem')
const listaUl = document.getElementById('lista')

const arrayLocal = JSON.parse(localStorage.getItem('itens')) || []
arrayLocal.forEach(elemento => {
    adicionaNaLista(elemento)
})



form.addEventListener('submit', e => {
    e.preventDefault()
    const nome = e.target.elements['nome']
    const quantidade = e.target.elements['quantidade']

    const existe = verificaSeExiste(arrayLocal, nome.value)
    const itens = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    if (existe) {
        itens.id = existe.id
        altualizaElemetoDaLista(itens)

        arrayLocal[arrayLocal.findIndex(elemento => elemento.id === existe.id)] = itens
    } else {
        itens.id = arrayLocal[arrayLocal.length - 1] ? (arrayLocal[arrayLocal.length - 1]).id + 1 : 0
        adicionaElemento(itens)
    }

    nome.value = ""
    quantidade.value = ""
})

const verificaSeExiste = (elemento, nome) => {
    return elemento.find(item => item.nome === nome)
} 

function adicionaElemento(elemento) {
    adicionaNaLista(elemento)
    armazenaItensNoLocalStorage(elemento)
}

function armazenaItensNoLocalStorage(item) {
    arrayLocal.push(item)
    return localStorage.setItem('itens', JSON.stringify(arrayLocal))
}

function altualizaElemetoDaLista(item) {
    document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}

function adicionaNaLista(item) {
    return listaUl.appendChild(criaItemLi(item))
}

function criaItemLi(item) {
    //<li class="item"><strong></strong></li>
    const li = document.createElement('li')
    li.classList.add('item')
    const strong = document.createElement('strong')
    strong.innerHTML = item.quantidade
    strong.dataset.id = item.id
    
    li.appendChild(strong)
    //concatenando elemento <strong/> com <li/>
    li.innerHTML += item.nome
    li.appendChild(botaoDeleta(item.id))

    return li
}

function botaoDeleta(id) {
    const botao = document.createElement('button')
    botao.classList.add('botao__deleta')
    botao.innerText = 'X'

    botao.addEventListener('click', e => {
        deletaElemento(e.target.parentNode, id)
    })

    return botao
}

function deletaElemento(tag, id) {
    tag.remove()
    arrayLocal.splice(arrayLocal.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem('itens', JSON.stringify(arrayLocal))

    /* 
    //Minha solução - o Bug é que alguns itens são alterados quando se é deletado, acredito qué por causa do 'id'
    //Pois ao deletar o item no indece 0 ele volvou e quando alterei uma quantidade de um item ele alterou outro item

        arrayLocal.splice(arrayLocal.indexOf(nome), 1)
        localStorage.setItem('itens', JSON.stringify(arrayLocal))

    */
}
