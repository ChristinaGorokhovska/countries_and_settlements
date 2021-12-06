class Settlement {
    setName() {
        console.log("The name set");
    }

    setPopulation() {
        console.log("The population set");
    }

    getPopulation() {
        console.log("Populationn for updating");
    }

    setClimate() {
        console.log("The climate set");
    }

    getClimate() {
        console.log("Climate for updating");
    }

    setYear() {
        console.log("The year of foundation set");
    }

    getYear() {
        console.log("Year for updating");
    }

    setRelief() {
        console.log("The relief set");
    }

    getRelief() {
        console.log("Relief for updating");
    }

    addComment() {
        console.log("The comment added");
    }
}

class SettlementFacade {
    constructor(settlement) {
        this.settlement = settlement;
    }

    buildSettlement() {
        this.settlement.setName();
        this.settlement.setYear();
        this.settlement.setClimate();
        this.settlement.setPopulation();
        this.settlement.setRelief();
        this.settlement.addComment();
    }

    changeClimate() {
        console.log("changeClimate method started...");
        this.settlement.getClimate();
        this.settlement.setClimate();
    }

    //...
}

const run = () => {
    const facade = new SettlementFacade(new Settlement());

    let settlement = facade.buildSettlement();

    settlement = facade.changeClimate();
};

run();
