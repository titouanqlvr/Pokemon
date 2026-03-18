
class Type {
    constructor(typeEfficienty) {
        this.typeEfficienty = typeEfficienty;
    }

    toString(type) {
    const dict = {};

    for (const defenderType in this.typeEfficienty[type]) {
        const multiplier = this.typeEfficienty[type][defenderType];
        if (!dict[multiplier]) dict[multiplier] = [];
        dict[multiplier].push(defenderType);
    }

    let result = `${type} : `;
    for (const multiplier in dict) {
        result += `${multiplier} = [${dict[multiplier].join(', ')}], `;
    }

    return result;
}
}
const chart = new Type(type_effectiveness);
console.log(chart.toString("Bug"));


