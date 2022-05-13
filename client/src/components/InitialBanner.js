import React from "react";
import { Link } from "react-router-dom";

export const InitialBanner = () => {
  return (
    <div className="container" style={{ margin: 100 }}>
      <div className="d-flex align-items-center justify-content-between" style={{ marginBottom: 60 }}>
        <div className="w-50">
          <h2>
            Вітаємо у інформаційній системі країн та населених пунктів <br />
            <span className="text-primary">Countries and settlements</span>
          </h2>
          <p className="w-75 my-3 text-secondary">
            Система дозволить виконати швидкий пошук за країною або населеним пунктом та дізнатися першочергову
            інформацію щодо вашого запиту
          </p>
          <a href="#search" className="btn btn-primary">
            Перейти до пошуку
          </a>
          <Link to="/terms" style={{ textDecoration: "none" }}>
            <a className="btn btn-outline-primary ms-3">Перейти до термінів</a>
          </Link>
        </div>
        <div className="d-flex justify-content-center">
          <img className="w-100 swing" style={{ maxWidth: 500 }} src="/images/globe.png"></img>
        </div>
      </div>
    </div>
  );
};
