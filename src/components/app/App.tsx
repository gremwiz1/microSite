import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InputScreen from "../input-screen/input-screen";
import PromoVideo from "../promo-video/promo-video";
import "./App.css";
import FinishScreen from "../finish-screen/finish-screen";

const App: React.FC = () => {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" element={<PromoVideo />} />
          <Route path="/input" element={<InputScreen />} />
          <Route path="/finish" element={<FinishScreen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
