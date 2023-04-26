import React, { useEffect, useState } from 'react'
import classNames from "classnames/bind"
import styles from "./Maintenance.module.scss"

const cx = classNames.bind(styles)

const Maintenance = () => {

  const orders = [1, 2, 3];
  const names = ["Thông", "Hưng", "Quân"];
  const phones = ["1234567890", "2345678901", "3456789012"];

  return (
    <div className={cx("container")}>
      <div className={cx("background")}>
        <div className={cx("label")}>
          Maintenance staff list
        </div>
        <div className={cx("notification")}>
          <table
            className="table table-bordered table-light"
            style={{ marginTop: "10px", borderWidth: "3px" }}
          >
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Name</th>
                <th scope="col">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={order}>
                  <td>{order}</td>
                  <td>{names[i]}</td>
                  <td>{phones[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Maintenance