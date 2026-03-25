function getPokemonsByType (typeName){
    let pokemon_list = []

    for(let pokemon of Pokemon.all_pokemons){
        if(pokemon.getTypes()[0] === typeName || pokemon.getTypes()[1] === typeName){
            pokemon_list.push(pokemon)
        }
    }

    for(let pokemon of pokemon_list){
        console.log(pokemon.toString())
    }
}

function getPokemonByAttack (attackName) {
    let pokemon_list = []

    for(let pokemon of Pokemon.all_pokemons){
        if(pokemon.getAttacks().fast.some(a => a.name === attackName) || pokemon.getAttacks().charged.some(a => a.name === attackName)){
            pokemon_list.push(pokemon)
        }
    }

    for(let pokemon of pokemon_list){
        console.log(pokemon.toString())
    }
}

function getAttacksByType(typeName) {
    let attack_list = []

    for(let attack of Attack.all_attacks){
        if(attack.type === typeName){
            attack_list.push(attack)
        }
    } 

    for(let attack of attack_list){
        console.log(attack.toString())
    }
}

function sortPokemonByTypeThenName() {
    let sorted_list = []

    for(let type of Type.all_types){
        let given_type_list = getPokemonsByType(type.name)
        given_type_list.sort()
        sorted_list.push(given_type_list)
    }

    for(let pokemon in sorted_list){
        console.log(pokemon.toString())
    }
}


function getWeakestEnemies(attackName){
    attackType = attackName.type;
    for(let type in Type.all_type){

    }
}

function getWeakestEnemiesEssai(attackName){
    attackType = attackName.type;
    
}
/*

Functions to fill the static array of class Type, Attack and Pokemon

*/

function fill_types() {
    type_effectiveness.forEach(element => {
        let type = new Type(element['effectiveness'], element['name']);
        Type.all_types.push(type);
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
                                type_2 = types['type'][1]
                            }
                            Pokemon.all_pokemons.push(new Pokemon(id, pokemon['pokemon_name'], pokemon['base_stamina'], pokemon['base_attack'], pokemon['base_defense'], type_1, type_2, array_moves))
                        }
                    })
                }
            });
        }
    })
}

fill_types()
console.log(Type.all_types)
fill_attacks()
console.log(Attack.all_attacks)
fill_pokemons()
console.log(Pokemon.all_pokemons)


getPokemonsByType('Normal')
console.log('___________________________________')
getPokemonByAttack('Power Whip')
console.log('___________________________________')
getAttacksByType('Fire')
console.log('___________________________________')
sortPokemonByTypeThenName()
console.log('___________________________________')

console.log('___________________________________')
console.log('___________________________________')