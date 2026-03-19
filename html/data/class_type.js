class Type {
    static all_types = [];

    constructor(effectiveness, name) {
        this.effectiveness = effectiveness;
        this.name = name;
    }

    toString() {
        // 1. Regrouper les types par valeur d'efficacité (clés restent en string)
        const groups = {};
        for (const [defType, rate] of Object.entries(this.effectiveness)) {
            if (!groups[rate]) groups[rate] = [];
            groups[rate].push(defType);
        }

        // 2. Trier les taux par ordre décroissant (conversion Number pour le tri)
        const sortedRates = Object.keys(groups)
            .sort((a, b) => Number(b) - Number(a)); 

        // 3. Construire chaque segment
        const parts = sortedRates.map(rate => {
            const types = groups[rate].sort();
            return `${rate} = [${types.join(", ")}]`;
        });

        return `${this.name} : ${parts.join(", ")}`;
    }
}