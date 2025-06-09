import React from "react"
import {useState, useEffect } from "react"
import { Link,useParams } from "react-router-dom";
import Tranding from "../pages/Tranding";
import "./App.css";

const Home=()=>{
    const [Products, setProducts] = useState({})
    const [user, setUser] = useState(null);
    const { id } = useParams();

    const getProdcuts = async() =>{
        let url = "http://localhost:8000/api/Category/"
        const response = await fetch(url)
        setProducts(await response.json())
    }

    // useEffect(()=>{
    //     getProdcuts()
    // },[])

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        getProdcuts()
        }
      }, []);

    return (
    <>
        {/* <h1 onClick={()=> getProdcuts()}>Products </h1> */}
        <h1 className="products-heading" > All Category </h1>
        <Tranding />
        <div className="products-container">
        {Products?.results?.map((e,index)=>{
            return <>
            <div className="product-card" key={index}>
                <div className="product-info">
                    <Link to={`/Prolist/${e.id}`}>
                        <h4>{e.name}</h4>
                        <img src={e.image} alt={e.name} className="product-image" />
                    </Link>
                </div>
                {user?.is_vendor && (
                    <>
                    <div className="product-actions" >
                        <button><Link to={`/AddCat/edit/${e.id}`}>Edit </Link> </button>
                    </div>
                    </>
                )}
            </div>
            </>
        })}
        </div>
       
    </>
    )
}

export default Home 
