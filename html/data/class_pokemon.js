class Pokemon{

    static all_pokemons = []

    constructor(id_pokemon, name, stamina, atk, def, type_1, type_2, attack_array){
        this.id_pokemon = id_pokemon
        this.name = name
        
        this.stamina = stamina
        this.atk = atk
        this.def = def
        this.stat_chain = "[STA: " + this.stamina + ", ATK: " +  this.atk + ", DEF: " + this.def + "]"
        
        this.types = []
        if(type_1 instanceof Type){
            this.types.push(new Type())
        }
        if(type_2 instanceof Type){
            this.types.push(new Type())
        }
        
        this.fast_attack = []
        this.charged_attack = []

        for(let attack of attack_array.charged_moves){
            charged_moves.forEach(charged => {
                if(charged['name'] == attack) {
                    this.charged_attack.push(new Attack(charged['move_id'], charged['name'], charged['type'], charged['power'], charged['duration'], 0, 1))
                }
            })
            
        }
        for(let attack of attack_array.fast_moves){
            fast_moves.forEach(fast => {
                if(fast['name'] == attack) {
                    this.fast_attack.push(new Attack(fast['move_id'], fast['name'], fast['type'], fast['power'], fast['duration'], 1, 0))
                }
            })
            
        }
    }

    toString() {
        return this.name + " : " + this.id_pokemon + ", " + this.type_1 + ", " + this.type_2 + ", " + this.stat_chain + ", Rapides = " + this.fast_attack + ", Chargées = " + this.charged_attack 
    }

    getTypes() {
        return this.types
    }

    getAttacks() {
        return {
            fast : this.fast_attack,
            charged : this.charged_attack
        }
    }
}