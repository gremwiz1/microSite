import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InputScreen from "../input-screen/input-screen";
import PromoVideo from "../promo-video/promo-video";

const App: React.FC = () => {
  return (
      <Router>
        <div>
          <h1>Микросайт</h1>

          <Routes>
            <Route path="/" element={<PromoVideo />} />
            <Route path="/input" element={<InputScreen />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
