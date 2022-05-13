import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";
import { useHttp } from "../hooks/http.hook";
import { customStyles } from "../custom/customStyles";

export const DefaultTopCountries = () => {
  const [topCountries, setTopCountries] = useState([]);
  const [topValues, setTopValues] = useState([]);
  const [defaultModalHistory, setDefaultModalHistory] = useState(false);

  const { request } = useHttp();

  const getTopCountries = async () => {
    try {
      const data = await request("/api/main/topCountries", "GET");
      setTopCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopCountries();
  }, []);

  return (
    <div>
      <h3 className="text-center text-primary" style={{ marginTop: 180 }}>
        ТОП 3 країни за кількістю населення
      </h3>

      {topCountries.length ? (
        <div>
          {topCountries.map((val) => {
            console.log(val);
            return (
              <div>
                <div className=" d-flex justify-content-center">
                  <div className="card col-sm-8 my-5 ">
                    <div className="d-flex justify-content-center">
                      <div className="right-part col-sm-4 ">
                        <img src={val.flag_image_path} class="card-img-top" alt={val.name_country} />
                        <p className="p-4 text-center">{val.descriptions}</p>
                      </div>
                      <div class="card-body col-sm-5 light-grey px-5 py-4">
                        <h6 className="text-uppercase grey">Країна</h6>
                        <h3 className="card-title mb-5">{val.name_country ? val.name_country : "дані відсутні"}</h3>
                        <p>
                          Код країни:{" "}
                          <span className="text-uppercase">
                            {val.country_code ? val.country_code : "дані відсутні"}
                          </span>
                        </p>
                        <p>Валюта: {val.currency ? val.currency : "дані відсутні"}</p>
                        <p>Площа: {val.square ? `${val.square} км2` : `дані відсутні`}</p>
                        <p>Населення: {val.population ? `${val.population} чоловік` : `дані відсутні`}</p>
                        <p>Столиця: {val.capital ? val.capital : "дані відсутні"}</p>
                        <p data-tip data-for={`nameClimate${val.id}`}>
                          Клімат:{" "}
                          <span className="values-hover">{val.name_climate ? val.name_climate : "дані відсутні"}</span>
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
                          Додатковий матеріал:{" "}
                          <a target={"_blank"} href={val.material ? val.material : "#"}>
                            {val.material ? val.material : "дані відсутні"}
                          </a>
                        </p>
                        <button
                          className="btn btn-outline-dark"
                          onClick={(e) => {
                            e.preventDefault();
                            setDefaultModalHistory(true);
                            setTopValues(val);
                          }}
                        >
                          Історична довідка
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <Modal
            style={customStyles}
            isOpen={defaultModalHistory}
            onRequestClose={() => {
              setDefaultModalHistory(false);
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
                        setDefaultModalHistory(false);
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
        </div>
      ) : (
        <div className="container text-center">
          <h5 className="my-5 text-secondary">Дані відсутні...</h5>
        </div>
      )}
    </div>
  );
};
