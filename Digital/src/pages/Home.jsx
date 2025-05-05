import React from "react"
 import {useState, useEffect } from "react"

const Home=()=>{
    const [Products, setProducts] = useState({})

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
            <h4>{e.name}</h4>
            <img
             src={e.image}
             alt={e.name}
            style={{width:'200', height:'200px'}} />
            </>
        })}
       
    </>
    )
}

export default Home 
