class SettlementNews {
    constructor() {
        this.news = "";
        this.actions = [];
    }

    setNews(someText) {
        this.news = someText;
        this.notify();
    }

    notify() {
        return this.actions.forEach((subscriber) => subscriber.inform(this));
    }

    subscribe(observer) {
        this.actions.push(observer);
    }

    unsubscribe(observer) {
        this.actions = this.actions.filter((subscriber) => subscriber !== observer);
    }
}

class User {
    constructor(name) {
        this.name = name;
    }
    inform(someMessage) {
        console.log(`The user ${this.name} informed about: ${someMessage.news}`);
    }
}

class Guest {
    constructor(name) {
        this.name = name;
    }
    inform(someMessage) {
        console.log(`The guest ${this.name} informed about: ${someMessage.news}`);
    }
}

const run = () => {
    const settlementNews = new SettlementNews();

    const user = new User("Helen");
    const user2 = new User("Ann");
    const guest = new Guest("David");

    settlementNews.subscribe(user);
    settlementNews.subscribe(user2);
    settlementNews.subscribe(guest);

    settlementNews.setNews("There is new info about this settlement!");

    console.log("==================================");
    settlementNews.unsubscribe(user);

    settlementNews.setNews("There is new info about this settlement again!");
};

run();
