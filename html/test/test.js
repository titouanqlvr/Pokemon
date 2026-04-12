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
        console.log(pokemon.toString())
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
    console.log(sorted_list)
}


function getWeakestEnemies(attackName){
    let idAttack
    for(let attack in Attack.all_attacks){
        if(Attack.all_attacks[attack].name == attackName){
            idAttack = Attack.all_attacks[attack].id_attack
        }
    }
    let attackType = Attack.all_attacks[idAttack].type;
    console.log(attackType)
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
        
        console.log(typeEfficienty)
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

function fastFight(pokemonNameA, pokemonNameB) {
    let pokemonA = null;
    let pokemonB = null;

    for (let key in Pokemon.all_pokemons) {
        if (Pokemon.all_pokemons[key].name === pokemonNameA) pokemonA = Pokemon.all_pokemons[key];
        if (Pokemon.all_pokemons[key].name === pokemonNameB) pokemonB = Pokemon.all_pokemons[key];
    }

    if (!pokemonA || !pokemonB) {
        console.log("Pokémon introuvable.");
        return;
    }

    let hpA = pokemonA.stamina;
    let hpB = pokemonB.stamina;

    let tour = 1;
    let rows = [];

    while (hpA > 0 && hpB > 0) {
        let attaquant, defenseur, hpDef;

        if (tour % 2 !== 0) {
            attaquant = pokemonA;
            defenseur = pokemonB;
        } else {
            attaquant = pokemonB;
            defenseur = pokemonA;
        }

        let best = attaquant.getBestFastAttacksForEnemy(false, defenseur.name);

        let degats = Math.floor(best.pts);

        if (tour % 2 !== 0) {
            hpB -= degats;
            rows.push({
                Tour: tour,
                Attaquant: attaquant.name,
                ATK: attaquant.atk,
                Défenseur: defenseur.name,
                DEF: defenseur.def,
                "Nom Attaque": best.atk.name,
                Efficacité: best.eff,
                Dégâts: degats,
                Reste: Math.max(hpB, 0)
            });
        } else {
            hpA -= degats;
            rows.push({
                Tour: tour,
                Attaquant: attaquant.name,
                ATK: attaquant.atk,
                Défenseur: defenseur.name,
                DEF: defenseur.def,
                "Nom Attaque": best.atk.name,
                Efficacité: best.eff,
                Dégâts: degats,
                Reste: Math.max(hpA, 0)
            });
        }

        tour++;
    }

    console.table(rows);
}
/**
 * 
 * Éxecution des fonction de remplissage et test des fonctions get
 * 
 */

fill_types()
//console.log(Type.all_types)
fill_attacks()
//console.log(Attack.all_attacks)
fill_pokemons()
//console.log(Pokemon.all_pokemons)

// getPokemonsByType('Fire')
// console.log('___________________________________')
// getPokemonByAttack('Power Whip')
// console.log('___________________________________')
// getAttacksByType('Fire')
// console.log('___________________________________')
// sortPokemonByTypeThenName()
// console.log('___________________________________')
// weak = getWeakestEnemies("Vine Whip")
// console.log("ici")
// console.log(weak)
// console.log('___________________________________')
// console.log('___________________________________')

//  efficientyTest = Type.all_types["Bug"].effectiveness["Grass"];
//  console.log(efficientyTest)

Pokemon.all_pokemons["1"].getBestFastAttacksForEnemy(true, "Charmander");
fastFight("Bulbasaur", "Charizard");
