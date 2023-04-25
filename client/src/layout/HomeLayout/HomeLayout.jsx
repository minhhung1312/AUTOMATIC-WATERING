import React, { useContext } from "react";
import Navbar from "./../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./HomeLayout.module.scss";
import background from "./../../assets/Background.png";

const cx = classNames.bind(styles);

const HomeLayout = () => {
  const styles = {
    backgroundImage: `url(${background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  return (
    <div className={cx("container")} style={styles}> 
      <div className={cx("navbar")}>
        <Navbar />
      </div>
      <div className={cx("content")}>
        <Outlet />
      </div>
    </div>
  );
};

export default HomeLayout;
