function getPokemonsByType (typeName, table = Pokemon.all_pokemons){
    let pokemon_list = {}

    for(let pokemon in table){
        if(table[pokemon].getTypes()[0].name === typeName){
            pokemon_list[table[pokemon].id_pokemon] = table[pokemon]
        } else if(table[pokemon].getTypes()[1] != null){
            if(table[pokemon].getTypes()[1].name === typeName){
                pokemon_list[table[pokemon].id_pokemon] = table[pokemon]
            }
        }
    }

    for(let pokemon in pokemon_list){
        console.table(pokemon_list[pokemon].toString())
    }

    return pokemon_list
}

function getPokemonsByFirstType (typeName){
    let pokemon_list = []

    for(let pokemon in Pokemon.all_pokemons){
        if(Pokemon.all_pokemons[pokemon].getTypes()[0].name === typeName){
            pokemon_list.push(Pokemon.all_pokemons[pokemon])
        }
    }
    return pokemon_list
}

function getPokemonByAttack (attackName,table = Pokemon.all_pokemons) {
    let pokemon_list = []

    for(let pokemon in table){
        if(table[pokemon].getAttacks().fast.some(a => a.name === attackName) || table[pokemon].getAttacks().charged.some(a => a.name === attackName)){
            pokemon_list.push(table[pokemon])
        }
    }

    for(let pokemon of pokemon_list){
        console.table(pokemon.toString())
    }

    return pokemon_list
}

function getAttacksByType(typeName) {
    let attack_list = []

    for(let attack in Attack.all_attacks){
        if(Attack.all_attacks[attack].type === typeName){
            attack_list.push(attack)
        }
    } 

    for(let attack of attack_list){
        console.table(attack.toString())
    }
}

function sortPokemonByTypeThenName() {
    
    let sorted_list = []
    let temp = []
    for(let type in Type.all_types){
        given_type_list_pokemon = getPokemonsByFirstType(Type.all_types[type].name)

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
    console.table(sorted_list)

    return sorted_list
}


function getWeakestEnemies(attackName){
    let idAttack
    for(let attack in Attack.all_attacks){
        if(Attack.all_attacks[attack].name == attackName){
            idAttack = Attack.all_attacks[attack].id_attack
        }
    }
    let attackType = Attack.all_attacks[idAttack].type;
    console.table(attackType)
    let weakestEnemies = []
    let bestEfficienty = 0;
    let type2 = 1;
    let typeEfficienty
    for (let pokemon in Pokemon.all_pokemons) {
        let type1 = Pokemon.all_pokemons[pokemon].getTypes()[0].name;
        if(Pokemon.all_pokemons[pokemon].getTypes()[1] != null){
            type2 = Pokemon.all_pokemons[pokemon].getTypes()[1].name;
            const effectif1 = Type.all_types[attackType].effectiveness[type1]
            const effectif2 = Type.all_types[attackType].effectiveness[type2]
            typeEfficienty = effectif1 * effectif2;
        } else {
            typeEfficienty = Type.all_types[attackType].effectiveness[type1]
        }
        
        console.table(typeEfficienty)
        if(bestEfficienty < typeEfficienty){
            weakestEnemies = []
            weakestEnemies.push(Pokemon.all_pokemons[pokemon])
            bestEfficienty = typeEfficienty
        } else if(bestEfficienty == typeEfficienty) {
            weakestEnemies.push(Pokemon.all_pokemons[pokemon])
        }
    }
    return weakestEnemies
}


/**
 * 
 * Functions to fill the static array of class Type, Attack and Pokemon
 * 
 */

function fill_types() {
    for(let type in type_effectiveness){
        let t = new Type(type_effectiveness[type], type);
        Type.all_types[type] = t;
    }
}

function fill_attacks() {
    fast_moves.forEach(element => {
        let attack = new Attack(element['move_id'],element['name'],element['type'],element['power'],element['duration'],1,0)
        Attack.all_attacks[element['move_id']] = attack
    })

    charged_moves.forEach(element => {
        let attack = new Attack(element['move_id'],element['name'],element['type'],element['power'],element['duration'],0,1)
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
                                if(type_1.name < type_2.name){
                                    Pokemon.all_pokemons[id] = new Pokemon(id, pokemon['pokemon_name'], pokemon['base_stamina'], pokemon['base_attack'], pokemon['base_defense'], type_1, type_2, array_moves)
                                } else {
                                    Pokemon.all_pokemons[id] = new Pokemon(id, pokemon['pokemon_name'], pokemon['base_stamina'], pokemon['base_attack'], pokemon['base_defense'], type_2, type_1, array_moves)
                                }
                            } else {
                                Pokemon.all_pokemons[id] = new Pokemon(id, pokemon['pokemon_name'], pokemon['base_stamina'], pokemon['base_attack'], pokemon['base_defense'], type_1, type_2, array_moves)
                            }
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
//console.table(Type.all_types)
fill_attacks()
// console.table(Attack.all_attacks)
fill_pokemons()
//console.table(Pokemon.all_pokemons)

// getPokemonsByType('Fire')
// console.table('___________________________________')
// getPokemonByAttack('Power Whip')
// console.table('___________________________________')
// getAttacksByType('Fire')
// console.table('___________________________________')
// sortPokemonByTypeThenName()
// console.table('___________________________________')
// weak = getWeakestEnemies("Vine Whip")
// console.table("ici")
// console.table(weak)
// console.table('___________________________________')
// console.table('___________________________________')

//  efficientyTest = Type.all_types["Bug"].effectiveness["Grass"];
//  console.table(efficientyTest)