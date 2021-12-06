class Settlement {
    constructor(climate) {
        this.climate = climate;
    }
}

class Climate {
    constructor(type) {
        this.type = type;
    }

    get() {
        return this.type;
    }
}

class Tropical extends Climate {
    constructor() {
        super("Tropical");
    }
}

class Moderate extends Climate {
    constructor() {
        super("Moderate");
    }
}

class Continental extends Climate {
    constructor() {
        super("Continental");
    }
}

class City extends Settlement {
    constructor(climate) {
        super(climate);
    }

    getDescription() {
        console.log(`Settlement: City, climate: ${this.climate.get()}`);
    }
}

class Village extends Settlement {
    constructor(climate) {
        super(climate);
    }

    getDescription() {
        console.log(`Settlement: Village, climate: ${this.climate.get()}`);
    }
}

const run = () => {
    const moderate = new Moderate();
    const moderateCity = new City(moderate);

    moderateCity.getDescription();
};

run();
