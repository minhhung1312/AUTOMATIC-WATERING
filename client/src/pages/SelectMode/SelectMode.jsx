import React, { useState, useEffect } from 'react'
import classNames from "classnames/bind"
import styles from "./SelectMode.module.scss"

const cx = classNames.bind(styles)

const SelectMode = () => {

  useEffect(() => {
    const autoButton = document.getElementById('auto');
    const semiButton = document.getElementById('semi');

    autoButton.addEventListener('click', () => {
      window.location.href = '/Dashboard';
    });

    semiButton.addEventListener('click', () => {
      window.location.href = '/SetTime';
    });
  }, []);

  return (
    <div className={cx("container")}>
      <div className={cx("label")}>Select irrigation mode</div>
      <div id="auto" className={cx("block-select")}>Auto</div>
      <br />
      <div id="semi" className={cx("block-select")}>Semi-auto</div>
    </div>
  )
}

export default SelectMode