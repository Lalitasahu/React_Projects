import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MostTrending = () => {
  const [mostOrdered, setMostOrdered] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/MostOrderedProductsAPIView/")
      .then((res) => res.json())
      .then((data) => setMostOrdered(data));

    // fetch("http://localhost:8000/TrendingProductsAPIView/")
    //   .then((res) => res.json())
    //   .then((data) => setTrending(data));
  }, []);

  return (
    <div>
      <h2>🔥 Most Ordered Products</h2>
      <div className="product-list">
        {mostOrdered.map(product => (
          <Link to={`/ProDetail/${product.id}`} key={product.id}>
            <div className="product-card">
              <h4>{product.title}</h4>
              {/* <p>{product.description}</p> */}
            </div>
          </Link>
        ))}
      </div>

      <h2>📈 Trending This Week</h2>
      <div className="product-list">
        {trending.map(product => (
          <Link to={`/ProDetail/${product.id}`} key={product.id}>
            <div className="product-card">
              <h4>{product.title}</h4>
              {/* <p>{product.description}</p> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostTrending;
