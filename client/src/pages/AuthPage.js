import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/messages.hook";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const msg = useMessage();
    const { loading, request, error, clearError } = useHttp();
    const [form, setForm] = useState({
        user_email: "",
        user_password: "",
    });

    useEffect(() => {
        msg(error);
        clearError();
    }, [error, msg, clearError]);

    const changeHandler = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/signup", "POST", { ...form });
            msg(data.message);
        } catch (e) {}
    };

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/signin", "POST", { ...form });
            auth.login(data.token, data.userId);
        } catch (e) {}
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="col-5 shadow " style={{ padding: 20, borderRadius: 10, marginTop: 100 }}>
                <form>
                    <div className="mb-3">
                        <h2 className="text-center">Getting start</h2>
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>

                        <input
                            placeholder="Enter email"
                            type="email"
                            className="form-control"
                            aria-describedby="emailHelp"
                            id="user_email"
                            name="user_email"
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            placeholder="Enter password"
                            className="form-control"
                            id="user_password"
                            type="password"
                            name="user_password"
                            onChange={changeHandler}
                        />
                    </div>

                    <div style={{ marginTop: 28 }}>
                        <button
                            className="btn btn-outline-primary"
                            onClick={loginHandler}
                            style={{ marginRight: 15 }}
                            disabled={loading}
                        >
                            Sign in
                        </button>
                        <button className="btn btn-outline-danger" onClick={registerHandler} disabled={loading}>
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
