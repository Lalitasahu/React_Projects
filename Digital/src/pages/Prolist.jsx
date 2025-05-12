import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
  const [Productlist, setProductlist] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    let url = `http://localhost:8000/api/ProductByCategoryViewset/${id}/`;
    const response = await fetch(url);
    const data = await response.json();
    setProductlist(data);
  };

  useEffect(() => {
    getProduct()
    // if (id) {
    //   getProduct();
    // }
  }, [id]); 

  return (
    <>
      {Productlist.map((e) => (
        <div key={e.id}>
          <Link to={`/ProDetail/${e.id}`}>
            <h2>{e.title}</h2>
          </Link>
          
          <button><Link to={`/Order_Product/${e.id}`}>Order item  </Link> </button>
        </div>
      ))}
    </>
  );
};

export default Product;
