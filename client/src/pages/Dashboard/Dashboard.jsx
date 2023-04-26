import React, { useState, useEffect } from 'react'
import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faTemperature1 } from '@fortawesome/free-solid-svg-icons';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

const cx = classNames.bind(styles);

const Dashboard = () => {
  const datatemp = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'Soil moisture',
        data: [65, 59, 80, 81, 56, 55, 40, 60, 62, 64, 65, 59, 80, 81, 56, 55, 40, 60, 62, 64],
        fill: false,
        borderColor: 'rgb(246, 31, 31)',
        tension: 0.1
      }
    ]
  };
  const dataair = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'Soil moisture',
        data: [65, 59, 80, 81, 56, 55, 40, 60, 62, 64, 65, 59, 80, 81, 56, 55, 40, 60, 62, 64],
        fill: false,
        borderColor: 'rgb(0, 255, 209)',
        tension: 0.1
      }
    ]
  };
  const datasoil = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: 'Soil moisture',
        data: [65, 59, 80, 81, 56, 55, 40, 60, 62, 64, 65, 59, 80, 81, 56, 55, 40, 60, 62, 64],
        fill: false,
        borderColor: 'rgb(255, 144, 41)',
        tension: 0.1
      }
    ]
  };

  const [isBlockauto, setIsBlockauto] = useState(1);
  const [isBlocksemiauto, setIsBlocksemiauto] = useState(0);

  const handleAutoClick = () => {
    setIsBlockauto(0);
    setIsBlocksemiauto(1);
  };

  const handleSemiAutoClick = () => {
    setIsBlockauto(1);
    setIsBlocksemiauto(0);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("column1")}>
        <div className={cx("status-mode")}>
          <div className={cx("status")}>
            <p className={cx("title")}>
              Note status
            </p>
            <div className={cx("text-status")}>
              <div className={cx("normal")}>
                <FontAwesomeIcon icon={faCircle} className={cx("icon-normal")} />
                Normal
              </div>
              <div className={cx("warning")}>
                <FontAwesomeIcon icon={faCircle} className={cx("icon-warning")} />
                Warning
              </div>
              <div className={cx("error")}>
                <FontAwesomeIcon icon={faCircle} className={cx("icon-error")} />
                Error
              </div>
            </div>
          </div>
          <div className={cx("mode")}>
            <p className={cx("title")}>Irrigation mode</p>
            <div className={cx("button-mode")}>
              <button className={cx("auto-mode", { "block": isBlockauto === 1 })}
                onClick={handleAutoClick}>
                Auto
              </button>
              <button className={cx("semi-auto-mode", { "block": isBlocksemiauto === 1 })}
                onClick={handleSemiAutoClick}>
                Semi-auto
              </button>
            </div>
          </div>
        </div>
        <div className={cx("chart")}>
          <div className={cx("temperature")}>
            <div className={cx("head-title")}>
              <p className={cx("title")}>Temperature</p>
              <p className={cx("text-update")}>Last update: Now </p>
            </div>
            <div className={cx("detail-chart")}>
              <Line data={datatemp} />
            </div>
          </div>
          <div className={cx("air")}>
            <div className={cx("head-title")}>
              <p className={cx("title")}>Air humidity</p>
              <p className={cx("text-update")}>Last update: Now </p>
            </div>
            <div className={cx("detail-chart")}>
              <Line data={dataair} />
            </div>
          </div>
          <div className={cx("soil")}>
            <div className={cx("head-title")}>
              <p className={cx("title")}>Soil moisture</p>
              <p className={cx("text-update")}>Last update: Now </p>
            </div>
            <div className={cx("detail-chart")}>
              <Line data={datasoil} />
            </div>
          </div>
        </div>
      </div>

      <div className={cx("column2")}>
        <div className={cx("humidity-temp")}>
          <div className={cx("humidity")}>
            <p className={cx("title")}>
              Humidity
            </p>
            <div className={cx("detail-humidity")}>
              <FontAwesomeIcon icon={faDroplet} className={cx("icon-humidity")} />
              <p className={cx("text-humidity")}>51%</p> {/*add DB*/}
            </div>
          </div>
          <div className={cx("temp")}>
            <p className={cx("title")}>
              Temperature
            </p>
            <div className={cx("detail-temp")}>
              <FontAwesomeIcon icon={faTemperature1} className={cx("icon-temp")} />
              <p className={cx("text-temp")}>
                27<span className={cx("doC")}>o</span>C
              </p>
            </div>
          </div>
        </div>
        <div className={cx("process")}>
          <p className={cx("title", "select-plant")}>
            <span>Watering process</span>
          </p>
          {/*add DB*/}
          <div className={cx("circle-process")}>

          </div>
          <div className={cx("view-detail")}>
            <button className={cx("button-detail")} onClick={() => window.location.href = '/Performance'}>
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>

      <div className={cx("column3")}>
        <div className={cx("sensor-status")}>
          <p className={cx("title")}>
            Sensor status
          </p>
          <div className={cx("text-status")}>
            <div className={cx("temp-sensor")}>
              Temperature sensor
              <FontAwesomeIcon icon={faCircle} className={cx("icon-normal")} />
            </div>
            <div className={cx("humi-sensor")}>
              Humidity sensor
              <FontAwesomeIcon icon={faCircle} className={cx("icon-warning")} />
            </div>
            <div className={cx("soil-moisture-sensor")}>
              Soil moisture sensor
              <FontAwesomeIcon icon={faCircle} className={cx("icon-error")} />
            </div>
          </div>
        </div>
        <div className={cx("request")}>
          <p className={cx("title")}>
            Request
          </p>
          <div className={cx("text-status")}>
            <div>
              Temperature: ... {/*add DB*/}
            </div>
            <div>
              Humidity: ... {/*add DB*/}
            </div>
            <div >
              Soil moisture: ... {/*add DB*/}
            </div>
          </div>
        </div>
        <div className={cx("nofi")}>
          <p className={cx("title")}>
            Nofication
          </p>
        </div>
      </div>

    </div>
  );
};

export default Dashboard
