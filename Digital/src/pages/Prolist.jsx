

// const Productlist = () => {
//     return <>
//       <h1>This is Product list page</h1>
//     </>
//   }
  
//   export default Productlist; 
  

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Product = () => {
  const [Productlist, setProductlist] = useState([])
  const { id } = useParams()
  const  getProduct= async()=>{
    let url=`http://localhost:8000/api/ProductByCategoryViewset/${id}/`
    const response=await fetch(url)
    setProductlist(await response.json())
  }
  console.log(Productlist);
  
  useEffect(()=>{
    getProduct()
  },[])
  return (
    <>
    {Productlist.map((e) => (
      <h2 key={e.id}>{e.title}</h2>
      
    )
  
  )}
    </>
  )
};

export default Product;


//   useEffect(() => { 
//     fetch(`http://localhost:8000/api/Category/${id}/`)
//       .then(res => res.json())
//       .then(data => setProduct(data));
//   }, [id]);

  //   useEffect(() => {
  //       fetch(`http://localhost:8000/api/products/?category_id=${id}`)
  //       .then((res) => res.json())
  //       .then((data) => setProduct(data.results || []));
  //   }, [id]);

  // if (!product) return <p>Loading...</p>;

  // return (
  //   <div>
  //     <h2>{product.name}</h2>
  //     <img src={product.image} alt={product.name} />
  //     {/* Add more fields as needed */}
  //   </div>
  // );

