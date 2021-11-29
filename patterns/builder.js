class Settlement {
    constructor(parameters) {
        for (const param in parameters) {
            this[param] = parameters[param];
        }
    }

    getDescription() {
        console.log(
            `Settlement: ${this.name}, type: ${this.type}, population: ${this.population}, year: ${this.year}, climate: ${this.climate}`
        );
    }
}

class Builder {
    constructor() {
        this.parameters = ["name", "type", "population"];
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setPopulation(population) {
        this.population = population;
        return this;
    }

    setYear(year) {
        this.year = year;
        return this;
    }

    setClimate(climate) {
        this.climate = climate;
        return this;
    }

    build() {
        const checkParameters = this.parameters.some((param) => !this[param]);

        if (checkParameters) {
            throw new Error("There is not all necessary parameters...");
        }

        return new Settlement(this);
    }
}

const run = () => {
    const builder = new Builder();
    const settlement1 = builder
        .setName("New York")
        .setType("city")
        .setPopulation(521447)
        .setYear(1624)
        .setClimate("moderate")
        .build();

    const settlement2 = builder
        .setName("Brovary")
        .setType("city")
        .setPopulation(125778)
        .setYear(1525)
        .setClimate("moderate")
        .build();

    settlement1.getDescription();
    settlement2.getDescription();
};

run();
