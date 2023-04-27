import React, { useEffect, useState } from 'react'
import classNames from "classnames/bind"
import styles from "./Performance.module.scss"
import { useRef } from 'react'

const cx = classNames.bind(styles)

const Performance = () => {

  const [percentage, setPercentage] = useState(0);

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

  //-----------------------------------------------
  // [minutes, setMinutes] = useState("00");
  const radius = 70
  const dashArray = radius * Math.PI * 2
  const [dashOffset, setDashOffset] = useState(dashArray)
  const [startTimer, setStartTimer] = useState(true)
  const [count, setCount] = useState(60)
  const Timer = useRef()
  useEffect(() => {

    if (startTimer) {
      Timer.current = setInterval(() => {
        //setCount(prevState => prevState - 1);
        setCount(prevState => {
          if (prevState <= 0) {
            clearInterval(Timer.current);
            setStartTimer(false);
            return 0;
          }
          return prevState - 1;
        });
        const percentage = count / 60
        setDashOffset(percentage * dashArray);

        const newPercentage = Math.round(100 - percentage * 100 + 100.0 / 60) - 2;
        setPercentage(`${newPercentage}%`);
        console.log(count);
        if (count < 0) {
          setStartTimer(false)
        }
      }, 500)
    } else {
      clearInterval(Timer.current)
    }

    return () => clearInterval(Timer.current);
  }, [count]);

  const pauseWatering = () => {
    setStartTimer(false)
  }

  const resetWatering = () => {
    setStartTimer(true)
    setCount(60)
    setDashOffset(dashArray)
    clearInterval(Timer.current)
  };

  const continuewatering = () => {
    setStartTimer(true)
  }

  return (
    <div className={cx("container")}>
      <div className={cx("process")}>
        <div className={cx("time")}>
          <div className={cx("circle")} style={{ "--clr": "#04fc43" }}>
            <svg className={cx("svg")}>
              <circle cx={radius} cy={radius} r={radius}></circle>
              <circle cx={radius} cy={radius} r={radius}
                style={{
                  strokeDasharray: dashArray,
                  strokeDashoffset: dashOffset
                }} id="mm"></circle>
            </svg>
            <div id="minutes">{percentage}</div>
          </div>
        </div>
        <div className={cx("buttons")}>
          <button onClick={pauseWatering} className={cx("Turnoff", "button")}>Turn off</button>
          <button onClick={continuewatering} className={cx("continue", "button")}>Continue</button>
          <button onClick={resetWatering} className={cx("button")}>Reset</button>
        </div>
      </div>

      <div className={cx("sensor")}>
        <div className="row">
          {events.map((event) => (
            <div className={cx("perform-background")}>
              <div className={cx("sensor1")}>Sensor {event.id}</div>
              <div className={cx("sensor2")}>
                <div className={cx("temp-sensor")}>
                  t: {event.temperature} <span className={cx("doC")}>o</span>C
                </div>
                <div className={cx("humidity-sensor")}>
                  a: {event.Humidity} %
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Performance