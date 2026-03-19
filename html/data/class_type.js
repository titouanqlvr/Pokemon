class Type {

    static all_types = []

    constructor(typeEfficienty, type) {
        this.typeEfficienty = typeEfficienty;
        this.type = type;
    }

    remplirDico() {
        const dict = {};
        for (const defenderType in this.typeEfficienty[this.type]) {
            const multiplier = this.typeEfficienty[this.type][defenderType];
            if (!dict[multiplier]) dict[multiplier] = [];
            dict[multiplier].push(defenderType);
        }
        return dict;
    }

    toString() {
        const dict = this.remplirDico();
        let result = `${this.type} : `;
        for (const multiplier in dict) {
            result += `${multiplier} = [${dict[multiplier].join(', ')}], `;
        }
        return result;
    }
}