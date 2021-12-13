class Creator {
    create() {
        this.addCountry();
        this.addPopulation();
        this.addClimate();
        this.addRelief();
        this.addHistory();
    }
}

class City extends Creator {
    constructor(name) {
        super();
        this.name = name;
    }
    addCountry() {
        console.log(`The capital is set for city ${this.name}`);
    }

    addPopulation() {
        console.log(`The population is set for the city ${this.name}`);
    }

    addClimate() {
        console.log(`The climate is choosen for the city ${this.name}`);
    }

    addRelief() {
        console.log(`The relief is choosen for the city ${this.name}`);
    }

    addHistory() {
        console.log(`The history is added to the city ${this.name}`);
    }
}

class Village extends Creator {
    constructor(name) {
        super();
        this.name = name;
    }

    addCountry() {
        console.log(`The capital is set for village ${this.name}`);
    }

    addPopulation() {
        console.log(`The population is set for the village ${this.name}`);
    }

    addClimate() {
        console.log(`The climate is choosen for the village ${this.name}`);
    }

    addRelief() {
        console.log(`The relief is choosen for the village ${this.name}`);
    }

    addHistory() {
        console.log(`The history is added to the village ${this.name}`);
    }
}

const run = () => {
    const someCity = new City("Brovary");
    const someVillage = new Village("Kaluta");

    someCity.create();
    console.log("========");
    someVillage.create();
};

run();
