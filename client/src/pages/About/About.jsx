import React from 'react'
import classNames from "classnames/bind"
import styles from "./About.module.scss"
import FaceBook from "./../../assets/Facebook.png"
import YouTube from "./../../assets/Youtube.png"
import Google from "./../../assets/Google.png"

const cx = classNames.bind(styles)

const About = () => {

  return (
    <div className={cx("container")}>
      <div className={cx("about")}>
        <h4>Introduction and contact</h4>
        <h1>Best automation software</h1>
        Welcome to THD, where we bring you new experiences! With the software you can manage your garden watering simply and conveniently. Wish you have the most pleasant experience.
        <br /><br /><br />
        <a href="https://www.facebook.com"><img src={FaceBook} alt="FaceBook" /></a>

        <a href="https://www.youtube.com"><img src={YouTube} alt="YouTube" /></a>

        <a href="https://www.google.com"><img src={Google} alt="Google" /></a>
      </div>
    </div>
  )
}

export default About