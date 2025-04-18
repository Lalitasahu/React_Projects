import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Tutorials";
import Tutorials from "./pages/Tutorials";
import Exercises from "./pages/Exercises";
import Certified from "./pages/Certified";
import Services from "./pages/Services";
import Sign_up from "./pages/Sign_up";
import Login from "./pages/Login";
import HTML from "./tutorialpages/HTML";
import Javascript from "./tutorialpages/Javascript";
import C from "./tutorialpages/C";
import CSS from "./tutorialpages/CSS";
import Jquery from "./tutorialpages/Jquery";
import React from "./tutorialpages/React";
import SQL from "./tutorialpages/SQL";
import Python from "./tutorialpages/Python";



import './App.css';

export default function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tutorials" element={<Tutorials />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="certified" element={<Certified />} />
          <Route path="services" element={<Services />} />
          <Route path="sign_up" element={<Sign_up />} />
          <Route path="login" element={<Login />} />
          <Route path="html" element={<HTML />} />
          <Route path="javascript" element={<Javascript />} />
          <Route path="C" element={<C />} />
          <Route path="CSS" element={<CSS />} />
          <Route path="jquery" element={<Jquery />} />
          <Route path="SQL" element={<SQL />} />
          <Route path="React" element={<React />} />
          <Route path="python" element={<Python />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);