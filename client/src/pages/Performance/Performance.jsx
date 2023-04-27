import React, { useEffect, useState } from 'react'
import classNames from "classnames/bind"
import styles from "./Performance.module.scss"
import { useRef } from 'react'
import { IOKey } from '../../utils/IOKey'

const cx = classNames.bind(styles)

const Performance = () => {

  const Key = IOKey.split("").reverse().join("");

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
  ];

  //-----------------------------------------------
  // [minutes, setMinutes] = useState("00");
  const radius = 70
  const dashArray = radius * Math.PI * 2
  const [dashOffset, setDashOffset] = useState(dashArray)
  const [startTimer, setStartTimer] = useState(true)
  const [count, setCount] = useState(localStorage.getItem("time"))
  const Timer = useRef()

  const [singleTemp, setSingleTemp] = useState();
  const [singleAir, setSingleAir] = useState();

  useEffect(() => {
    const getSingleTemp = () => {
      fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/temperature-sensor/data/last', {
        method: "GET",
        headers: {
          "X-AIO-Key": Key,
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          // Process the data and extract relevant data points
          console.log(data);
          setSingleTemp(data.value);
        })
        .catch(error => console.error('Error fetching data from Adafruit IO:', error));
    }
    getSingleTemp();
    setInterval(getSingleTemp, 15000);

    return () => {
      clearInterval(getSingleTemp);
    }
  }, []);

  useEffect(() => {
    const getSingleAir = () => {
      fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/humidity-sensor/data/last', {
        method: "GET",
        headers: {
          "X-AIO-Key": Key,
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          // Process the data and extract relevant data points
          console.log(data);
          setSingleAir(data.value);
        })
        .catch(error => console.error('Error fetching data from Adafruit IO:', error));
    }
    getSingleAir();
    setInterval(getSingleAir, 15000);

    return () => {
      clearInterval(getSingleAir);
    }
  }, []);

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
        const percentage = count / localStorage.getItem("time");
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
  }, [count, startTimer]);

  const pauseWatering = () => {
    setStartTimer(false)

    fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/pump-switch/data', {
            method: "POST",
            headers: {
                "X-AIO-Key": Key,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "value": 0}),
        }).then(response => response.json())
            .catch(error => console.error('Error fetching data from Adafruit IO:', error));
  }

  const resetWatering = () => {
    setStartTimer(true)
    setCount(localStorage.getItem("time"))
    setDashOffset(dashArray)
    clearInterval(Timer.current)

    if (localStorage.getItem("mode") === "semi") {
      fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/semi-auto/data', {
            method: "POST",
            headers: {
                "X-AIO-Key": Key,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "value": localStorage.getItem("time") }),
        }).then(response => response.json())
            .catch(error => console.error('Error fetching data from Adafruit IO:', error));
    }


  };

  const continuewatering = () => {
    setStartTimer(true)

    fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/pump-switch/data', {
            method: "POST",
            headers: {
                "X-AIO-Key": Key,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "value": 1}),
        }).then(response => response.json())
      .catch(error => console.error('Error fetching data from Adafruit IO:', error));
    
    if (localStorage.getItem("mode") === "auto") {
      const max = 90;
      const min = 20; 

      fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/auto/data', {
            method: "POST",
            headers: {
                "X-AIO-Key": Key,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "value": `${min}:${max}`}),
        }).then(response => response.json())
        .catch(error => console.error('Error fetching data from Adafruit IO:', error));
    }
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
            <div className={cx("perform-background")}>
              <div className={cx("sensor1")}>Sensor {1}</div>
              <div className={cx("sensor2")}>
                <div className={cx("temp-sensor")}>
                  T: {singleTemp} <span className={cx("doC")}>o</span>C
                </div>
                <div className={cx("humidity-sensor")}>
                  H: {singleAir} %
                </div>
              </div>
            </div>
          {events.map((event) => (
            <div className={cx("perform-background")}>
              <div className={cx("sensor1")}>Sensor {event.id}</div>
              <div className={cx("sensor2")}>
                <div className={cx("temp-sensor")}>
                  T: {event.temperature} <span className={cx("doC")}>o</span>C
                </div>
                <div className={cx("humidity-sensor")}>
                  H: {event.Humidity} %
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