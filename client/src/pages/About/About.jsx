import React from 'react'
import classNames from "classnames/bind"
import styles from "./About.module.scss"

const cx = classNames.bind(styles)

const About = () => {

  return (
    <div className={cx("container")}>
      About
    </div>
  )
}

export default About