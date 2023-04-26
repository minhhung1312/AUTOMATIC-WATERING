import React, { useState, useEffect } from 'react'

import classNames from "classnames/bind"
import styles from "./SetTime.module.scss"

const cx = classNames.bind(styles)

const SetTime = () => {

    const [hour, setHour] = useState("00");
    const [minute, setMinute] = useState("00");
    const [second, setSecond] = useState("00");

    const handleHourChange = (event) => {
        setHour(event.target.value);
    };

    const handleMinuteChange = (event) => {
        setMinute(event.target.value);
    };

    const handleSecondChange = (event) => {
        setSecond(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        window.location.href = '/Dashboard';
    };

    const createOptions = (start, end) => {
        const options = [];
        for (let i = start; i <= end; i++) {
            options.push(i < 10 ? "0" + i : i);
        }
        return options;
    };

    const hourOptions = createOptions(0, 6);
    const minuteOptions = createOptions(0, 59);
    const secondOptions = createOptions(0, 59);

    return (
        <div className={cx("container")}>
            <div className={cx("label")}>Set parameters</div>
            <div style={{ marginTop: "10px", fontSize: "40px" }} className="home">
                <form onSubmit={handleSubmit}>
                    <select value={hour} onChange={handleHourChange} name="gio">
                        {hourOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>{" "}
                    <span className={cx("time")}>h </span>
                    <select value={minute} onChange={handleMinuteChange} name="phut">
                        {minuteOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>{" "}
                    <span className={cx("time")}>m </span>
                    <select value={second} onChange={handleSecondChange} name="giay">
                        {secondOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>{" "}
                    <span className={cx("time")}>s </span>
                    <br />
                    <button type="submit" className={cx("button-save")}>Save</button>
                </form>
            </div>
        </div>
    )
}

export default SetTime