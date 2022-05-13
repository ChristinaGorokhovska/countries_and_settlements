import React, { useEffect, useState } from "react";
import { Header } from "./Header";
import Axios from "axios";
import { useMessage } from "../hooks/messages.hook";
import { Footer } from "./Footer";

export const LogTable = ({ isAdmin }) => {
  const [logsTable, setLogsTable] = useState([]);

  const msg = useMessage();

  const getLogsTable = () => {
    Axios.get("/api/logTable").then((res) => {
      setLogsTable(res.data);
    });
  };

  const deleteLogsTable = async () => {
    Axios.delete("/api/logTable").then((res) => {
      setLogsTable([]);
      msg("Logs deleted!");
    });
  };

  useEffect(() => {
    getLogsTable();
  }, []);

  return (
    <div>
      <Header isAdmin={isAdmin} />

      <div className="container col-8">
        <div className="d-flex align-items-center justify-content-end" style={{ marginTop: 120 }}>
          <h5>Якщо бажаєте видалити записи із журналу - натисніть "Очистити"</h5>
          <button className="btn btn-danger ms-4" onClick={deleteLogsTable}>
            Очистити
          </button>
        </div>
        <table className="table table-hover" style={{ marginTop: 60 }}>
          <thead className="table-dark">
            <tr>
              <th scope="col">id запису</th>
              <th scope="col">Дата та час операції</th>
              <th scope="col">Таблиця</th>
              <th scope="col">Запит</th>
            </tr>
          </thead>
          <tbody>
            {logsTable.map((val) => {
              return (
                <tr>
                  <th>{val.row_id}</th>
                  <td>{val.time_operation}</td>
                  <td>{val.name_table}</td>
                  <td className="w-50">{val.query_log}</td>
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
