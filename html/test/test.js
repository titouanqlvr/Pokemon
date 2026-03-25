function getPokemonsByType (typeName){
    let pokemon_list = []

    for(let pokemon in Pokemon.all_pokemons){
        if(Pokemon.all_pokemons[pokemon].getTypes()[0].name === typeName){
            pokemon_list.push(Pokemon.all_pokemons[pokemon])
        } else if(Pokemon.all_pokemons[pokemon].getTypes()[1] != null){
            if(Pokemon.all_pokemons[pokemon].getTypes()[1].name === typeName){
                pokemon_list.push(Pokemon.all_pokemons[pokemon])
            }
        }
    }

    for(let pokemon of pokemon_list){
        // console.log(pokemon.toString())
    }

    return pokemon_list
}

function getPokemonByAttack (attackName) {
    let pokemon_list = []

    for(let pokemon in Pokemon.all_pokemons){
        if(Pokemon.all_pokemons[pokemon].getAttacks().fast.some(a => a.name === attackName) || Pokemon.all_pokemons[pokemon].getAttacks().charged.some(a => a.name === attackName)){
            pokemon_list.push(Pokemon.all_pokemons[pokemon])
        }
    }

    for(let pokemon of pokemon_list){
        console.log(pokemon.toString())
    }
}

function getAttacksByType(typeName) {
    let attack_list = []

    for(let attack in Attack.all_attacks){
        if(Attack.all_attacks[attack].type === typeName){
            attack_list.push(attack)
        }
    } 

    for(let attack of attack_list){
        console.log(attack.toString())
    }
}

function sortPokemonByTypeThenName() {
    let sorted_list = []
    let temp = []
    for(let type in Type.all_types){
        given_type_list_pokemon = getPokemonsByType(Type.all_types[type].name)
        for(let pokemon of given_type_list_pokemon){
            temp.push(pokemon.name)
        }
        temp.sort()
        for(let pokemon_name of temp){
            for(let pokemon in Pokemon.all_pokemons){
                if(pokemon_name === Pokemon.all_pokemons[pokemon].name){
                    sorted_list.push(Pokemon.all_pokemons[pokemon])
                }
            }
        }
        temp = []
    }
    

    for(let pokemon of sorted_list){
        console.log(pokemon.toString())
    }
}


function getWeakestEnemies(attackName){
    let attackType = attackName.type;
    const effectif = Type.entries(Type[attackType].effectiveness)
    .filter(([type, val]) => val > 1) 
    for (let pokemon in Pokemon.all_pokemons) {
        let type1 = Pokemon.all_pokemons[pokemon].getTypes()[0].name;
        let type2 = Pokemon.all_pokemons[pokemon].getTypes()[1].name;
        
    }
}


/**
 * 
 * Functions to fill the static array of class Type, Attack and Pokemon
 * 
 */

function fill_types() {
    let compteur = 0
    for(let type in type_effectiveness){
        let t = new Type(type_effectiveness[type], type);
        Type.all_types[compteur] = t;
        compteur++
    }
}

function fill_attacks() {
    fast_moves.forEach(element => {
        let attack = new Attack(element['move_id'],element['name'],element['type'],element['power'],element['duration'],fast = 1)
        Attack.all_attacks[element['move_id']] = attack
    })

    charged_moves.forEach(element => {
        let attack = new Attack(element['move_id'],element['name'],element['type'],element['power'],element['duration'], charged = 1)
        Attack.all_attacks[element['move_id']] = attack
    })
}

function fill_pokemons() {
    pokemons.forEach(pokemon => {
        if(pokemon['form'] === "Normal"){
            let id = pokemon['pokemon_id']
            pokemon_moves.forEach(moves => {
                if(moves['pokemon_id'] === id && moves['form'] === "Normal"){
                    let array_moves = {"charged_moves" : moves['charged_moves'],"fast_moves" : moves['fast_moves']}
                    pokemon_types.forEach(types => {
                        if(types['pokemon_id'] === id && types['form'] === "Normal"){
                            let type_1 = new Type(type_effectiveness[types['type'][0]],types['type'][0])
                            let type_2 = null
                            if(types['type'][1]){
                                type_2 = new Type(type_effectiveness[types['type'][1]],types['type'][1])
                            }
                            Pokemon.all_pokemons[id] = new Pokemon(id, pokemon['pokemon_name'], pokemon['base_stamina'], pokemon['base_attack'], pokemon['base_defense'], type_1, type_2, array_moves)
                        }
                    })
                }
            });
        }
    })
}

/**
 * 
 * Éxecution des fonction de remplissage et test des fonctions get
 * 
 */

fill_types()
console.log(Type.all_types)
fill_attacks()
console.log(Attack.all_attacks)
fill_pokemons()
console.log(Pokemon.all_pokemons)

// getPokemonsByType('Fire')
// console.log('___________________________________')
// getPokemonByAttack('Power Whip')
// console.log('___________________________________')
// getAttacksByType('Fire')
// console.log('___________________________________')
// sortPokemonByTypeThenName()
// console.log('___________________________________')

// console.log('___________________________________')
// console.log('___________________________________')