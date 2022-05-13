import React, { useState, useEffect } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useHttp } from "../hooks/http.hook";

export const Termins = ({ isAdmin }) => {
  const [allSettlementTypes, setAllSettlementTypes] = useState([]);
  const [allPopulationTypes, setAllPopulationTypes] = useState([]);
  const [allClimateTypes, setAllClimateTypes] = useState([]);
  const [allReliefTypes, setAllReliefTypes] = useState([]);

  const { request, error, clearError } = useHttp();

  //Get all
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
  useEffect(() => {
    getAllSettlementTypes();
    getAllPopulationTypes();
    getAllReliefTypes();
    getAllClimateTypes();
  }, []);

  return (
    <div>
      <Header isAdmin={isAdmin} />
      <div className="container col-sm-8" style={{ marginTop: 100 }}>
        <h5 className="text-center">
          На цій сторінці наведено короткий опис термінів та назв, що використовуються у системі. Інформація наведена у
          вигляді таблиць для кращого та яснішого їх спийняття.
        </h5>
        <h4 className="mt-5 ">Клімат</h4>
        <table className="table table-striped mt-3" style={{ marginBottom: 60 }}>
          <thead className="table-primary">
            <tr>
              <th scope="col">Тип клімату</th>
              <th scope="col">Повітряні маси</th>
              <th scope="col">Середня температура повітря влітку</th>
              <th scope="col">Середня температура повітря взимку</th>
            </tr>
          </thead>
          <tbody>
            {allClimateTypes.map((val) => {
              return (
                <tr>
                  <th className="w-25">{val.name_climate}</th>
                  <td>{val.air_masses}</td>
                  <td className="w-25">{val.avg_temp_summer} &#176;C</td>
                  <td className="w-25">{val.avg_temp_winter} &#176;C</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h4 className="mt-5 ">Населені пункти</h4>
        <table className="table table-striped mt-3" style={{ marginBottom: 60 }}>
          <thead className="table-primary">
            <tr>
              <th scope="col">Тип населеного пункту</th>
              <th scope="col">Опис</th>
            </tr>
          </thead>
          <tbody>
            {allSettlementTypes.map((val) => {
              return (
                <tr>
                  <th className="w-25">{val.name_type}</th>
                  <td>{val.descriptions}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h4 className="mt-5 ">Населенність</h4>
        <table className="table table-striped mt-3" style={{ marginBottom: 60 }}>
          <thead className="table-primary">
            <tr>
              <th scope="col">Характеристична оцінка населенності</th>
              <th scope="col">Приблизний узагальнений максимум</th>
            </tr>
          </thead>
          <tbody>
            {allPopulationTypes.map((val) => {
              return (
                <tr>
                  <th className="">{val.name_population}</th>
                  <td>{val.approximate_max_pop} чоловік</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <h4 className="mt-5 ">Рельєф</h4>
        <table className="table table-striped mt-3" style={{ marginBottom: 60 }}>
          <thead className="table-primary">
            <tr>
              <th scope="col">Тип рельєфу</th>
              <th scope="col">Приблизна середня висота</th>
            </tr>
          </thead>
          <tbody>
            {allReliefTypes.map((val) => {
              return (
                <tr>
                  <th className="">{val.name_relief}</th>
                  <td>{val.high_position} метрів</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
};
