import { Navigate, Route, Routes } from "react-router-dom"
import HomeLayout from "./layout/HomeLayout/HomeLayout"
import ChoosePlant from './pages/ChoosePlant/ChoosePlant';
import SelectMode from "./pages/SelectMode/SelectMode";
import Dashboard from './pages/Dashboard/Dashboard';
import Performance from './pages/Performance/Performance';
import Maintenance from './pages/Maintenance/Maintenance';
import History from "./pages/History/History";
import About from './pages/About/About';
import Error from './pages/Error/Error';
import { useState } from "react";


function App() {

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<ChoosePlant />} />
        <Route path="SelectMode" element={<SelectMode />} />
        <Route path="Dashboard" element={<Dashboard />} />
        <Route path="Performance" element={<Performance />} />
        <Route path="Maintenance" element={<Maintenance />} />
        <Route path="History" element={<History />} />
        <Route path="About" element={<About />} />
        <Route path="*" element={<Error />} />
      </Route>

      

    </Routes>
  )
}

export default App
