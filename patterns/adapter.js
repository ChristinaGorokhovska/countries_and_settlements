class OldSettlement {
    constructor() {
        this.getOldDescription = () => {
            console.log("Old description of the settlement!");
        };
    }
}

class NewSettlement {
    constructor() {
        this.getNewDescription = () => {
            console.log("New description of the settlement!");
        };
    }
}

class AdaptedNewtoOld {
    constructor() {
        const newSettlement = new NewSettlement();

        this.getOldDescription = () => {
            newSettlement.getNewDescription();
        };
    }
}

const run = () => {
    const oldS = new OldSettlement();
    oldS.getOldDescription();

    const newS = new NewSettlement();
    newS.getNewDescription();

    const adaptedS = new AdaptedNewtoOld();
    adaptedS.getOldDescription();
};

run();
