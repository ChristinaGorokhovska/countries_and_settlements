class Factory {
    createSettlement(name, type) {
        if (type === "village") {
            return new Village(name, type);
        }
        if (type === "city") {
            return new City(name, type);
        }

        throw new Error("There are not such type...");
    }
}

class AbstractSettlement {
    constructor(name, type, avgPopulation) {
        this.name = name;
        this.type = type;
        this.avgPopulation = avgPopulation;
    }

    getDescription() {
        console.log(`There is ${this.name}, it is ${this.type} and the avg population is above ${this.avgPopulation}`);
    }
}

class Village extends AbstractSettlement {
    constructor(name, type) {
        const avgPopulation = "5000";
        super(name, type, avgPopulation);
    }
}

class City extends AbstractSettlement {
    constructor(name, type) {
        const avgPopulation = "100000";
        super(name, type, avgPopulation);
    }
}

const run = () => {
    const factory = new Factory();
    const settlement1 = factory.createSettlement("London", "city");
    const settlement2 = factory.createSettlement("Trebykhiv", "village");

    settlement1.getDescription();
    settlement2.getDescription();
};

run();
