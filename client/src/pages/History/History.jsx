import React from 'react';
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./History.module.scss";
import axios from "axios";

const cx = classNames.bind(styles)

const History = () => {
  const [history, sethistory] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost/DADN/v2/AUTOMATIC-WATERING-MHung/server/pages/History/History.php`)
      .then(response => {
        sethistory(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("label")}>History</div>
      <div className={cx("table")}>
        <table
          className="table table-bordered table-light"
          style={{ marginTop: "10px", borderWidth: "3px" }}
        >
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Time</th>
              <th scope="col">Activity</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td>{item.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History