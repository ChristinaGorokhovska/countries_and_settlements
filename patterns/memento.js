class Memento {
    constructor(value) {
        this.value = value;
    }
}

const creator = {
    save: (val) => new Memento(val),
    restore: (memento) => memento.value,
};

class SettlementTaker {
    constructor() {
        this.settlements = [];
    }

    addMemento(memento) {
        this.settlements.push(memento);
    }

    getMemento(index) {
        return this.settlements[index];
    }
}

const run = () => {
    const careTaker = new SettlementTaker();

    careTaker.addMemento(creator.save("Brovar"));
    careTaker.addMemento(creator.save("Brovari"));
    careTaker.addMemento(creator.save("New Brovary"));

    console.log(creator.restore(careTaker.getMemento(1)));
};

run();
