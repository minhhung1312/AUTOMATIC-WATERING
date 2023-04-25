import classNames from "classnames/bind";
import styles from "./Navbar.module.scss";
import { Link, useLocation } from "react-router-dom";
import Logo from "./../../assets/Logo.png";
const cx = classNames.bind(styles);

const Navbar = () => {
  const location = useLocation();
  const activeLink = location.pathname;
  const item = [
    {
      text: "Choose Plant",
      link: "/"
    },
    {
      text: "Select Mode",
      link: "/SelectMode"
    },
    {
      text: "Dashboard",
      link: "/Dashboard"
    },
    {
      text: "Performance",
      link: "/Performance"
    },
    {
      text: "Maintenance",
      link: "/Maintenance"
    },
    {
      text: "History",
      link: "/History"
    },
    {
      text: "About",
      link: "/About"
    },
  ];

  return (
    <div className={cx("container")}>
      <div className={cx("logo")}>
        <img src={Logo} width="182.6" height="90.2"/>
      </div>
      {item.map((item) => (
        <Link className={cx("item-container")} key={item.text} to={item.link}>
          <p className={cx("item-text", item.link === activeLink && "item-text-active")}>
            {item.text}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default Navbar