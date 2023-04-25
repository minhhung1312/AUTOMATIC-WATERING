import React, { useEffect, useState } from 'react'
import classNames from "classnames/bind"
import styles from "./Maintenance.module.scss"

const cx = classNames.bind(styles)

const Maintenance = () => {

  return (
    <div className={cx("container")}>
      Maintenance
    </div>
  )
}

export default Maintenance