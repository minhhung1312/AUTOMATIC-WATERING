import React, { useState, useEffect } from 'react'

import classNames from "classnames/bind"
import styles from "./ChoosePlant.module.scss"

const cx = classNames.bind(styles)

const ChoosePlant = () => {

  const [selectedValue, setSelectedValue] = useState('0');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedValue === '0') {
      alert('Vui lòng chọn loại cây trồng');
    } else {
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
          <option value="1">Plant</option>
          <option value="2">Mít</option>
          <option value="3">Lúa</option>
          <option value="4">Ngô</option>
          <option value="5">Bưởi</option>
          <option value="6">Cam</option>
          <option value="7">Xoài</option>
          <option value="8">Rau màu</option>
        </select>
        <button type="submit" className={cx("button-submit")}>Submit</button>
      </form>
    </div>

  )
}

export default ChoosePlant