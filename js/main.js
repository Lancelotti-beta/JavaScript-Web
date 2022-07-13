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

    const itens = {
        'nome': nome.value,
        'quantidade': quantidade.value
    }

    adicionaNaLista(itens)
    armazenaItensNoLocalStorage(itens)

    nome.value = ""
    quantidade.value = ""
})

function adicionaNaLista(item) {
    return listaUl.appendChild(criaItemLi(item))
}

function criaItemLi(item) {
    //<li class="item"><strong></strong></li>
    const li = document.createElement('li')
    li.classList.add('item')
    const strong = document.createElement('strong')
    strong.innerHTML = item.quantidade
    
    li.appendChild(strong)
    //concatenando elemento <strong/> com <li/>
    li.innerHTML += item.nome

    return li
}

function armazenaItensNoLocalStorage(item) {
    arrayLocal.push(item)
    return localStorage.setItem('itens', JSON.stringify(arrayLocal))
}
