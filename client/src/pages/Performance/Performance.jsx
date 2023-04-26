import React, { useEffect, useState } from 'react'
import classNames from "classnames/bind"
import styles from "./Performance.module.scss"

const cx = classNames.bind(styles)

const Performance = () => {

  const [percentage, setPercentage] = useState(0);
  const [isWatering, setIsWatering] = useState(false);

  const events = [
    {
      id: '1',
      temperature: '20',
      Humidity: '50',
    },
    {
      id: '2',
      temperature: '21',
      Humidity: '60',
    },
    {
      id: '3',
      temperature: '22',
      Humidity: '70',
    },
    {
      name: '4',
      temperature: '23',
      Humidity: '80',
    },
  ];

  /*   useEffect(() => {
      let intervalId;
      if (isWatering) {
        intervalId = setInterval(() => {
          setPercentage(prevPercentage => prevPercentage + 10);
        }, 750);
      }
  
      return () => clearInterval(intervalId);
    }, [isWatering]);
  
    const startWatering = () => {
      setIsWatering(true);
    };
  
    const pauseWatering = () => {
      setIsWatering(false);
    };
  
    const resetWatering = () => {
      setPercentage(0);
      setIsWatering(false);
    }; */

  //-----------------------------------------------
  const [minutes, setMinutes] = useState("00");

  useEffect(() => {
    let endDate = new Date("04/30/2023 00:00:00").getTime();

    const interval = setInterval(() => {
      let now = new Date().getTime();
      let distance = endDate - now;

      let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      setMinutes(m < 10 ? "0" + m : m);

      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cx("container")}>
      <div className="row">
        <div className="col-md-6">
          <div className={cx("time")}>
            <div className={cx("circle")} style={{ "--clr": "#04fc43" }}>
              <div className={cx("dots")}></div>
              <svg>
                <circle cx="70" cy="70" r="70"></circle>
                <circle cx="70" cy="70" r="70" strokeDashoffset={440 - (440 * minutes) / 60} id="mm"></circle>
              </svg>
              <div id="minutes">{minutes}<br /><span>Minutes</span></div>
            </div>
          </div>

          {/* <button onClick={startWatering}>Tưới</button> */}
          <div className="percentage">{percentage}% đã tưới</div>
          <button /* onClick={pauseWatering} */ className={cx("Turnoff", "button")}>Turn off</button>
          <button /* onClick={resetWatering} */ className={cx("button")}>Modify</button>
        </div>

        <div className="col-md-6">
          <div className="row">
            {events.map((event) => (
              <div className={cx("perform-background")}>
                <div className={cx("sensor")}>Sensor {event.id}</div>
                <div className={cx("sensor")}>
                  t: {event.temperature} oC
                  <br />
                  a: {event.Humidity} %
                  <br />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Performance