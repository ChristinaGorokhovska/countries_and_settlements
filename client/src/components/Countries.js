import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import { customStyles } from "../custom/customStyles";

export const Countries = ({ countries, loading }) => {
  const [modalHistory, setModalHistory] = useState(false);
  const [topValues, setTopValues] = useState([]);

  if (loading) {
    return <h2>Loading</h2>;
  }
  return (
    <div>
      <ul className="list-group mb-2">
        {countries.map((val) => {
          return (
            <div>
              <li className="list-style">
                <div className=" d-flex justify-content-center">
                  <div className="card col-sm-8 my-5 ">
                    <div className="d-flex justify-content-center">
                      <div className="right-part col-sm-4 ">
                        <img src={val.flag_image_path} class="img-fluid " alt={val.name_country} />
                        <p className="p-4 text-center">{val.descriptions}</p>
                      </div>
                      <div class="card-body col-sm-5 light-grey px-5 py-4">
                        <h6 className="text-uppercase grey">Країна</h6>
                        <h3 className="card-title mb-5">{val.name_country ? val.name_country : "Дані відсутні"}</h3>
                        <p>
                          Код країни:{" "}
                          <span className="text-uppercase">
                            {val.country_code ? val.country_code : "Дані відсутні"}
                          </span>
                        </p>
                        <p>Валюта: {val.currency ? val.currency : "Дані відсутні"}</p>
                        <p>Площа: {val.square ? `${val.square} км2` : `Дані відсутні`}</p>
                        <p>Населення: {val.population ? `${val.population} чоловік` : `Дані відсутні`}</p>
                        <p>Столиця: {val.capital ? val.capital : "дані відсутні"}</p>
                        <p data-tip data-for={`nameClimate${val.id}`}>
                          Клімат:{" "}
                          <span className="values-hover">{val.name_climate ? val.name_climate : "Дані відсутні"}</span>
                        </p>
                        <ReactTooltip id={`nameClimate${val.id}`} place="bottom" type="info">
                          <div>
                            <p>Тип клімату: {val.name_climate ? val.name_climate : "дані відсутні"}</p>
                            <p>Повітряні маси: {val.air_masses ? val.air_masses : "дані відсутні"}</p>
                            <p>
                              Середня температура влітку:{" "}
                              {val.avg_temp_summer ? `${val.avg_temp_summer} \u00b0C` : `дані відсутні`}
                            </p>
                            <p>
                              Середня температура взимку:{" "}
                              {val.avg_temp_winter ? `${val.avg_temp_winter} \u00b0C` : `дані відсутні`}
                            </p>
                          </div>
                        </ReactTooltip>
                        <p>
                          Додатковий матеріал:&nbsp;
                          {val.material ? (
                            <a target="_blank" href={val.material}>
                              {val.material}
                            </a>
                          ) : (
                            "дані відсутні"
                          )}
                        </p>
                        <button
                          className="btn btn-outline-dark"
                          onClick={(e) => {
                            e.preventDefault();
                            setModalHistory(true);
                            setTopValues(val);
                          }}
                        >
                          Історична довідка
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </div>
          );
        })}
        <Modal
          style={customStyles}
          isOpen={modalHistory}
          onRequestClose={() => {
            setModalHistory(false);
            setTopValues([]);
          }}
        >
          <div className="" style={{ maxWidth: 400 }}>
            <div className="modal-block high">
              <div className="modal-header">
                <h5 className="modal-title">{topValues.name_country} - історична довідка</h5>
              </div>
              <div className="modal-body">
                <p>{topValues.country_history ? topValues.country_history : "дані відсутні"}</p>
                <div className="d-flex justify-content-end">
                  {" "}
                  <button
                    className="btn btn-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalHistory(false);
                      setTopValues([]);
                    }}
                  >
                    Закрити
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </ul>
    </div>
  );
};
