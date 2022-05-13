import React, { useState, useEffect, useCallback } from "react";
import Axios from "axios";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";
import { useMessage } from "../hooks/messages.hook";
import { useHttp } from "../hooks/http.hook";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { customStyles } from "../custom/customStyles";

export const Search = ({ isAdmin }) => {
  const [country, setCountry] = useState([]);
  const [settlement, setSettlement] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [allSettlementTypes, setAllSettlementTypes] = useState([]);
  const [allPopulationTypes, setAllPopulationTypes] = useState([]);
  const [allClimateTypes, setAllClimateTypes] = useState([]);
  const [allReliefTypes, setAllReliefTypes] = useState([]);
  const [imgCountry, setImgCountry] = useState(null);
  const [adminImageCountry, setAdminImageCountry] = useState(null);
  const [imgSettlement, setImgSettlement] = useState(null);
  const [adminImageSettlement, setAdminImageSettlement] = useState(null);

  const [countrySearch, setCountrySearch] = useState(false);
  const [settlementSearch, setSettlementSearch] = useState(false);
  const [modalCountry, setModalCountry] = useState(false);
  const [modalSettlement, setModalSettlement] = useState(false);
  const [modalHistory, setModalHistory] = useState(false);

  const [form, setForm] = useState({ searchName: "" });
  const [adminFormSettlement, setAdminFormSettlement] = useState({
    nameSettlement: "",
    populationSettlement: 0,
    yearSettlement: 0,
    isCapitalSettlement: false,
    countrySettlement: "",
    typeSettlement: "",
    populationTypeSettlement: "",
    reliefSettlement: "",
    materialSettlement: "",
    descriptionsSettlement: "",
  });

  const [adminFormCountry, setAdminFormCountry] = useState({
    codeCountry: "",
    nameCountry: "",
    squareCountry: 0,
    climateCountry: 0,
    populationCountry: 0,
    currencyCountry: "",
    descriptionsCountry: "",
    materialCountry: "",
    historyCountry: null,
  });

  const { request, error, clearError } = useHttp();
  const msg = useMessage();

  //Handlers
  const changeHandler = (event) => {
    console.log("changeHandler starts...");
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  //Search dispalys
  const countrySearchHandler = () => {
    setCountrySearch(true);
    setSettlementSearch(false);
    setSettlement([]);
  };

  const settlementSearchHandler = () => {
    setSettlementSearch(true);
    setCountrySearch(false);
    setCountry([]);
  };

  // Search country
  const countryHandler = async () => {
    try {
      if (!form.searchName.trim()) {
        msg("No data");
        throw new Error("No data");
      }

      const data = await request(`/api/main/search/countries/${form.searchName.trim()}`, "GET");
      setCountry(data);
      msg(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  //Search settlement
  const settlementHandler = async () => {
    try {
      if (!form.searchName.trim()) {
        msg("No data");
        throw new Error("No data");
      }
      const data = await request(`/api/main/search/settlements/${form.searchName.trim()}`, "GET");
      setSettlement(data);
      msg(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  //Setting Forms (modals)
  const changeAdminHandlerSettlement = (event) => {
    setAdminFormSettlement({ ...adminFormSettlement, [event.target.name]: event.target.value });
  };

  const changeAdminHandlerCountry = (event) => {
    setAdminFormCountry({ ...adminFormCountry, [event.target.name]: event.target.value });
  };

  //Get all
  const getAllCountries = async () => {
    try {
      const data = await request(`/api/main/search/countries`, "GET");
      setAllCountries(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllSettlementTypes = async () => {
    try {
      const data = await request(`/api/main/search/settlementTypes`, "GET");
      setAllSettlementTypes(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllPopulationTypes = async () => {
    try {
      const data = await request(`/api/main/search/populationTypes`, "GET");
      setAllPopulationTypes(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllClimateTypes = async () => {
    try {
      const data = await request(`/api/main/search/climateTypes`, "GET");
      setAllClimateTypes(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllReliefTypes = async () => {
    try {
      const data = await request(`/api/main/search/reliefTypes`, "GET");
      setAllReliefTypes(data);
    } catch (e) {
      console.log(e);
    }
  };

  //Images
  const sendFileCountry = useCallback(
    async (id) => {
      try {
        const data = new FormData();
        data.append("adminImageCountry", imgCountry);

        await Axios.put(`/api/main/search/countries/upload/${id}`, data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }).then((res) => setAdminImageCountry(res.data.path));

        console.log("adminImage", adminImageCountry);
      } catch (error) {
        console.log("error here", error);
      }
    },
    [imgCountry]
  );

  const sendFileSettlement = useCallback(
    async (id) => {
      try {
        const data = new FormData();
        data.append("adminImageSettlement", imgSettlement);

        await Axios.put(`/api/main/search/settlements/upload/${id}`, data, {
          headers: {
            "content-type": "multipart/form-data",
          },
        }).then((res) => setAdminImageSettlement(res.data.path));

        console.log("adminImage", adminImageSettlement);
      } catch (error) {
        console.log("error here", error);
      }
    },
    [imgSettlement]
  );

  //Update
  const updateCountry = async (val) => {
    try {
      console.log("adminForm:", { ...adminFormCountry });

      adminFormCountry.codeCountry && (adminFormCountry.codeCountry = adminFormCountry.codeCountry.trim());
      adminFormCountry.nameCountry && (adminFormCountry.nameCountry = adminFormCountry.nameCountry.trim());

      adminFormCountry.currencyCountry && (adminFormCountry.currencyCountry = adminFormCountry.currencyCountry.trim());
      adminFormCountry.descriptionsCountry &&
        (adminFormCountry.descriptionsCountry = adminFormCountry.descriptionsCountry.trim());

      adminFormCountry.materialCountry && (adminFormCountry.materialCountry = adminFormCountry.materialCountry.trim());
      adminFormCountry.historyCountry && (adminFormCountry.historyCountry = adminFormCountry.historyCountry.trim());

      if (!adminFormCountry.codeCountry || adminFormCountry.codeCountry.length > 2 || !adminFormCountry.nameCountry) {
        msg("Не введені обов'язкові поля * або введені некоректно");
        throw new Error("No data");
      }

      const dataFile = new FormData();
      dataFile.append("adminImageCountry", imgCountry);

      const filePath = imgCountry
        ? (
            await Axios.put(`/api/main/search/countries/upload/${val.id}`, dataFile, {
              headers: {
                "content-type": "multipart/form-data",
              },
            })
          ).data.path
        : val.flag_image_path;

      console.log(filePath);

      const data = await request(`/api/main/search/countries/${val.id}`, "PUT", {
        ...adminFormCountry,
        pathCountry: filePath,
      });
      msg(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const updateSettlement = async (val) => {
    try {
      console.log("nameSettlementid:", val);
      console.log("adminForm:", { ...adminFormSettlement });

      adminFormSettlement.nameSettlement &&
        (adminFormSettlement.nameSettlement = adminFormSettlement.nameSettlement.trim());
      adminFormSettlement.materialSettlement &&
        (adminFormSettlement.materialSettlement = adminFormSettlement.materialSettlement.trim());
      adminFormSettlement.descriptionsSettlement &&
        (adminFormSettlement.descriptionsSettlement = adminFormSettlement.descriptionsSettlement.trim());

      if (!adminFormSettlement.nameSettlement) {
        msg("Не введені обов'язкові поля *");
        throw new Error("No data");
      }
      const dataFile = new FormData();
      dataFile.append("adminImageSettlement", imgSettlement);
      console.log(imgSettlement);

      const filePath = imgSettlement
        ? (
            await Axios.put(`/api/main/search/settlements/upload/${val.id}`, dataFile, {
              headers: {
                "content-type": "multipart/form-data",
              },
            })
          ).data.path
        : val.image_path;
      console.log(filePath);

      const data = await request(`/api/main/search/settlements/${val.id}`, "PUT", {
        ...adminFormSettlement,
        pathSettlement: filePath,
      });
      msg(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  //Current
  const setCurrentCountry = async (val) => {
    adminFormCountry.codeCountry = val.country_code;
    adminFormCountry.nameCountry = val.name_country;
    adminFormCountry.squareCountry = val.square;
    adminFormCountry.climateCountry = val.climate_type_id;
    adminFormCountry.populationCountry = val.population;
    adminFormCountry.currencyCountry = val.currency;
    adminFormCountry.descriptionsCountry = val.descriptions;
    adminFormCountry.materialCountry = val.material;
    adminFormCountry.historyCountry = val.country_history;
  };

  const setCurrentSettlement = async (val) => {
    adminFormSettlement.nameSettlement = val.name_settlement;
    adminFormSettlement.populationSettlement = val.population;
    adminFormSettlement.yearSettlement = val.year_of_foundation;
    adminFormSettlement.isCapitalSettlement = val.is_capital;
    adminFormSettlement.countrySettlement = val.country_id;
    adminFormSettlement.typeSettlement = val.settlement_type_id;
    adminFormSettlement.populationTypeSettlement = val.population_type_id;
    adminFormSettlement.reliefSettlement = val.relief_type_id;
    adminFormSettlement.materialSettlement = val.material;
    adminFormSettlement.descriptionsSettlement = val.descriptions;
  };

  //Delete
  const deleteCountry = (id) => {
    try {
      const data = request(`/api/main/search/countries/${id}`, "DELETE");
      setCountry([]);
      msg("Country is deleted!");
    } catch (e) {}
  };

  const deleteSettlement = async (id) => {
    try {
      const data = await request(`/api/main/search/settlements/${id}`, "DELETE");
      setSettlement([]);
      msg(data.message);
    } catch (e) {}
  };

  //UseEffects
  useEffect(() => {
    msg(error);
    clearError();
  }, [error, msg, clearError]);

  return (
    // Variant buttons
    <div>
      <div
        id="search"
        className="d-flex align-items-center flex-column text-center light-grey"
        style={{ paddingBottom: 40 }}
      >
        <h4 className="w-75 text-center" style={{ padding: 75 }}>
          Оберіть за чим виконати пошук, за країною чи населеним пункотом.
          <br /> Введіть назву та виконайте пошук
        </h4>

        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-primary " style={{ marginRight: 16 }} onClick={countrySearchHandler}>
            Пошук за країною
          </button>

          <button type="button" className="btn btn-primary" onClick={settlementSearchHandler}>
            Пошук за населеним пунктом
          </button>
        </div>
      </div>

      {/* Country Search */}
      {countrySearch && (
        <div className="container d-flex justify-content-center" style={{ marginTop: 76 }}>
          <div className="form-inline my-2 my-lg-0 col-5">
            <h4>Пошук країни</h4>
            <div className="d-flex">
              <input
                className="form-control mr-sm-2"
                placeholder="Введіть назву країни"
                aria-label="Search"
                name="searchName"
                id="searchName"
                onChange={changeHandler}
                spellCheck="false"
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                onClick={countryHandler}
                style={{ marginLeft: 16 }}
              >
                Пошук
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Countries Cards */}
      {country.map((val) => {
        return (
          <div id={val.id}>
            <div className=" d-flex justify-content-center">
              <div className="card col-sm-8 my-5 ">
                <div className="d-flex justify-content-center">
                  <div className="right-part col-sm-4 ">
                    <img src={val.flag_image_path} class="img-fluid " alt={val.name_country} />
                    <p className="p-4 text-center">{val.descriptions}</p>
                  </div>
                  <div class="card-body col-sm-5 light-grey px-5 py-4">
                    <h6 className="text-uppercase grey">Країна</h6>
                    <h3 className="card-title mb-5">{val.name_country ? val.name_country : "дані відсутні"}</h3>
                    <p>
                      Код країни:{" "}
                      <span className="text-uppercase">{val.country_code ? val.country_code : "дані відсутні"}</span>
                    </p>
                    <p>Валюта: {val.currency ? val.currency : "дані відсутні"}</p>
                    <p>Площа: {val.square ? `${val.square} км2` : `дані відсутні`}</p>
                    <p>Населення: {val.population ? `${val.population} чоловік` : `дані відсутні`}</p>
                    <p>Столиця: {val.capital ? val.capital : "дані відсутні"}</p>
                    <p data-tip data-for="nameClimate">
                      Клімат:{" "}
                      <span className="values-hover">{val.name_climate ? val.name_climate : "дані відсутні"}</span>
                    </p>
                    <ReactTooltip id="nameClimate" place="bottom" type="info">
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
                      }}
                    >
                      Історична довідка
                    </button>

                    <Modal style={customStyles} isOpen={modalHistory} onRequestClose={() => setModalHistory(false)}>
                      <div className="" style={{ maxWidth: 400 }}>
                        <div className="modal-block high">
                          <div className="modal-header">
                            <h5 className="modal-title">{val.name_country} - історична довідка</h5>
                          </div>
                          <div className="modal-body">
                            <p>{val.country_history ? val.country_history : "дані відсутні"}</p>
                            <div className="d-flex justify-content-end">
                              {" "}
                              <button
                                className="btn btn-secondary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setModalHistory(false);
                                }}
                              >
                                Закрити
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>

                    {isAdmin ? (
                      <div className="admin-buttons d-flex justify-content-end mt2">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setModalCountry(true);
                            getAllClimateTypes();
                            setCurrentCountry(val);
                          }}
                        >
                          Змінити
                        </button>
                        <button
                          className="btn btn-danger ml1"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteCountry(val.id);
                          }}
                        >
                          Видалити
                        </button>

                        <Modal style={customStyles} isOpen={modalCountry} onRequestClose={() => setModalCountry(false)}>
                          <div className="modal-block high">
                            <div className="modal-header">
                              <h5 className="modal-title">Змінити дані про країну</h5>
                            </div>
                            <div className="modal-body">
                              <label className="form-label">Код країни*</label>
                              <input
                                defaultValue={val.country_code}
                                type="text"
                                spellCheck={false}
                                className="form-control"
                                id="codeCountry"
                                name="codeCountry"
                                onChange={changeAdminHandlerCountry}
                              />

                              <label className="form-label">Назва країни*</label>
                              <input
                                defaultValue={val.name_country}
                                type="text"
                                spellCheck={false}
                                className="form-control"
                                id="nameCountry"
                                name="nameCountry"
                                onChange={changeAdminHandlerCountry}
                              />

                              <label className="form-label">Площа</label>
                              <input
                                defaultValue={val.square}
                                type="number"
                                min={1}
                                spellCheck={false}
                                className="form-control"
                                id="squareCountry"
                                name="squareCountry"
                                onChange={changeAdminHandlerCountry}
                              />

                              <label className="form-label">Тип клімату</label>
                              <select
                                class="form-select"
                                aria-label="Default select example"
                                name="climateCountry"
                                id="climateCountry"
                                onChange={changeAdminHandlerCountry}
                              >
                                <option selected value={val.climate_type_id}>
                                  {val.name_climate}
                                </option>
                                {allClimateTypes.map((val) => (
                                  <option value={val.id}>{val.name_climate}</option>
                                ))}
                              </select>

                              <label className="form-label">Кількість населення</label>
                              <input
                                defaultValue={val.population}
                                type="number"
                                min={1}
                                className="form-control"
                                id="populationCountry"
                                name="populationCountry"
                                onChange={changeAdminHandlerCountry}
                              />

                              <label className="form-label">Валюта</label>
                              <input
                                defaultValue={val.currency}
                                type="text"
                                className="form-control"
                                id="currencyCountry"
                                name="currencyCountry"
                                onChange={changeAdminHandlerCountry}
                              />

                              <label className="form-label">Опиc</label>
                              <textarea
                                defaultValue={val.descriptions}
                                type="text"
                                spellCheck={false}
                                rows={5}
                                cols={56}
                                className="form-control"
                                id="descriptionsCountry"
                                name="descriptionsCountry"
                                onChange={changeAdminHandlerCountry}
                              />

                              <label className="form-label">Історична довідка</label>
                              <textarea
                                defaultValue={val.country_history}
                                type="text"
                                spellCheck={false}
                                rows={5}
                                cols={56}
                                className="form-control"
                                id="historyCountry"
                                name="historyCountry"
                                onChange={changeAdminHandlerCountry}
                              />

                              <label className="form-label">Додатковий матеріал</label>
                              <input
                                defaultValue={val.material}
                                type="text"
                                spellCheck={false}
                                className="form-control"
                                id="materialCountry"
                                name="materialCountry"
                                onChange={changeAdminHandlerCountry}
                              />

                              <label className="form-label">Зображення</label>
                              <div className="adminImage d-flex ">
                                <input
                                  type="file"
                                  onChange={(e) => {
                                    e.preventDefault();
                                    setImgCountry(e.target.files[0]);
                                  }}
                                />
                              </div>
                            </div>
                            {/* Modal footer buttons */}
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => setModalCountry(false)}
                              >
                                Закрити
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateCountry(val).then(() => {
                                    setModalCountry(false);
                                    console.log(adminFormCountry);

                                    form.searchName = adminFormCountry.nameCountry;
                                    document.getElementById("searchName").value = form.searchName;
                                    //setForm((prevState) => ({ ...prevState, searchName: adminFormCountry.nameCountry }));
                                    console.log(form);
                                    countryHandler();
                                  });
                                }}
                              >
                                Відредагувати
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Settlement Search */}
      {settlementSearch && (
        <div className="container d-flex justify-content-center" style={{ marginTop: 76 }}>
          <div className="form-inline my-2 my-lg-0 col-5">
            <h4>Пошук населеного пункту</h4>
            <div className="d-flex">
              <input
                className="form-control mr-sm-2"
                placeholder="Введіть назву населеного пункту"
                aria-label="Search"
                name="searchName"
                id="searchName"
                onChange={changeHandler}
                spellCheck="false"
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                onClick={settlementHandler}
                style={{ marginLeft: 16 }}
              >
                Пошук
              </button>
            </div>
          </div>
        </div>
      )}

      {settlement.map((val) => {
        return (
          <div>
            <div className=" d-flex justify-content-center">
              <div className="card col-sm-8 my-5 ">
                <div className="d-flex justify-content-center">
                  <div className="right-part col-sm-4 ">
                    <img src={val.image_path} class="card-img-top " alt="..." />
                  </div>
                  <div class="card-body col-sm-5 light-grey px-5 py-4">
                    <h6 className="text-uppercase grey">Населений пункт</h6>
                    <h3 className="card-title mb-5">{val.name_settlement ? val.name_settlement : "дані відсутні"}</h3>
                    <p>Кількість населення: {val.population ? `${val.population} чоловік` : "дані відсутні"} </p>
                    <p>Рік заснування: {val.year_of_foundation ? `${val.year_of_foundation} рік` : "дані відсутні"}</p>
                    <p>Країна: {val.name_country ? val.name_country : "дані відсутні"} </p>
                    <p>Тип населеного пункту: {val.name_type ? val.name_type : "дані відсутні"}</p>

                    <p data-tip data-for={`namePopulation${val.id}`}>
                      Характеристика населення:{" "}
                      <span className="values-hover">
                        {val.name_population ? val.name_population : "дані відсутні"}{" "}
                      </span>
                    </p>
                    <ReactTooltip id={`namePopulation${val.id}`} place="bottom" type="info">
                      <div>
                        <p>Кількість населення: {val.name_population ? val.name_population : "дані відсутні"}</p>
                        <p>
                          Середня кількість населення:{" "}
                          {val.approximate_max_pop ? `${val.approximate_max_pop} чоловік` : "дані відсутні"}
                        </p>
                      </div>
                    </ReactTooltip>

                    <p data-tip data-for={`nameRelief${val.id}`}>
                      Рельєф:{" "}
                      <span className="values-hover">{val.name_relief ? val.name_relief : "дані відсутні"}</span>{" "}
                    </p>
                    <ReactTooltip id={`nameRelief${val.id}`} place="bottom" type="info">
                      <div>
                        <p>Тип рельєфу: {val.name_relief ? val.name_relief : "дані відсутні"}</p>
                        <p>Середня найвища точка: {val.high_position ? val.high_position : "дані відсутні"} метрів</p>
                      </div>
                    </ReactTooltip>
                    <p>Опис: {val.descriptions ? val.descriptions : "дані відсутні"}</p>
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

                    {isAdmin ? (
                      <div className="admin-buttons d-flex justify-content-end mt2">
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            setModalSettlement(true);
                            getAllCountries();
                            getAllSettlementTypes();
                            getAllPopulationTypes();
                            getAllReliefTypes();
                            setCurrentSettlement(val);
                          }}
                        >
                          Змінити
                        </button>
                        <button
                          className="btn btn-danger ml1"
                          onClick={(e) => {
                            e.preventDefault();
                            deleteSettlement(val.id);
                          }}
                        >
                          Видалити
                        </button>

                        <Modal
                          style={customStyles}
                          isOpen={modalSettlement}
                          onRequestClose={() => setModalSettlement(false)}
                        >
                          <div className="modal-block high">
                            <div className="modal-header">
                              <h5 className="modal-title">Змінити дані про населений пункт</h5>
                            </div>
                            <div className="modal-body">
                              <label className="form-label">Назва населеного пункту*</label>
                              <input
                                defaultValue={val.name_settlement}
                                type="text"
                                spellCheck={false}
                                className="form-control"
                                id="nameSettlement"
                                name="nameSettlement"
                                onChange={changeAdminHandlerSettlement}
                              />

                              <label className="form-label">Кількість населення</label>
                              <input
                                defaultValue={val.population}
                                type="number"
                                min={1}
                                className="form-control"
                                id="populationSettlement"
                                name="populationSettlement"
                                onChange={changeAdminHandlerSettlement}
                              />

                              <label className="form-label">Рік заснування</label>
                              <input
                                defaultValue={val.year_of_foundation}
                                type="number"
                                min={1}
                                className="form-control"
                                id="yearSettlement"
                                name="yearSettlement"
                                onChange={changeAdminHandlerSettlement}
                              />

                              <label className="form-label">Чи є столицею?</label>
                              <select
                                class="form-select"
                                aria-label="Default select example"
                                name="isCapitalSettlement"
                                id="isCapitalSettlement"
                                onChange={changeAdminHandlerSettlement}
                              >
                                <option selected value={val.is_capiatl}>
                                  {val.is_capital}
                                </option>
                                <option value={1}>1 - Так</option>
                                <option value={0}>0 - Ні</option>
                              </select>

                              <label className="form-label">Країна</label>
                              <select
                                class="form-select"
                                aria-label="Default select example"
                                name="countrySettlement"
                                id="countrySettlement"
                                onChange={changeAdminHandlerSettlement}
                              >
                                <option selected value={val.name_country}>
                                  {val.name_country}
                                </option>
                                {allCountries.map((val) => (
                                  <option value={val.id}>{val.name_country}</option>
                                ))}
                              </select>

                              <label className="form-label">Тип населеного пункту</label>
                              <select
                                class="form-select"
                                aria-label="Default select example"
                                name="typeSettlement"
                                id="typeSettlement"
                                onChange={changeAdminHandlerSettlement}
                              >
                                <option selected value={val.name_type}>
                                  {val.name_type}
                                </option>
                                {allSettlementTypes.map((val) => (
                                  <option value={val.id}>{val.name_type}</option>
                                ))}
                              </select>

                              <label className="form-label">Тип населенності</label>
                              <select
                                class="form-select"
                                aria-label="Default select example"
                                name="populationTypeSettlement"
                                id="populationTypeSettlement"
                                onChange={changeAdminHandlerSettlement}
                              >
                                <option selected value={val.name_population}>
                                  {val.name_population}
                                </option>
                                {allPopulationTypes.map((val) => (
                                  <option value={val.id}>{val.name_population}</option>
                                ))}
                              </select>

                              <label className="form-label">Тип рельєфу</label>
                              <select
                                class="form-select"
                                aria-label="Default select example"
                                name="reliefSettlement"
                                id="reliefSettlement"
                                onChange={changeAdminHandlerSettlement}
                              >
                                <option selected value={val.name_relief}>
                                  {val.name_relief}
                                </option>
                                {allReliefTypes.map((val) => (
                                  <option value={val.id}>{val.name_relief}</option>
                                ))}
                              </select>

                              <label className="form-label">Додатковий матеріал</label>
                              <input
                                defaultValue={val.material}
                                type="text"
                                spellCheck={false}
                                className="form-control"
                                id="materialSettlement"
                                name="materialSettlement"
                                onChange={changeAdminHandlerSettlement}
                              />

                              <label className="form-label">Опиc:</label>
                              <textarea
                                defaultValue={val.descriptions}
                                type="text"
                                spellCheck={false}
                                rows={5}
                                cols={56}
                                className="form-control"
                                id="descriptionsSettlement"
                                name="descriptionsSettlement"
                                onChange={changeAdminHandlerSettlement}
                              />

                              <label className="form-label">Зображення</label>
                              <div className="adminImage d-flex ">
                                <input
                                  type="file"
                                  placeholder="pj"
                                  onChange={(e) => {
                                    e.preventDefault();
                                    setImgSettlement(e.target.files[0]);
                                  }}
                                />
                              </div>
                            </div>
                            {/* Modal footer buttons */}
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={() => setModalSettlement(false)}
                              >
                                Закрити
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  updateSettlement(val).then(() => {
                                    setModalSettlement(false);
                                    form.searchName = adminFormSettlement.nameSettlement;
                                    document.getElementById("searchName").value = form.searchName;
                                    settlementHandler();
                                  });
                                }}
                              >
                                Відредагувати
                              </button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
