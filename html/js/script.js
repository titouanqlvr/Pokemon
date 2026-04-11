/**
 * 
 * Functions
 * 
 */

function printXPokemon(x = limitPerPage, stage, pokemon_list = Pokemon.all_pokemons) {

    nbrPages = Math.ceil(Object.values(pokemon_list).length / limitPerPage)
    statePages()

    tbody.innerHTML = ""

    const start = (stage - 1) * x
    const end = start + x
    let new_pokemons = Object.values(pokemon_list).slice(start, end)

    for (let pokemon of new_pokemons) {

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
            popupImg = createPokemonImage(pokemon.id_pokemon)
            popup.append(popupImg)
        })
        img.addEventListener('mouseleave', (e) => {
            if (popupImg) {
                popupImg.remove()
                popupImg = null
            }
        })
        let td = document.createElement("td")
        td.appendChild(img)
        tr[0].appendChild(td)
        tbody.appendChild(tr[0])
    }
}

function nextPage() {
    stage++
    printXPokemon(limitPerPage, stage, currentList) 
}

function oldPage() {
    if (stage > 1) {
        stage--
        printXPokemon(limitPerPage, stage, currentList)
    }
}

function statePages() {
    if (nbrPages === 0) {
        page.textContent = "Aucun pokemon trouvé"
    } else {
        page.textContent = "Numero de page : " + stage + " / " + nbrPages
    }
    if (stage == 1) {
        prec.disabled = true
        if (stage == nbrPages) {
            suiv.disabled = true
        } else {
            suiv.disabled = false
        }
    } else if (stage == nbrPages) {
        suiv.disabled = true
        prec.disabled = false
    } else {
        prec.disabled = false
        suiv.disabled = false
    }
}

function printPokemonDetails(id_pokemon) {
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
    addShadow()
    shadow.appendChild(detailsZone)
}

function createPokemonImage(id_pokemon, width = 25, height = 25) {
    let imgId = ""

    if (id_pokemon < 10) {
        imgId = "00" + id_pokemon
    } else if (id_pokemon < 100 && id_pokemon >= 10) {
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

function addShadow() {
    shadow.classList.add("shadow")

    shadow.onclick = function () {
        shadow.remove()
        detailsZone.innerHTML = ""
        detailsZone.remove()
    }

    pageBody.appendChild(shadow)
}

function getFastAttack() {
    fast_a = {}
    for (let attack in Attack.all_attacks) {
        if (Attack.all_attacks[attack].fast == 1) {
            fast_a[attack] = Attack.all_attacks[attack]
        }
    }
    return fast_a
}


function filterPokemon(inputSearch = "", type_name = "", attack_id = "") {
    filter = {}

    if (inputSearch != "") {
        for (let pokemon in Pokemon.all_pokemons) {
            if (Pokemon.all_pokemons[pokemon].name.toLowerCase().includes(inputSearch)) {
                filter[pokemon] = Pokemon.all_pokemons[pokemon]
            }
        }
    } else {
        filter = { ...Pokemon.all_pokemons }
    }

    if (selectedType.children().length == 1) {
        let type = Type.all_types[type_name]
        filter = getPokemonsByType(type.name, filter)
    } else if (type_name != "" && selectedType.children().length < 1) {
        let type = Type.all_types[type_name]

        selectedType.append($(`<p class="added" data-id="${type.name}">${type.name} X</p>`))

        filter = getPokemonsByType(type.name, filter)

        delete types[type.name]

        searchType.val("")
        resultSearchType.empty()
        resultSearchType.css("display", "none")
    }

    if (selectedAttack.children().length == 1) {
        let attack = Attack.all_attacks[attack_id]
        filter = getPokemonByAttack(attack.name, filter)
    } else if (attack_id != "" && selectedAttack.children().length < 1) {
        let attack = Attack.all_attacks[attack_id]

        selectedAttack.append($(`<p class="added" data-id="${attack.id_attack}">${attack.name} X</p>`))

        filter = getPokemonByAttack(attack.name, filter)

        delete attacks[attack.id_attack]

        searchAttack.val("")
        resultSearchAttack.empty()
        resultSearchAttack.css("display", "none")
    }

    stage = 1
    currentList = Object.values(filter) // ← on sauvegarde la liste filtrée
    printXPokemon(limitPerPage, stage, currentList)
}

function resetSort() {
    boldToNormal()
    currentList = Object.values(Pokemon.all_pokemons)
    stage = 1
    selectedType.empty()
    selectedAttack.empty()
    inputSearch.val("")
    printXPokemon(limitPerPage,stage,currentList)
}

function boldToNormal() {
    sortByAtk.css("font-family","police")
    sortByDef.css("font-family","police")
    sortById.css("font-family","police")
    sortByStamina.css("font-family","police")
    sortByName.css("font-family","police")
    sortByType.css("font-family","police")
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

const popup = $("#popupImg")

let filter = Pokemon.all_pokemons
let currentList = Object.values(Pokemon.all_pokemons) 

// variable for the research
const inputSearch = $("#search")

const searchAttack = $("#searchAttack")
const resultSearchAttack = $("#resultSearchAttack")
const selectedAttack = $("#selectedAttack")
let attacks = getFastAttack()

const searchType = $("#searchType")
const resultSearchType = $("#resultSearchType")
const selectedType = $("#selectedType")
let types = { ...Type.all_types }

/**
 * 
 * Direct execution
 * 
 */

printXPokemon(limitPerPage, stage, currentList)

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
    printPokemonDetails(e.target.closest("tr").dataset.id)
})

inputSearch.on("input", function () {
    $(this).val($(this).val().replace(/[éèê]/g,"e"))
    filterPokemon($(this).val().toLowerCase(), selectedType.children().first().data("id"), selectedAttack.children().first().data("id"))
})

searchType.on("input", function () {
    resultSearchType.empty()
    if ($(this).val() != "" && selectedType.children().length < 1) {
        for (let t in types) {
            if (types[t].name.toLowerCase().includes($(this).val())) {
                let p = $(`<p data-id="${types[t].name}">${types[t].name}</p>`)
                resultSearchType.append(p)
            }
        }
        resultSearchType.css("display", "block")
    } else {
        resultSearchType.css("display", "none")
    }
})

resultSearchType.on("click", function (e) {
    filterPokemon(inputSearch.val(), $(e.target).closest("p").data("id"), selectedAttack.children().first().data("id"))
})

selectedType.on('click', function (e) {
    $(e.target).closest("p").remove()
    types[Type.all_types[$(e.target).closest("p").data("id")].name] = Type.all_types[$(e.target).closest("p").data("id")]
    filterPokemon(inputSearch.val(), "", selectedAttack.children().first().data("id"))
})

searchAttack.on("input", function () {
    resultSearchAttack.empty()
    if ($(this).val() != "" && selectedAttack.children().length < 1) {
        for (let attack in attacks) {
            if (attacks[attack].name.toLowerCase().includes($(this).val())) {
                let p = $(`<p data-id="${attacks[attack].id_attack}">${attacks[attack].name}</p>`)
                resultSearchAttack.append(p)
            }
        }
        resultSearchAttack.css("display", "block")
    } else {
        resultSearchAttack.css("display", "none")
    }
})

resultSearchAttack.on('click', function (e) {
    filterPokemon(inputSearch.val(), selectedType.children().first().data("id"), $(e.target).closest("p").data("id"))
})

selectedAttack.on('click', function (e) {
    $(e.target).closest("p").remove()
    attacks[$(e.target).closest("p").data("id")] = Attack.all_attacks[$(e.target).closest("p").data("id")]
    filterPokemon(inputSearch.val(), selectedType.children().first().data("id"), "")
})


/**
 * 
 * SORT PART
 * 
 */

const sortById = $("#sortById")
let stateID = 0
sortById.on("click", function () {
    boldToNormal()
    sortById.css("font-family","boldPolice")

    stage = 1
    const table = [...Object.values(filter)] 
    if (stateID % 2 === 0) {
        table.sort((a, b) => a.id_pokemon - b.id_pokemon)
    } else {
        table.sort((a, b) => b.id_pokemon - a.id_pokemon)
    }
    stateID++
    currentList = table 
    printXPokemon(limitPerPage, stage, currentList)
})

const sortByName = $("#sortByName")
let state = 0
sortByName.on("click", function () {
    boldToNormal()
    sortByName.css("font-family","boldPolice")

    stage = 1
    const table = [...Object.values(filter)]
    if (state % 2 === 0) {
        table.sort((a, b) => a.name.localeCompare(b.name))
    } else {
        table.sort((a, b) => b.name.localeCompare(a.name))
    } 
    state++
    currentList = table 
    printXPokemon(limitPerPage, stage, currentList)
})

const sortByType = $("#sortByType")
let stateType = 0
sortByType.on("click", function () {
    boldToNormal()
    sortByType.css("font-family","boldPolice")

    stage = 1
    const table = sortPokemonByTypeThenName(filter)
    if (stateType % 2 === 0) {
        currentList = table 
    } else {
        currentList = [...table].reverse() 
    }
    stateType++
    printXPokemon(limitPerPage, stage, currentList)
})

const sortByStamina = $("#sortByStamina")
let stateStamina = 0
sortByStamina.on("click", function () {
    boldToNormal()
    sortByStamina.css("font-family","boldPolice")


    stage = 1
    const table = [...Object.values(filter)]
    table.sort((a, b) => a.stamina - b.stamina || a.name.localeCompare(b.name))
    if (stateStamina % 2 === 0) {
        currentList = table
    } else {
        currentList = [...table].reverse()
    }
    stateStamina++
    printXPokemon(limitPerPage, stage, currentList)
})

const sortByAtk = $("#sortByAtk")
let stateAtk = 0
sortByAtk.on("click", function () {
    boldToNormal()
    sortByAtk.css("font-family","boldPolice")

    stage = 1
    const table = [...Object.values(filter)]
    table.sort((a, b) => a.atk - b.atk || a.name.localeCompare(b.name))
    if (stateAtk % 2 === 0) {
        currentList = table 
    } else {
        currentList = [...table].reverse() 
    }
    stateAtk++
    printXPokemon(limitPerPage, stage, currentList)
})

const sortByDef = $("#sortByDef")
let stateDef = 0
sortByDef.on("click", function () {
    boldToNormal()
    sortByDef.css("font-family","boldPolice")


    stage = 1
    const table = [...Object.values(filter)]
    table.sort((a, b) => a.def - b.def || a.name.localeCompare(b.name))
    if (stateDef % 2 === 0) {
        currentList = table 
    } else {
        currentList = [...table].reverse() 
    }
    stateDef++
    printXPokemon(limitPerPage, stage, currentList)
})
