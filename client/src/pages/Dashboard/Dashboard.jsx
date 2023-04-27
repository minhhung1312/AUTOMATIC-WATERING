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
  const initdata = {
    labels: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
    datasets: [
      {
        label: '',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: false,
        borderColor: 'rgb(246, 31, 31)',
        tension: 0.1
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: '#FDFEFE ', // Set the text color for legends
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#FDFEFE', // Set the color for X-axis ticks
        },
      },
      y: {
        ticks: {
          color: '#FDFEFE', // Set the color for X-axis ticks
        },
        beginAtZero: true,
      },
    },
  };
  
  const [singleTemp, setSingleTemp] = useState();
  const [singleAir, setSingleAir] = useState();
  const [singleSoil, setSingleSoil] = useState();

  const [dataTemp, setDataTemp] = useState(initdata);
  const [dataAir, setDataAir] = useState(initdata);
  const [dataSoil, setDataSoil] = useState(initdata);

  useEffect(() => {
    fetch(`https://io.adafruit.com/api/v2/ltduc147/feeds/humidity-sensor/data?limit=20`, {
      method: "GET",
      headers: {
        "X-AIO-Key": "aio_DAFv14EfYm6iHgBX3DCX0DKzRokq",
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        // Process the data and extract relevant data points
        const processedData = data.reverse().map(dataPoint => ({
          x: new Date(dataPoint.created_at).toLocaleTimeString(), // Assuming the data has a timestamp field
          y: dataPoint.value
        }));
        console.log(processedData);
        setDataAir({
          labels: processedData.map(dataPoint => dataPoint.x),
          datasets: [
            {
              label: 'Air humidity',
              data: processedData.map(dataPoint => dataPoint.y),
              fill: false,
              borderColor: 'rgb(0, 255, 209)',
              tension: 0.1
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching data from Adafruit IO:', error));
  }, [singleAir]);

  useEffect(() => {
    fetch(`https://io.adafruit.com/api/v2/ltduc147/feeds/temperature-sensor/data?limit=20`, {
      method: "GET",
      headers: {
        "X-AIO-Key": "aio_DAFv14EfYm6iHgBX3DCX0DKzRokq",
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        // Process the data and extract relevant data points
        const processedData = data.reverse().map(dataPoint => ({
          x: new Date(dataPoint.created_at).toLocaleTimeString(), // Assuming the data has a timestamp field
          y: dataPoint.value
        }));
        console.log(processedData);
        setDataTemp({
          labels: processedData.map(dataPoint => dataPoint.x),
          datasets: [
            {
              label: 'Temperature',
              data: processedData.map(dataPoint => dataPoint.y),
              fill: false,
              borderColor: 'rgb(246, 31, 31)',
              tension: 0.1
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching data from Adafruit IO:', error));
  }, [singleTemp]);

  useEffect(() => {
    fetch(`https://io.adafruit.com/api/v2/ltduc147/feeds/soil-moisture-sensor/data?limit=20`, {
      method: "GET",
      headers: {
        "X-AIO-Key": "aio_DAFv14EfYm6iHgBX3DCX0DKzRokq",
        "Content-Type": "application/json",
      },
    })
      .then(response => response.json())
      .then(data => {
        // Process the data and extract relevant data points
        const processedData = data.reverse().map(dataPoint => ({
          x: new Date(dataPoint.created_at).toLocaleTimeString(), // Assuming the data has a timestamp field
          y: dataPoint.value
        }));
        console.log(processedData);
        setDataSoil({
          labels: processedData.map(dataPoint => dataPoint.x),
          datasets: [
            {
              label: 'Soil moiture',
              data: processedData.map(dataPoint => dataPoint.y),
              fill: false,
              borderColor: 'rgb(255, 144, 41)',
              tension: 0.1
            }
          ]
        });
      })
      .catch(error => console.error('Error fetching data from Adafruit IO:', error));
  }, [singleSoil]);

  useEffect(() => {
    const getSingleTemp = () => {
      fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/temperature-sensor/data/last', {
        method: "GET",
        headers: {
          "X-AIO-Key": "aio_DAFv14EfYm6iHgBX3DCX0DKzRokq",
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
          "X-AIO-Key": "aio_DAFv14EfYm6iHgBX3DCX0DKzRokq",
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
    const getSingleSoil = () => {
      fetch('https://io.adafruit.com/api/v2/ltduc147/feeds/soil-moisture-sensor/data/last', {
        method: "GET",
        headers: {
          "X-AIO-Key": "aio_DAFv14EfYm6iHgBX3DCX0DKzRokq",
          "Content-Type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          // Process the data and extract relevant data points
          console.log(data);
          setSingleSoil(data.value);
        })
        .catch(error => console.error('Error fetching data from Adafruit IO:', error));
    }
    getSingleSoil();
    setInterval(getSingleSoil, 15000);

    return () => {
      clearInterval(getSingleSoil);
      console.log("Unmounted");
    }
  }, []);

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
              <Line data={dataTemp} options={options}/>
            </div>
          </div>
          <div className={cx("air")}>
            <div className={cx("head-title")}>
              <p className={cx("title")}>Air humidity</p>
              <p className={cx("text-update")}>Last update: Now </p>
            </div>
            <div className={cx("detail-chart")}>
              <Line data={dataAir} options={options}/>
            </div>
          </div>
          <div className={cx("soil")}>
            <div className={cx("head-title")}>
              <p className={cx("title")}>Soil moisture</p>
              <p className={cx("text-update")}>Last update: Now </p>
            </div>
            <div className={cx("detail-chart")}>
              <Line data={dataSoil} options={options}/>
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
              <p className={cx("text-humidity")}>{singleAir}%</p> {/*add DB*/}
            </div>
          </div>
          <div className={cx("temp")}>
            <p className={cx("title")}>
              Temperature
            </p>
            <div className={cx("detail-temp")}>
              <FontAwesomeIcon icon={faTemperature1} className={cx("icon-temp")} />
              <p className={cx("text-temp")}>
                {singleTemp}<span className={cx("doC")}>o</span>C
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
