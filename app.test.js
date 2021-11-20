const request = require("supertest");
const app = require("./server").app;
const connection = require("./settings/db");
const { TEST_EMAIL, TEST_PASSWORD, INCORRECT_EMAIL, INCORRECT_PASSWORD } = require("./config/test_config");

describe("users", () => {
    beforeEach(() => {
        return connection.query("START TRANSACTION");
    });

    afterEach(() => {
        return connection.query("ROLLBACK");
    });

    describe("/POST signup", () => {
        it("/api/auth/signup - 200", (done) => {
            request(app)
                .post("/api/auth/signup")
                .send({ user_email: TEST_EMAIL, user_password: TEST_PASSWORD })
                .expect(200)
                .expect({ message: "User is registered!" })
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });

        it("/api/auth/signup - 400 incorrect email", (done) => {
            request(app)
                .post("/api/auth/signup")
                .send({ user_email: INCORRECT_EMAIL, user_password: TEST_PASSWORD })
                .expect(400)
                .expect({ message: "Incorrect email or password" })
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });

        it("/api/auth/signup - 400 incorrect password", (done) => {
            request(app)
                .post("/api/auth/signup")
                .send({ user_email: TEST_EMAIL, user_password: INCORRECT_PASSWORD })
                .expect(400)
                .expect({ message: "Incorrect email or password" })
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });

        it("/api/auth/signup - 302 such user has already exists", (done) => {
            request(app)
                .post("/api/auth/signup")
                .send({ user_email: TEST_EMAIL, user_password: TEST_PASSWORD })
                .expect(200)
                .expect({ message: "User is registered!" })
                .end(() => {
                    request(app)
                        .post("/api/auth/signup")
                        .send({ user_email: TEST_EMAIL, user_password: TEST_PASSWORD })
                        .expect(302)
                        .expect({ message: `Such user (${TEST_EMAIL}) is existed` })
                        .end((err, res) => {
                            if (err) return done(err);
                            return done();
                        });
                });
        });
    });

    describe("/POST signin", () => {
        it("/api/auth/signin - 200", (done) => {
            request(app)
                .post("/api/auth/signup")
                .send({ user_email: TEST_EMAIL, user_password: TEST_PASSWORD })
                .expect(200)
                .expect({ message: "User is registered!" })
                .end(() => {
                    request(app)
                        .post("/api/auth/signin")
                        .send({ user_email: TEST_EMAIL, user_password: TEST_PASSWORD })
                        .expect(200)
                        .end((err, res) => {
                            if (err) return done(err);
                            return done();
                        });
                });
        });

        it("/api/auth/signin - 400 incorrect email", (done) => {
            request(app)
                .post("/api/auth/signin")
                .send({ user_email: INCORRECT_EMAIL, user_password: TEST_PASSWORD })
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });

        it("/api/auth/signin - 400 incorrect password", (done) => {
            request(app)
                .post("/api/auth/signin")
                .send({ user_email: TEST_EMAIL, user_password: INCORRECT_PASSWORD })
                .expect(400)
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });

        it("/api/auth/signin - 401 such user has already exists", (done) => {
            request(app)
                .post("/api/auth/signin")
                .send({ user_email: TEST_EMAIL, user_password: TEST_PASSWORD })
                .expect(401)
                .end((err, res) => {
                    if (err) return done(err);
                    return done();
                });
        });
    });
});
