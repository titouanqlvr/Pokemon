function getPokemonsByType (typeName){
    let pokemon_list = []

    for(let pokemon of Pokemon.all_pokemons){
        if(pokemon.getTypes()[0] === typeName || pokemon.getTypes()[1] === typeName){
            pokemon_list.push(pokemon)
        }
    }

    let compteur = 0
    for(let pokemon of pokemon_list){
        compteur++
        console.log("<ici le " + pokemon.toString() + " du " + compteur + "Pokémon")
    }
}

function getPokemonByAttack (attackName) {
    let pokemon_list = []

    for(let pokemon of Pokemon.all_pokemons){
        if(pokemon.getAttacks().fast.some(a => a.name === attackName) || pokemon.getAttacks().charged.some(a => a.name === attackName)){
            pokemon_list.push(pokemon)
        }
    }

    let compteur = 0
    for(let pokemon of pokemon_list){
        compteur++
        console.log("<ici le " + pokemon.toString() + " du " + compteur + "Pokémon")
    }
}




function fill_types() {
    typeEfficienty.forEach(element => {
        let type = new Type(element['type_effectiveness'], element['type']);
        Type.all_type.push(type);
    })
}


function fill_attacks() {
    fast_moves.forEach(element => {
        let attack = new Attack(element['move_id'],element['name'],element['type'],element['power'],element['duration'],fast = 1)
        Attack.all_attacks.push(attack)
    })

    charged_moves.forEach(element => {
        let attack = new Attack(element['move_id'],element['name'],element['type'],element['power'],element['duration'], charged = 1)
        Attack.all_attacks.push(attack)
    })
}

function fill_pokemons() {
    pokemons.forEach(pokemon => {
        if(pokemon['form'] == "Normal"){
            let id = pokemon['pokemon_id']
            pokemon_moves.forEach(moves => {
                if(moves['pokemon_id'] === id && moves['form'] === "Normal"){
                    let array_moves = {"charged_moves" : moves['charged_moves'],"fast_moves" : moves['fast_moves']}
                    pokemon_types.forEach(types => {
                        if(types['pokemon_id'] === id && types['form'] === "Normal"){
                            let type_1 = types['type'][0]
                            let type_2 = null
                            if(types['type'][1]){
                                let type_2 = types['type'][1]
                            }
                            Pokemon.all_pokemons.push(new Pokemon(id, pokemon['pokemon_name'], pokemon['base_stamina'], pokemon['base_attack'], pokemon['base_defense'], type_1, type_2, array_moves))
                        }
                    })
                }
            });
        }
    })
}

fill_attacks()
console.log(Attack.all_attacks)
fill_pokemons()
console.log(Pokemon.all_pokemons)


getPokemonsByType('Normal')
console.log('___________________________________')
getPokemonByAttack('Power Whip')