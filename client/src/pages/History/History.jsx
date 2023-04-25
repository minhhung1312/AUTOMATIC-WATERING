import React from 'react';
import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./History.module.scss";

const cx = classNames.bind(styles)

const History = () => {

  return (
    <div className={cx("container")}>
      History
    </div>
  )
}

export default History