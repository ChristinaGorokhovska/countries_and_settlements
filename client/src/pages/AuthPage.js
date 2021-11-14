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
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card grey lighten-5">
                    <div className="card-content black-text">
                        <span className="card-title center">Getting start</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Enter email"
                                    id="user_email"
                                    type="text"
                                    name="user_email"
                                    onChange={changeHandler}
                                ></input>
                                <label htmlFor="user_email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Enter password"
                                    id="user_password"
                                    type="password"
                                    name="user_password"
                                    onChange={changeHandler}
                                ></input>
                                <label htmlFor="user_password">Password</label>
                            </div>
                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className="btn red lighten-1"
                            onClick={loginHandler}
                            style={{ marginRight: 15 }}
                            disabled={loading}
                        >
                            Sign in
                        </button>
                        <button
                            className="btn waves-effect waves-light cyan"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
