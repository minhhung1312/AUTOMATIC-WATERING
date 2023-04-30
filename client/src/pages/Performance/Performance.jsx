import React, { useEffect, useState } from 'react'
import classNames from "classnames/bind"
import styles from "./Performance.module.scss"
import { useRef } from 'react'
import { IOKey } from '../../utils/IOKey'
import axios from 'axios';

const cx = classNames.bind(styles)

const Performance = () => {

  const Key = IOKey.split("").reverse().join("");

  const [percentage, setPercentage] = useState(0);

  const events = [1, 2, 3, 4];

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
      }, 1000)
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
      body: JSON.stringify({ "value": 0 }),
    }).then(response => response.json())
      .catch(error => console.error('Error fetching data from Adafruit IO:', error));


    const formData = new FormData();
    formData.append('date', new Date().toLocaleDateString());
    formData.append('time', new Date().toLocaleTimeString());
    formData.append('activity', 'Stop watering');
    axios.post('http://localhost/DADN/v2/AUTOMATIC-WATERING-MHung/server/pages/Performance/Performance.php', formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
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

    const formData = new FormData();
    formData.append('date', new Date().toLocaleDateString());
    formData.append('time', new Date().toLocaleTimeString());
    formData.append('activity', 'Reset watering');
    axios.post('http://localhost/DADN/v2/AUTOMATIC-WATERING-MHung/server/pages/Performance/Performance.php', formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });


  };

  const continuewatering = () => {
    setStartTimer(true)

    fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/pump-switch/data', {
      method: "POST",
      headers: {
        "X-AIO-Key": Key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "value": 1 }),
    }).then(response => response.json())
      .catch(error => console.error('Error fetching data from Adafruit IO:', error));

    const formData = new FormData();
    formData.append('date', new Date().toLocaleDateString());
    formData.append('time', new Date().toLocaleTimeString());
    formData.append('activity', 'Continue watering');
    axios.post('http://localhost/DADN/v2/AUTOMATIC-WATERING-MHung/server/pages/Performance/Performance.php', formData)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });

    if (localStorage.getItem("mode") === "auto") {
      const max = localStorage.getItem('max');
      const min = localStorage.getItem('min');

      fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/auto/data', {
        method: "POST",
        headers: {
          "X-AIO-Key": Key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "value": `${min}:${max}` }),
      }).then(response => response.json())
        .catch(error => console.error('Error fetching data from Adafruit IO:', error));


    }
  }
  const mode = localStorage.getItem('mode');
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
          <button onClick={pauseWatering} className={cx("Turnoff", "button")}>Stop</button>
          <button onClick={continuewatering} className={cx("continue", "button")}>Continue</button>
          <button onClick={resetWatering} className={cx("button")}>Reset</button>
        </div>
      </div>

      <div className={cx("sensor")}>
        <div className="row">
          {events.map((event, index) => (
            <div key={index} className={cx("perform-background")}>
              <div className={cx("sensor1")}>Sensor {event}</div>
              <div className={cx("sensor2")}>
                <div className={cx("temp-sensor")}>
                  T: {singleTemp} <span className={cx("doC")}>o</span>C
                </div>
                <div className={cx("humidity-sensor")}>
                  H: {singleAir} %
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