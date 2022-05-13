import React, { useState, useContext, useCallback, useEffect } from "react";
import Axios from "axios";
import { AuthContext } from "../context/auth.context";
import Modal from "react-modal";
import { useMessage } from "../hooks/messages.hook";
import { useHttp } from "../hooks/http.hook";
import { customStyles } from "../custom/customStyles";
import { Link } from "react-router-dom";

export const Header = ({ isAdmin }) => {
  const [modalSettlement, setModalSettlement] = useState(false);
  const [modalCountry, setModalCountry] = useState(false);
  const [modalProject, setModalProject] = useState(false);

  const [allCountries, setAllCountries] = useState([]);
  const [allSettlementTypes, setAllSettlementTypes] = useState([]);
  const [allPopulationTypes, setAllPopulationTypes] = useState([]);
  const [allClimateTypes, setAllClimateTypes] = useState([]);
  const [allReliefTypes, setAllReliefTypes] = useState([]);

  const [imgCountry, setImgCountry] = useState(null);
  const [adminImageCountry, setAdminImageCountry] = useState(null);
  const [imgSettlement, setImgSettlement] = useState(null);
  const [adminImageSettlement, setAdminImageSettlement] = useState(null);

  const [adminFormCountry, setAdminFormCountry] = useState({
    codeCountry: null,
    nameCountry: null,
    squareCountry: null,
    climateCountry: null,
    populationCountry: null,
    currencyCountry: null,
    descriptionsCountry: null,
    materialCountry: null,
    historyCountry: null,
  });

  const [adminFormSettlement, setAdminFormSettlement] = useState({
    nameSettlement: null,
    populationSettlement: null,
    yearSettlement: null,
    isCapitalSettlement: null,
    countrySettlement: null,
    typeSettlement: null,
    populationTypeSettlement: null,
    reliefSettlement: null,
    materialSettlement: null,
    descriptionsSettlement: null,
  });

  const { request, error, clearError } = useHttp();
  const msg = useMessage();
  const auth = useContext(AuthContext);

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

  //Create
  const createSettlement = async () => {
    try {
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
      dataFile.append("newImageSettlement", imgSettlement);

      const filePath = imgSettlement
        ? (
            await Axios.post("/api/main/search/settlements/load", dataFile, {
              headers: {
                "content-type": "multipart/form-data",
              },
            })
          ).data.path
        : null;

      const data = await request(`/api/main/create/settlements`, "POST", {
        ...adminFormSettlement,
        pathSettlement: filePath,
      });
      msg(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  const createCountry = async () => {
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
      dataFile.append("newImageCountry", imgCountry);

      const filePath = imgCountry
        ? (
            await Axios.post("/api/main/search/countries/load", dataFile, {
              headers: {
                "content-type": "multipart/form-data",
              },
            })
          ).data.path
        : null;

      const data = await request(`/api/main/create/countries`, "POST", { ...adminFormCountry, pathCountry: filePath });
      msg(data.message);
    } catch (e) {
      console.log(e);
    }
  };

  //Current
  const setEmptyCountry = async (val) => {
    adminFormCountry.codeCountry = null;
    adminFormCountry.nameCountry = null;
    adminFormCountry.squareCountry = null;
    adminFormCountry.climateCountry = null;
    adminFormCountry.populationCountry = null;
    adminFormCountry.currencyCountry = null;
    adminFormCountry.descriptionsCountry = null;
    adminFormCountry.materialCountry = null;
    adminFormCountry.historyCountry = null;
  };

  const setEmptySettlement = async (val) => {
    adminFormSettlement.nameSettlement = null;
    adminFormSettlement.populationSettlement = null;
    adminFormSettlement.yearSettlement = null;
    adminFormSettlement.isCapitalSettlement = null;
    adminFormSettlement.countrySettlement = null;
    adminFormSettlement.typeSettlement = null;
    adminFormSettlement.populationTypeSettlement = null;
    adminFormSettlement.reliefSettlement = null;
    adminFormSettlement.materialSettlement = null;
    adminFormSettlement.descriptionsSettlement = null;
  };

  //Logout
  const logoutHandler = (event) => {
    auth.logout();
  };

  useEffect(() => {
    msg(error);
    clearError();
  }, [error, msg, clearError]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <span className="navbar-brand">Countries and settlements</span>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">
                  Головна
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalProject(true);
                  }}
                >
                  Про систему
                </a>
              </li>
              <li className="nav-item">
                <Link to="/terms" style={{ textDecoration: "none" }}>
                  <a className="nav-link">Терміни</a>
                </Link>
              </li>
            </ul>
          </div>

          <Modal style={customStyles} isOpen={modalProject} onRequestClose={() => setModalProject(false)}>
            <div className="" style={{ maxWidth: 400 }}>
              <div className="modal-block high">
                <div className="modal-header">
                  <h5 className="modal-title">Відомості про систему</h5>
                </div>
                <div className="modal-body">
                  <p>
                    Вітаємо у інформаційній системі! Система призначена для інформаційних цілей. У ній надана
                    першочергова та основна інформація про країни та населені пункти. Щодо пошуку країни, наводяться
                    такі параметри як, столиця, кількість наслеенння та характеристика населення, площа, кліматичні
                    аспекти, прапор, короткий опис, додатковий матеріал у вигляді посилання на додаткове джерело, тощо.
                    Пошук по населеному пункту також дасть у результаті низку параметрів щодо населеного пункту,
                    зокрема, характеристику населеного пункту, населенності, рельєфу та інше. У системі наявний описа
                    термінів, що використовуються у характеристиці країн та населених пунктів.
                  </p>
                  <div className="d-flex justify-content-end">
                    {" "}
                    <button
                      className="btn btn-secondary"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalProject(false);
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
            <div>
              <div>
                <Link to="/logTable">
                  <button class="btn btn-primary btn-sm mx-2">Журнал редагувань</button>
                </Link>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalSettlement(false);
                    setModalCountry(true);
                    getAllClimateTypes();
                    setEmptyCountry();
                  }}
                >
                  Додати країну
                </button>

                <Modal style={customStyles} isOpen={modalCountry} onRequestClose={() => setModalCountry(false)}>
                  <div className="modal-block high">
                    <div className="modal-header">
                      <h5 className="modal-title">Додати дані про країну</h5>
                    </div>
                    <div className="modal-body">
                      <label className="form-label">Код країни*</label>
                      <input
                        type="text"
                        spellCheck={false}
                        className="form-control"
                        id="codeCountry"
                        name="codeCountry"
                        onChange={changeAdminHandlerCountry}
                      />

                      <label className="form-label">Назва країни*</label>
                      <input
                        type="text"
                        spellCheck={false}
                        className="form-control"
                        id="nameCountry"
                        name="nameCountry"
                        onChange={changeAdminHandlerCountry}
                      />

                      <label className="form-label">Площа</label>
                      <input
                        type="number"
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
                        <option selected>Оберіть тип</option>
                        {allClimateTypes.map((val) => (
                          <option value={val.id}>{val.name_climate}</option>
                        ))}
                      </select>

                      <label className="form-label">Кількість населення</label>
                      <input
                        type="number"
                        className="form-control"
                        id="populationCountry"
                        name="populationCountry"
                        onChange={changeAdminHandlerCountry}
                      />

                      <label className="form-label">Валюта</label>
                      <input
                        type="text"
                        className="form-control"
                        id="currencyCountry"
                        name="currencyCountry"
                        onChange={changeAdminHandlerCountry}
                      />

                      <label className="form-label">Опиc</label>
                      <textarea
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
                          createCountry();
                          setModalCountry(false);
                        }}
                      >
                        Додати
                      </button>
                    </div>
                  </div>
                </Modal>
                <button
                  className="btn btn-primary btn-sm mx-2"
                  onClick={(e) => {
                    e.preventDefault();
                    setModalCountry(false);
                    setModalSettlement(true);
                    getAllCountries();
                    getAllSettlementTypes();
                    getAllPopulationTypes();
                    getAllClimateTypes();
                    getAllReliefTypes();
                    setEmptySettlement();
                  }}
                >
                  Додати населений пункт
                </button>
                <Modal style={customStyles} isOpen={modalSettlement} onRequestClose={() => setModalSettlement(false)}>
                  <div className="modal-block high">
                    <div className="modal-header">
                      <h5 className="modal-title">Додати дані про населений пункт</h5>
                    </div>
                    <div className="modal-body">
                      <label className="form-label">Назва населеного пункту*</label>
                      <input
                        type="text"
                        spellCheck={false}
                        className="form-control"
                        id="nameSettlement"
                        name="nameSettlement"
                        onChange={changeAdminHandlerSettlement}
                      />

                      <label className="form-label">Кількість населення</label>
                      <input
                        type="number"
                        className="form-control"
                        id="populationSettlement"
                        name="populationSettlement"
                        onChange={changeAdminHandlerSettlement}
                      />

                      <label className="form-label">Рік заснування</label>
                      <input
                        type="number"
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
                        <option selected>Так чи ні</option>

                        <option value={0}>Ні</option>
                        <option value={1}>Так</option>
                      </select>

                      <label className="form-label">Країна</label>
                      <select
                        class="form-select"
                        aria-label="Default select example"
                        name="countrySettlement"
                        id="countrySettlement"
                        onChange={changeAdminHandlerSettlement}
                      >
                        <option selected>Оберіть країну</option>
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
                        <option selected>Оберіть тип</option>
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
                        <option selected>Оберіть тип</option>
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
                        <option selected>Оберіть тип</option>
                        {allReliefTypes.map((val) => (
                          <option value={val.id}>{val.name_relief}</option>
                        ))}
                      </select>

                      <label className="form-label">Додатковий матеріал</label>
                      <input
                        type="text"
                        spellCheck={false}
                        className="form-control"
                        id="materialSettlement"
                        name="materialSettlement"
                        onChange={changeAdminHandlerSettlement}
                      />

                      <label className="form-label">Опиc:</label>
                      <textarea
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
                          createSettlement();
                          setModalSettlement(false);
                        }}
                      >
                        Додати
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          ) : null}

          <a className="btn btn-outline-danger" onClick={logoutHandler} href="/">
            Вийти
          </a>
        </div>
      </nav>
    </div>
  );
};
