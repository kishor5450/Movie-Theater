import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Checkout from "../Phone_pay/Checkout";
import "../Phone_pay/P.css";


const Success: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-green-500">Payment Successful!</h1>
    </div>
  );
};


const Failure: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">Payment Failed!</h1>
    </div>
  );
};


const RoutesP: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/payment-success" element={<Success />} />
        <Route path="/payment-failure" element={<Failure />} />
      </Routes>
    </Router>
  );
};

export default RoutesP;
