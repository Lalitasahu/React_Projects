import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./pages/Home";
import Prolist from "./pages/Prolist";
import Detail_pr from "./pages/Detail_pr";
import Usercreate from "./pages/Usercreate";




export default function App() {
  return (
     
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route index element={<Home />} />
        <Route path="/Prolist/:id" element={<Prolist />} />
        <Route path="/Detail_pr/:id" element={<Detail_pr />} />
        <Route path="/Usercreate" element={<Usercreate />} />
      </Routes>
    </BrowserRouter>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
  
