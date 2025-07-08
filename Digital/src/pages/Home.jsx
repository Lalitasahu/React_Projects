// import React from "react"
// import {useState, useEffect } from "react"
// import { Link,useParams } from "react-router-dom";
// import Tranding from "../pages/Tranding";
// import "./App.css";

// const Home=()=>{
//     const [Products, setProducts] = useState({})
//     const [user, setUser] = useState(null);
//     const { id } = useParams();

//     const getProdcuts = async() =>{
//         let url = "http://localhost:8000/api/Category/"
//         const response = await fetch(url)
//         setProducts(await response.json())
//     }

//     // useEffect(()=>{
//     //     getProdcuts()
//     // },[])

//     useEffect(() => {
//         const userData = localStorage.getItem("user");
//         if (userData) {
//           setUser(JSON.parse(userData));
//         getProdcuts()
//         }
//       }, []);

//     return (
//     <>
//         {/* <h1 onClick={()=> getProdcuts()}>Products </h1> */}
//         <h1 className="products-heading" > All Category </h1>
//         <Tranding />
//         <div className="products-container">
//         {Products?.results?.map((e,index)=>{
//             return <>
//             <div className="product-card" key={index}>
//                 <div className="product-info">
//                     <Link to={`/Prolist/${e.id}`}>
//                         <h4>{e.name}</h4>
//                         <img src={e.image} alt={e.name} className="product-image" />
//                     </Link>
//                 </div>
//                 {user?.is_vendor && (
//                     <>
//                     <div className="product-actions" >
//                         <button><Link to={`/AddCat/edit/${e.id}`}>Edit </Link> </button>
//                     </div>
//                     </>
//                 )}
//             </div>
//             </>
//         })}
//         </div>
       
//     </>
//     )
// }

// export default Home 

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tranding from "../pages/Tranding";
import "./App.css"; // Update to your CSS file

const Home = () => {
  const [Products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [user, setUser] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  const getProducts = async () => {
    const response = await fetch("http://localhost:8000/api/Category/");
    const data = await response.json();
    setProducts(data.results || []);
    setFilteredProducts(data.results || []);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      getProducts();
    }
  }, []);

  // 🔍 Filter logic
  const applyFilters = () => {
    let filtered = [...Products];

    if (selectedCategory) {
      filtered = filtered.filter((item) => item.name === selectedCategory);
    }
    if (selectedRam) {
      filtered = filtered.filter((item) => item.ram === selectedRam);
    }
    if (selectedStorage) {
      filtered = filtered.filter((item) => item.storage === selectedStorage);
    }

    setFilteredProducts(filtered);
  };

  // 🔁 Re-run filter when any selection changes
  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedRam, selectedStorage]);

  // 🧹 Clear Filters
  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedRam("");
    setSelectedStorage("");
    setFilteredProducts(Products);
  };

  return (
    <>
      <h1 className="products-heading">All Categories</h1>
      <Tranding />

      <div className="flex">
        {/* 🔽 Filter Sidebar */}
        <aside className="w-1/4 p-4 border-r bg-gray-100 min-h-screen">
          {/* Category */}
          <div className="mb-4">
            <label className="font-semibold">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border p-2 mt-1"
            >
              <option value="">All Categories</option>
              {Products.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* RAM */}
          <div className="mb-4">
            <label className="font-semibold">RAM</label>
            <select
              value={selectedRam}
              onChange={(e) => setSelectedRam(e.target.value)}
              className="w-full border p-2 mt-1"
            >
              <option value="">All RAM Sizes</option>
              <option value="4 GB">4GB</option>
              <option value="8 GB">8GB</option>
              <option value="16 GB">16GB</option>
              <option value="32 GB">32GB</option>
            </select>
          </div>

          {/* Storage */}
          <div className="mb-4">
            <label className="font-semibold">Storage</label>
            <select
              value={selectedStorage}
              onChange={(e) => setSelectedStorage(e.target.value)}
              className="w-full border p-2 mt-1"
            >
              <option value="">All Storage</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
              <option value="2TB">2TB</option>
            </select>
          </div>

          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 bg-gray-300 rounded"
          >
            Clear Filters
          </button>
        </aside>

        {/* 📦 Product List */}
        <main className="w-3/4 p-4">
          <div className="products-container">
            {filteredProducts?.map((e, index) => (
              <div className="product-card" key={index}>
                <div className="product-info">
                  <Link to={`/Prolist/${e.id}`}>
                    <h4>{e.name}</h4>
                    <img
                      src={e.image}
                      alt={e.name}
                      className="product-image"
                    />
                  </Link>
                </div>
                {user?.is_vendor && (
                  <div className="product-actions">
                    <button>
                      <Link to={`/AddCat/edit/${e.id}`}>Edit</Link>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
