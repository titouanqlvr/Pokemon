class Attack{

    static all_attacks = []

    constructor(id_attack, name, type, power, duration){
        this.id_attack = id_attack
        this.name = name
        this.type = type
        this.power = power
        this.duration = duration
    }

    toString() {
        return this.name + " : " + this.id_attack + ", " + this.type + ", " + this.power + ", " + this.duration     
    }

    fill_attacks() {
        fast_moves.forEach(element => {
            let attack = new Attack(element['move_id'],element['name'],element['type'],element['power'],element['duration'])
            all_attacks.push(attack)
        })

        charged_moves.forEach(element => {
            let attack = new Attack(element['move_id'],element['name'],element['type'],element['power'],element['duration'])
            all_attacks.push(attack)
        })

        // pokemon_moves.forEach(element => {
        //     let attack = new Attack(element['move_id'],element['name'],element['type'],element['power'],element['duration'])
        //     all_attacks.push(attack)
        // })
    }
}