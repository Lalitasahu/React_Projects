import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Productlist.css"


const Product = () => {
  const [Productlist, setProductlist] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getProduct = async () => {
    const response = await fetch(`http://localhost:8000/api/ProductByCategoryViewset/${id}/`);
    const data = await response.json();
    setProductlist(data);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  
  return (
    <div className="product-page">
      <div className="product-header">
        <h1>Products in This Category</h1>
      </div>
      <div className="product-list">
        {Productlist.length > 0 ? (
          Productlist.map((e) => (  
            
            <div key={e.id} className="product-card">
              <Link to={`/ProDetail/${e.id}`} className="product-link">
                
               <div>
                {e.image_list && e.image_list.length > 0 && (
                  <img 
                    src={e.image_list.replace('[','').replace(']','').replace(/\'/g,'').split(',')[0]} 
                    alt={e.title} 
                    style={{ 
                      width: '200px', 
                      height: '300px', 
                      // objectFit: 'cover', 
                      borderRadius: '4px' 
                    }}
                    
                  />
                )}
                </div>
                <br />
                <h2>{e.title}</h2>
                <h2>Price: {e.price}</h2>
                <h2>Discount Price : {e.dis_price}</h2>



              </Link>
              
              {/* <Link to={`/Order_Product/${e.id}`}>
                <button className="order-button">Order Item</button>
              </Link> */}
            </div>
          ))
        ) : (
          <p className="no-products">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default Product;




