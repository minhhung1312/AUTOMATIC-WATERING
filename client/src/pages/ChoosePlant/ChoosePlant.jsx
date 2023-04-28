import React, { useState, useEffect } from 'react'

import classNames from "classnames/bind"
import styles from "./ChoosePlant.module.scss"
import axios from "axios";

const cx = classNames.bind(styles)

const ChoosePlant = () => {

  const [Plantdb, setPlantdb] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost/DADN/v1/AUTOMATIC-WATERING-main/server/pages/ChoosePlant/ChoosePlant.php`)
      .then(response => {
        setPlantdb(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const [selectedValue, setSelectedValue] = useState('0');

  const [tmin, settmin] = useState(null);
  const [tmax, settmax] = useState(null);
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [soil, setsoil] = useState(null);
  const [plantselected, setplantselected] = useState(null);
  useEffect(() => {
    if (selectedValue !== '0') {
      const selectedPlant = Plantdb.find(item => item.plant === selectedValue);
      if (selectedPlant) {
        setplantselected(selectedPlant.plant);
        settmin(selectedPlant.tmin);
        settmax(selectedPlant.tmax);
        setMin(selectedPlant.min);
        setMax(selectedPlant.max);
        setsoil(selectedPlant.soil);
      }
    }
  }, [selectedValue, Plantdb]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedValue === '0') {
      alert('Vui lòng chọn loại cây trồng');
    } else {
      localStorage.setItem('plant', plantselected);
      localStorage.setItem('tmin', tmin);
      localStorage.setItem('tmax', tmax);
      localStorage.setItem('min', min);
      localStorage.setItem('max', max);
      localStorage.setItem('soil', soil);
      // console.log(min, max);
      window.location.href = '/SelectMode';
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("label")}>
        Choose a plant
      </div>
      <form className={cx("form")} onSubmit={handleSubmit}>
        <select className={cx("form-select")} value={selectedValue} onChange={handleSelectChange}>
          <option value="">Chọn loại cây</option>
          {Plantdb.map((item) => (
            <option value={item.plant}>{item.plant}</option>
          ))}
        </select>
        <button type="submit" className={cx("button-submit")}>Submit</button>
      </form>
    </div>
  )
}

export default ChoosePlant