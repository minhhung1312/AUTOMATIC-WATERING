import { createContext, useEffect, useState } from "react";
import axios from "axios"

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    // const user = {
    //   username: "abc",
    //   fname: "Khang"
    // };                    // uncomment & change this to pretend user is/is not logged in
    const [showHoverPanel, setShowHoverPanel] = useState(false);

    useEffect(() => {       // pretend this is getting the loggedin user from BE
        const fetchUser = async () => {
            try {
                const res = await axios.get("http://localhost:80/DADN/v2/AUTOMATIC-WATERING-MHung/server/testing")
                // save logged in user in localStorage for easy access
                // don't imitate!
                localStorage.setItem("user", JSON.stringify(res.data))
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchUser()
    }, [])    // this function is inside GlobalContext.jsx

    return (
        <GlobalContext.Provider value={{ showHoverPanel, setShowHoverPanel }}>{children}</GlobalContext.Provider>
    );
};

export default GlobalContext;
