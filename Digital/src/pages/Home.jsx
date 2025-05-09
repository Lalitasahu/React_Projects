import React from "react"
import {useState, useEffect } from "react"
import { Link,useParams } from "react-router-dom";



const Home=()=>{
    const [Products, setProducts] = useState({})
    const { id } = useParams();

    const getProdcuts = async() =>{
        let url = "http://localhost:8000/api/Category/"
        const response = await fetch(url)
        setProducts(await response.json())
    }
    console.log(Products);

    useEffect(()=>{
        getProdcuts()
    },[])

    return (
    <>
        {/* <h1 onClick={()=> getProdcuts()}>Products </h1> */}
        <h1 >Products </h1>
        
        {Products?.results?.map((e,index)=>{
            return <>
                <div>
                    <Link to={`/Prolist/${e.id}`}>
                        <h4>{e.name}</h4>
                        <img
                        src={e.image}
                        alt={e.name}
                        style={{width:'200', height:'200px'}} />
                    </Link>
                    <button><Link to={`/AddCat/edit/${e.id}`}>Edit </Link> </button>
                </div>
            </>
        })}
       
    </>
    )
}

export default Home 
