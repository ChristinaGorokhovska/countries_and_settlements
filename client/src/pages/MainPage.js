import React, { useState, useContext, useEffect } from "react";
import Axios from "axios";
import { AuthContext } from "../context/auth.context";

export const MainPage = () => {
    const [settlementsDefaultList, setSettlementsDefaultList] = useState([]);

    const auth = useContext(AuthContext);

    const logoutHandler = (event) => {
        auth.logout();
    };

    const getDefaultSettlemets = () => {
        Axios.get("/api/main").then((res) => {
            setSettlementsDefaultList(res.data);
        });
    };
    useEffect(() => {
        getDefaultSettlemets();
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <span className="navbar-brand">Countries and settlements</span>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">
                                    Головна
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Про проект
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    Контакти
                                </a>
                            </li>
                        </ul>
                    </div>
                    <button className="btn btn-outline-danger" href="/api/auth/signup" onClick={logoutHandler}>
                        Вийти
                    </button>
                </div>
            </nav>

            <div className="defaultList container ">
                <div className="d-flex align-items-center flex-column text-center">
                    <h2 style={{ marginTop: 36, marginBottom: 36 }}>
                        Вітаємо у інформаційній системі населених пунктів країни!
                    </h2>
                </div>

                {settlementsDefaultList ? (
                    settlementsDefaultList.map((val) => {
                        return (
                            <div className="d-flex justify-content-center">
                                <div style={{ marginBottom: 64, marginTop: 64 }}>
                                    <div className="card border-info mb-3" style={{ width: 660 }}>
                                        <div className="card-header" style={{ backgroundColor: "lightblue" }}>
                                            <h3>{val.name_settlement}</h3>
                                        </div>
                                        <div className="card-body text-dark">
                                            <h5 className="card-title text-center">Інформація про населений пункт</h5>
                                            <div className="card-text">
                                                <p>Населення: {val.population} тис. чоловік</p>
                                                <p>Рік заснування: {val.year_of_foundation} рік</p>
                                                <p>Країна: {val.name_country}</p>
                                                <p>Тип населеного пункту: {val.name_type}</p>
                                                <p>Клімат: {val.name_climate}</p>
                                                <p>Рельєф: переважають {val.name_relief}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <button
                        type="button"
                        class="btn btn-outline-info btn-lg"
                        style={{ maxWidth: 200 }}
                        onClick={getDefaultSettlemets}
                    >
                        Отримати список
                    </button>
                )}
            </div>
        </div>
    );
};
