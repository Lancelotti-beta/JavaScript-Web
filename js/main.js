

const form = document.getElementById('novoItem')
const lista = document.getElementById('lista')

const arrayLocal = []

form.addEventListener('submit', e => {
    e.preventDefault()

    const nome = e.target.elements['nome']
    const quantidade = e.target.elements['quantidade']

    lista.appendChild(criaElementoDaLista(nome.value, quantidade.value))

    nome.value = ""
    quantidade.value = ""
})

function criaElementoDaLista(nome, quantidade) {
    //<li class="item"><strong></strong></li>
    const li = document.createElement('li')
    li.classList.add('item')
    const strong = document.createElement('strong')
    strong.innerHTML = quantidade

    li.appendChild(strong)
    //concatenando elemento <strong/> com <li/>
    li.innerHTML += nome

    armazenaItensNoLocalStorage(nome, quantidade)
    return li
}

function armazenaItensNoLocalStorage(nome, quantidade) {
    arrayLocal.push(localStorage.setItem('item', nome))
    arrayLocal.push(localStorage.setItem('quantidade', quantidade))
}
