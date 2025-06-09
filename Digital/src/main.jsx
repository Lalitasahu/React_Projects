import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home  from "./pages/Home";
import Prolist from "./pages/Prolist";
import ProDetail from "./pages/ProDetail";
import Usercreate from "./pages/Usercreate";
import Login from "./pages/Login";
import AddCat from "./pages/AddCat";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import Order_Product from "./pages/Order_Product";
import AddToCart from "./pages/AddToCart";
import OrderAllItem from "./pages/OrderAllItem";
import Tranding from './pages/Tranding';
import OrderHistory from "./pages/OrderHistory";
import OrderDetail from "./pages/OrderDetail";



export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route index element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile/>}/>
        <Route path="/Usercreate" element={<Usercreate />} />
        <Route path="/Usercreate/edit:id/" element={<Usercreate />} />
        <Route path="/Prolist/:id" element={<Prolist />} />
        <Route path="/ProDetail/:id" element={<ProDetail />} />
        <Route path="/AddCat/add" element={<AddCat />} />
        <Route path="/AddCat/edit/:id" element={<AddCat />} />
        <Route path="/AddProduct/" element={<AddProduct />} />
        <Route path="/AddProduct/Edit/:id/" element={<AddProduct />} />
        <Route path="/Order_Product/:id" element={<Order_Product />} />
        <Route path="/AddToCart" element={<AddToCart />} />
        <Route path="/OrderAllItem" element={<OrderAllItem />} />
        <Route path="/Tranding" element={<Tranding />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/OrderDetail/:id" element={<OrderDetail />} />
      </Routes>
    </BrowserRouter>

  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
  
