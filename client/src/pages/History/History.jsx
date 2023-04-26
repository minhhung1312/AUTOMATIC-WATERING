import React from 'react';
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./History.module.scss";

const cx = classNames.bind(styles)

const events = [
  {
    day: '25-04-2023',
    time: '11:00:00',
    activity: 'Start Watering',
  },
  {
    day: '25-04-2023',
    time: '11:17:28',
    activity: 'End Watering',
  },
  {
    day: '26-04-2023',
    time: '09:50:00',
    activity: 'Start Watering',
  },
  {
    day: '26-04-2023',
    time: '10:8:23',
    activity: 'End Watering',
  },
];

const History = () => {

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
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.day}</td>
                <td>{event.time}</td>
                <td>{event.activity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History