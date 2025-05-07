import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./pages/Home";
import Prolist from "./pages/Prolist";

// import NavBar from "./components/NavBar";



export default function App() {
  return (
     
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route index element={<Home />} />
        <Route path="/Prolist/:id" element={<Prolist />} />
      </Routes>
    </BrowserRouter>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
  
