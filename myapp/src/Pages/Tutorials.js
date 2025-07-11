import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';


const Tutorial = () => {

  const [products,setProducts] = useState({})

  const getProducts = async () =>{
    let url = "http://localhost:8000/api/Product/"
    const response = await fetch(url)
    setProducts(await response.json())

  }

  // useEffect(()=>{
  //   getProducts()
  // },[])

  console.log(products)

  return (
  <>
    <h1 onClick={()=>getProducts()}>Products</h1>

    {products?.results?.map((e,index)=>{
      return <>
        <div>
          <h2>{e.title}</h2>
          <h3>{e.price}</h3>
        </div>
  </>
    })}


    {/* <div className='tag-container' style={{display:'none'}}> */}
    <div className='tag-container'>
    <h1>All Tutorial here</h1>
    <button className='tag' ><Link  to = "/HTML">HTML</Link></button>
    <button className='tag' ><Link  to = "/Python">PYTHON</Link></button>
    <button className='tag' ><Link  to = "/React">REACT</Link></button>
    <button className='tag' ><Link  to = "/Javascript">JAVASCRIPT</Link></button>
    <button className='tag' ><Link  to = "/Jquery">JQUERY</Link></button>
    <button className='tag' ><Link  to = "/CSS">CSS</Link></button>
    <button className='tag' ><Link  to = "/C">C</Link></button>
    <button className='tag' ><Link  to = "/SQL">SQL</Link></button>
    <button className='tag' ><Link  to = "/HTML">HTML</Link></button>
    <button className='tag' ><Link  to = "/Python">PYTHON</Link></button>
    <button className='tag' ><Link  to = "/React">REACT</Link></button>
    <button className='tag' ><Link  to = "/Javascript">JAVASCRIPT</Link></button>
    <button className='tag' ><Link  to = "/Jquery">JQUERY</Link></button>
    <button className='tag' ><Link  to = "/CSS">CSS</Link></button>
    <button className='tag' ><Link  to = "/C">C</Link></button>
    <button className='tag' ><Link  to = "/SQL">SQL</Link></button>
    <button className='tag' ><Link  to = "/HTML">HTML</Link></button>
    <button className='tag' ><Link  to = "/Python">PYTHON</Link></button>
    <button className='tag' ><Link  to = "/React">REACT</Link></button>
    <button className='tag' ><Link  to = "/Javascript">JAVASCRIPT</Link></button>
    <button className='tag' ><Link  to = "/Jquery">JQUERY</Link></button>
    <button className='tag' ><Link  to = "/CSS">CSS</Link></button>
    <button className='tag' ><Link  to = "/C">C</Link></button>
    <button className='tag' ><Link  to = "/SQL">SQL</Link></button>
    <button className='tag' ><Link  to = "/HTML">HTML</Link></button>
    <button className='tag' ><Link  to = "/Python">PYTHON</Link></button>
    <button className='tag' ><Link  to = "/React">REACT</Link></button>
    <button className='tag' ><Link  to = "/Javascript">JAVASCRIPT</Link></button>
    <button className='tag' ><Link  to = "/Jquery">JQUERY</Link></button>
    <button className='tag' ><Link  to = "/CSS">CSS</Link></button>
    <button className='tag' ><Link  to = "/C">C</Link></button>
    <button className='tag' ><Link  to = "/SQL">SQL</Link></button>
    <button className='tag' ><Link  to = "/HTML">HTML</Link></button>
    <button className='tag' ><Link  to = "/Python">PYTHON</Link></button>
    <button className='tag' ><Link  to = "/React">REACT</Link></button>
    <button className='tag' ><Link  to = "/Javascript">JAVASCRIPT</Link></button>
    <button className='tag' ><Link  to = "/Jquery">JQUERY</Link></button>
    <button className='tag' ><Link  to = "/CSS">CSS</Link></button>
    <button className='tag' ><Link  to = "/C">C</Link></button>
    <button className='tag' ><Link  to = "/SQL">SQL</Link></button>
    <button className='tag' ><Link  to = "/HTML">HTML</Link></button>
    <button className='tag' ><Link  to = "/Python">PYTHON</Link></button>
    <button className='tag' ><Link  to = "/React">REACT</Link></button>
    <button className='tag' ><Link  to = "/Javascript">JAVASCRIPT</Link></button>
    <button className='tag' ><Link  to = "/Jquery">JQUERY</Link></button>
    <button className='tag' ><Link  to = "/CSS">CSS</Link></button>
    <button className='tag' ><Link  to = "/C">C</Link></button>
    <button className='tag' ><Link  to = "/SQL">SQL</Link></button>

      
      
      
      
    </div>
    </>
  );
}

export default Tutorial;