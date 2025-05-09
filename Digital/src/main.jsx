import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home  from "./pages/Home";
import Prolist from "./pages/Prolist";
import Detail_pr from "./pages/Detail_pr";
import Usercreate from "./pages/Usercreate";
import Login from "./pages/Login";




export default function App() {
  return (
     
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route index element={<Home />} />
        <Route path="/Prolist/:id" element={<Prolist />} />
        <Route path="/Detail_pr/:id" element={<Detail_pr />} />
        <Route path="/Usercreate" element={<Usercreate />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
  
