class Prototype {
    setParameters(key, val) {
        this[key] = val;
    }

    clone() {
        const clone = new Prototype();
        const keys = Object.keys(this);

        keys.forEach((k) => clone.setParameters(k, this[k]));
        return clone;
    }
}

const run = () => {
    const testPrototype = new Prototype();
    testPrototype.setParameters("NewYork", "city", 1624);
    const clone1 = testPrototype.clone();
    clone1.setParameters("Brovary", "city", 1524);

    console.log(testPrototype, clone1);
};

run();
