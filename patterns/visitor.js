class City {
    constructor(name, population) {
        this.name = name;
        this.population = population;
    }

    info() {
        console.log(`It is city ${this.name} with population ${this.population}`);
    }

    accept(operation) {
        operation.takeCity(this);
    }
}

class Village {
    constructor(name, population) {
        this.name = name;
        this.population = population;
    }

    info() {
        console.log(`It is village ${this.name} with population ${this.population}`);
    }

    accept(operation) {
        operation.takeVillage(this);
    }
}

class Visitor {
    takeCity(city) {
        throw new Error(`In ${this.constructor.name} not declared method takeCity()`);
    }

    takeVillage(village) {
        throw new Error(`In ${this.constructor.name} not declared method takeVillage()`);
    }
}

class TakeInfoVisitor extends Visitor {
    takeCity(city) {
        city.info();
    }

    takeVillage(village) {
        village.info();
    }
}

class NewMethodVisitor extends Visitor {
    takeCity(city) {
        city.population *= 1.2;
        console.log(`In ${city.name} population now is ${city.population}`);
    }

    takeVillage(village) {
        village.population *= 1.2;
        console.log(`In ${village.name} population now is ${village.population}`);
    }
}

const run = () => {
    const city = new City("Brovary", 100000);
    //const village = new Village();

    const takeInfo = new TakeInfoVisitor();
    const newMethod = new NewMethodVisitor();

    city.accept(takeInfo);
    city.accept(newMethod);
};

run();
