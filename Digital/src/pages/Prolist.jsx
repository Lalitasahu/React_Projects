
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      
      <Link key={e.id} to={`/Detail_pr/${e.id}`} >
        <h2 key={e.id}>{e.title}</h2>
      </Link>
      // <img
      //   src={e.image_list}
      //   alt={e.title}
      //   style={{ width: '200px', height: 'auto' }}
      // />
      
    )
  
  )}
    </>
  )
};

export default Product;
