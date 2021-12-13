class SettlementStatus {
    constructor(name, nextStatus) {
        this.name = name;
        this.nextStatus = nextStatus;
    }

    next() {
        return new this.nextStatus();
    }
}

class Selecting extends SettlementStatus {
    constructor() {
        super("selecting", SettingsParameters);
    }
}

class SettingsParameters extends SettlementStatus {
    constructor() {
        super("settings parameters", Approving);
    }
}

class Approving extends SettlementStatus {
    constructor() {
        super("approving", Approving);
    }
}

class Settlement {
    constructor() {
        this.state = new Selecting();
    }

    nextState() {
        this.state = this.state.next();
    }

    cancelSelecting() {
        this.state.name === "selecting"
            ? console.log("Canceled")
            : console.log(`Can not be canceled on state ${this.state.name}`);
    }
}

const run = () => {
    const mySettlement = new Settlement();

    console.log(mySettlement.state.name);

    mySettlement.nextState();
    console.log(mySettlement.state.name);

    //mySettlement.cancelSelecting();

    mySettlement.nextState();
    console.log(mySettlement.state.name);

    mySettlement.cancelSelecting();
};

run();
