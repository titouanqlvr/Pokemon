
/**
 * 
 * Functions
 * 
 */

function printXPokemon(x,stage){

    tbody.innerHTML = ""

    const start = (stage - 1) * x
    const end = start + x
    let new_pokemons = Object.values(Pokemon.all_pokemons).slice(start,end)

    for(let pokemon of new_pokemons){
        let tr = document.createElement("tr")

        let td0 = document.createElement("td")
        td0.appendChild(document.createTextNode(pokemon.id_pokemon))

        let td1 = document.createElement("td")
        td1.appendChild(document.createTextNode(pokemon.name))

        let td2 = document.createElement("td")
        let type1 = pokemon.getTypes()[0].name

        if(pokemon.getTypes().length == 2){
            let type2 = pokemon.getTypes()[1].name
            td2.appendChild(document.createTextNode(type1 + " / " + type2))
        } else {
            td2.appendChild(document.createTextNode(type1))
        }

        let td3 = document.createElement("td")
        td3.appendChild(document.createTextNode(pokemon.stamina))

        let td4 = document.createElement("td")
        td4.append(document.createTextNode(pokemon.atk))

        let td5 = document.createElement("td")
        td5.appendChild(document.createTextNode(pokemon.def))


        let id_pokemon = ""
        if(pokemon.id_pokemon < 10){
            id_pokemon = "00" + pokemon.id_pokemon
        } else if(pokemon.id_pokemon < 100 && pokemon.id_pokemon >= 10){
            id_pokemon = "0" + pokemon.id_pokemon
        } else {
            id_pokemon = pokemon.id_pokemon
        }
        let img = document.createElement("img")
        img.setAttribute('src', 'webp/webp/images/' + id_pokemon + '.webp')
        img.setAttribute('alt', pokemon.name)
        img.setAttribute('height', '25px')
        img.setAttribute('width', '25px')

        let td6 = document.createElement("td")
        td6.appendChild(img)

        tr.appendChild(td0)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)

        tr.dataset.id = pokemon.id_pokemon

        tbody.appendChild(tr)
    }
}

function nextPage(){
    stage++
    printXPokemon(limitPerPage,stage)
}

function oldPage(){
    if(stage > 1){
        stage--
        printXPokemon(limitPerPage,stage)
    }
}

function statePages(){
    page.textContent = "Numero de page : " + stage + " / " + nbrPages
    if(stage == 1){
        prec.disabled = true
    } else if(stage == nbrPages){
        suiv.disabled = true
    } else {
        prec.disabled = false
        suiv.disabled = false
    }
}

function printPokemonDetails(id_pokemon){
    let pokemon = Pokemon.all_pokemons[id_pokemon]

    detailsZone.classList.add("detailsZone")
    detailsZone.onclick = function (){
        detailsZone
    }

    const h2 = document.createElement("h2")
    h2.innerHTML = "Détail de : " + pokemon.name
    detailsZone.appendChild(h2)

    const table = document.createElement("table")
    const trTop = document.createElement("tr")
    const th0 = document.createElement("th")
    const th1 = document.createElement("th")
    const th2 = document.createElement("th")
    th0.innerHTML = "Endurance"
    th1.innerHTML = "Attaque"
    th2.innerHTML = "Défense"
    trTop.appendChild(th0)
    trTop.appendChild(th1)
    trTop.appendChild(th2)

    const tr = document.createElement("tr")
    const td0 = document.createElement("td")
    const td1 = document.createElement("td")
    const td2 = document.createElement("td")
    td0.innerHTML = pokemon.stamina
    td1.innerHTML = pokemon.atk
    td2.innerHTML = pokemon.def
    tr.appendChild(td0)
    tr.appendChild(td1)
    tr.appendChild(td2)

    table.appendChild(trTop)
    table.appendChild(tr)
    
    detailsZone.appendChild(table)

    shadow.appendChild(detailsZone)
}

function addShadow(){
    shadow.classList.add("shadow")
    
    shadow.onclick = function (){
        shadow.remove()
        detailsZone.innerHTML = ""
        detailsZone.remove()
    }
    
    pageBody.appendChild(shadow)
}


/**
 * 
 * Variables
 * 
 */
const pageBody = document.getElementById("body")

const tbody = document.getElementById("tbody")

const limitPerPage = 25
let stage = 1

const prec = document.getElementById("prec")
const suiv = document.getElementById("suiv")
const page = document.getElementById("page")

let nbrPages = Math.ceil(Object.values(Pokemon.all_pokemons).length / limitPerPage)

const shadow = document.createElement("div")
const detailsZone = document.createElement("article")


/**
 * 
 * Direct execution
 * 
 */

statePages()
printXPokemon(limitPerPage,stage)

/**
 * 
 * Listener on DOM
 * 
 */

prec.addEventListener('click', (e) => {
    statePages()
})
suiv.addEventListener('click', (e) => {
    statePages()
})

tbody.addEventListener('click', (e) => {
    addShadow()
    printPokemonDetails(e.target.closest("tr").dataset.id)
})
