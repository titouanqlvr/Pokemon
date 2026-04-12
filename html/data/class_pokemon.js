class Pokemon{

    static all_pokemons = {}

    constructor(id_pokemon, name, stamina, atk, def, type_1, type_2, attack_array){
        this.id_pokemon = id_pokemon
        this.name = name
        
        this.stamina = stamina
        this.atk = atk
        this.def = def
        this.stat_chain = "[STA: " + this.stamina + ", ATK: " +  this.atk + ", DEF: " + this.def + "]"
        
        this.types = []
        if(type_1 instanceof Type){
            this.types.push(type_1)
        }
        if(type_2 instanceof Type && type_2 != null){
            this.types.push(type_2)
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

        this.fast_attack_chain = ""
        this.charged_attack_chain = ""

        if(this.fast_attack.length != 0){
            for(let attack of this.fast_attack){
                this.fast_attack_chain = this.fast_attack_chain + attack.name + ", "
            }
        }
        
        if(this.charged_attack.length != 0){
            for(let attack of this.charged_attack){
                this.charged_attack_chain = this.charged_attack_chain + attack.name + ", "
            }
        }
    }

    toString() {
        if(this.types[1] != null){
            return this.name + " : " + this.id_pokemon + ", " + this.types[0].name + ", " + this.types[1].name + ", " + this.stat_chain + ", Rapides = " + this.fast_attack_chain + ", Chargées = " + this.charged_attack_chain 
        } else {
            return this.name + " : " + this.id_pokemon + ", " + this.types[0].name + ", " + this.stat_chain + ", Rapides = " + this.fast_attack_chain + ", Chargées = " + this.charged_attack_chain 
        }
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
    getBestFastAttacksForEnemy(print, pokemonName) {
        let pokemonB = null;
        for (let key in Pokemon.all_pokemons) {
            if (Pokemon.all_pokemons[key].name === pokemonName) {
                pokemonB = Pokemon.all_pokemons[key];
                break;
            }
        }
        if (!pokemonB) return null;

        let results = [];
        for (let attack of this.fast_attack) {
            let totalEffectiveness = 1.0;
            for (let typeB of pokemonB.types) {
                let effectiveness = Type.all_types[attack.type]?.effectiveness[typeB.name] ?? 1.0;
                totalEffectiveness *= effectiveness;
            }
            let damage = attack.power * totalEffectiveness * (this.atk / pokemonB.def);
            results.push({ attack, damage, totalEffectiveness });
        }

        results.sort((a, b) => {
            if (b.damage !== a.damage) return b.damage - a.damage;
            return a.attack.name.localeCompare(b.attack.name);
        });

        if (print) {
            for (let { attack, damage } of results) {
                console.log(attack.toString() + " Dégâts : " + damage.toFixed(2));
            }
        }

        const best = results[0];
        return { atk: best.attack, pts: best.damage, eff: best.totalEffectiveness };
    }
    
}
