class Attack{

    static all_attacks = []

    constructor(id_attack, name, type, power, duration, fast = 0, charged = 0){
        this.id_attack = id_attack
        this.name = name
        this.type = type
        this.power = power
        this.duration = duration
        this.fast = fast
        this.charged = charged
    }

    toString() {
        return this.name + " : " + this.id_attack + ", " + this.type + ", " + this.power + ", " + this.duration     
    }
}