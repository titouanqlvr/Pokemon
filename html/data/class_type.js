
class Type {
    constructor(typeEfficienty) {
        this.typeEfficienty = typeEfficienty;
    }

    createEffectiveness(type){
        const uniqueValue = [...new Set(Object.values(type_effectiveness[type]))];
        return uniqueValue;
    }

    getEfficienty(type){
        const uniqueValue = this.createEffectiveness(type);
        return uniqueValue.map(element => ({
            multiplier : element, 
            types : Object.entries(type_effectiveness[type])
            .filter(([_, mult]) => mult === element)
            .map(([t]) => t)
        }))
    }
    toString() {        
        return this.typeEfficienty;
    }
}
const chart = new Type(type_effectiveness);
console.log(chart.getEfficienty("Bug"));