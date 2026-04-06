
/**
 * 
 * Functions
 * 
 */

function printXPokemon(x,stage,pokemon_list = Object.values(Pokemon.all_pokemons)){

    nbrPages = Math.ceil(pokemon_list.length / limitPerPage)
    statePages()

    tbody.innerHTML = ""

    const start = (stage - 1) * x
    const end = start + x
    let new_pokemons = pokemon_list.slice(start,end)
    
    for(let pokemon of new_pokemons){

        let tr = $(`
            <tr data-id="${pokemon.id_pokemon}">
                <td>${pokemon.id_pokemon}</td>
                <td>${pokemon.name}</td>
                <td>${pokemon.getTypes()[0].name + (pokemon.getTypes()[1] != null ? " / " + pokemon.getTypes()[1].name : "")}</td>
                <td>${pokemon.stamina}</td>
                <td>${pokemon.atk}</td>
                <td>${pokemon.def}</td>
            </tr>
        `)
        let img = createPokemonImage(pokemon.id_pokemon)
        let popupImg = null
        img.addEventListener('mouseenter', (e) => {
            popupImg = createPokemonImage(pokemon.id_pokemon, 100, 100)
            // popupImg.className = "popupImg"
            pageBody.appendChild(popupImg)
        })
        img.addEventListener('mouseleave', (e) => {
            if(popupImg){
                popupImg.remove()
                popupImg = null
            }
        })
        tr[0].appendChild(img)
        tbody.appendChild(tr[0])
    }
}

function nextPage(){
    stage++
    if(filter){
        printXPokemon(limitPerPage,stage, filter)
    } else {
        printXPokemon(limitPerPage,stage)
    }
}

function oldPage(){
    if(stage > 1){
        stage--
        if(filter){
            printXPokemon(limitPerPage,stage, filter)
        } else {
            printXPokemon(limitPerPage,stage)
        }
   
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

    const h2 = document.createElement("h2")
    h2.innerHTML = "Détail de : " + pokemon.name + " #" + pokemon.id_pokemon
    detailsZone.appendChild(h2)

    detailsZone.appendChild(createPokemonImage(pokemon.id_pokemon))

    const p = document.createElement("p")
    p.innerHTML = pokemon.getTypes()[0].name + (pokemon.getTypes()[1] != null ? " / " + pokemon.getTypes()[1].name : "")  
    detailsZone.appendChild(p)

    const table = document.createElement("table")
    let trTop = $(`
        <tr>
            <th>Endurance</th>
            <th>Attaque</th>
            <th>Défense</th>
        </tr>
    `)

    let tr = $(`
        <tr>
            <td>${pokemon.stamina}</td>
            <td>${pokemon.atk}</td>
            <td>${pokemon.def}</td>
        </tr>
    `)

    table.appendChild(trTop[0])
    table.appendChild(tr[0])
    detailsZone.appendChild(table)
    
    let tableAttack = document.createElement("table")
    let thead = $(`
        <thead>
            <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Type</th>
                <th>Puissance</th>
                <th>Durée</th>
                <th>Rapide</th>
                <th>Chargé</th>
            </tr>
        </thead>
    `)
    tableAttack.appendChild(thead[0])

    let tbody = document.createElement("tbody")

    for (let attack of pokemon.fast_attack.concat(pokemon.charged_attack)) {
        let tr = $(`
            <tr>
                <td>${attack.id_attack}</td>
                <td>${attack.name}</td>
                <td>${attack.type}</td>
                <td>${attack.power}</td>
                <td>${attack.duration}</td>
                <td>${attack.fast === 1 ? "X" : ""}</td>
                <td>${attack.charged === 1 ? "X" : ""}</td>
            </tr>
        `)
        tbody.appendChild(tr[0])
    }
    tableAttack.appendChild(tbody)

    detailsZone.appendChild(tableAttack)
    shadow.appendChild(detailsZone)
}

function createPokemonImage(id_pokemon, width = 25, height = 25){
    let imgId = ""

    if(id_pokemon < 10){
        imgId = "00" + id_pokemon
    } else if(id_pokemon < 100 && id_pokemon >= 10){
        imgId = "0" + id_pokemon
    } else {
        imgId = id_pokemon
    }
    let img = document.createElement("img")
    img.setAttribute('src', 'webp/images/' + imgId + '.webp')
    img.setAttribute('alt', Pokemon.all_pokemons[id_pokemon].name)
    img.setAttribute('height', height)
    img.setAttribute('width', width)

    return img
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

function fillSelectWithType(){

    for(let type of Object.values(Type.all_types)){
        let option = $("<option>").text(type.name).val(type.name)
        $(selectType).append(option)
    }
}


/**
 * 
 * Variables
 * 
 */
const pageBody = $("#body")[0]

const tbody = $("#tbody")[0]

const limitPerPage = 25
let stage = 1

const prec = $("#prec")[0]
const suiv = $("#suiv")[0]
const page = $("#page")[0]

let nbrPages = Math.ceil(Object.values(Pokemon.all_pokemons).length / limitPerPage)

const shadow = document.createElement("div")
const detailsZone = document.createElement("article")

let filter = null

const selectType = $("#selectType")

/**
 * 
 * Direct execution
 * 
 */

printXPokemon(limitPerPage,stage)
fillSelectWithType()

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

selectType.on("change", function() {
    if($(this).val() != ""){
        filter = getPokemonsByType($(this).val())
        printXPokemon(limitPerPage,stage,filter)
    } else {
        filter = null
        printXPokemon(limitPerPage, stage)
    }
})