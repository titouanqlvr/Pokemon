class Pokemon{


    constructor(id_pokemon, name, stamina, atk, def, type_1, type_2, attack_array){
        this.id_pokemon = id_pokemon
        this.name = name
        this.stamina = stamina
        this.atk = atk
        this.def = def

        if(type_1 instanceof Type){
            this.type_1 = type_1
        }
        if(type_2 instanceof Type){
            this.type_2 = type_2
        }
        this.attack = []
        if(typeof attack_array === Array){
            for(let attack in attack_array){
                if(attack instanceof Attack){
                    this.attack.push(attack)
                } else {
                    throw new Error("attack not instance of class Attack")
                }
            }
        }
        this.fast_attack = []
        this.charged_attack = []

        for(let attack in attack_array){
            if(attack.false === 1){
                this.fast_attack.push(attack)
            } else if(attack.charged === 1){
                this.fast_attack.push(attack)
            }
        }
    }
}