class Settlement {
    constructor() {
        this.type = "Settlement";
    }

    getDescription() {
        return this.type;
    }
}

class City extends Settlement {
    constructor() {
        super();
        this.type = "City";
    }
}

class Village extends Settlement {
    constructor() {
        super();
        this.type = "Village";
    }
}

class Flag {
    constructor(settlement) {
        this.settlement = settlement;
    }

    getDescription() {
        return `${this.settlement.getDescription()} with flag`;
    }
}

class Materials {
    constructor(settlement) {
        this.settlement = settlement;
    }

    getDescription() {
        return `${this.settlement.getDescription()} with additional matterials`;
    }
}

const run = () => {
    let city = new City();

    city = new Flag(city);
    console.log(city.getDescription());

    let village = new Village();
    village = new Flag(village);
    village = new Materials(village);
    console.log(village.getDescription());
};

run();
