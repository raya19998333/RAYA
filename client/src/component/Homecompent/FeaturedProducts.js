// FeaturedProducts.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Features/ProductSlice";

const FeaturedProducts = () => {
  const products = useSelector((state) => state.products.allProducts); // Fetch products dynamically
  const dispatch = useDispatch();
  // Display the first three products dynamically
  const featuredProducts = products.slice(0, 3);
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <section className="featured-products">
      <h2 className="display-6 text-center">New Products</h2>
      <br />
      <div className="product-cards">
        {featuredProducts.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.image} alt={product.desc} />
            <h4>{product.desc}</h4>
            <p>Price: {Math.round(product.price, 2)} OMR</p>
          </div>
        ))}
      </div>
      <style jsx>{`
        .featured-products {
          padding: 40px;
          background-color: #e0e0e0;
          color: #999;
        }

        .product-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          justify-items: center;
        }

        .product-card {
          background: #fff;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
          text-align: center;
          padding: 20px;
          width: 100%;
          max-width: 250px;
        }

        .product-card img {
          width: 100%;
          height: auto;
          max-height: 150px;
          object-fit: cover;
          border-radius: 5px;
          margin-bottom: 10px;
        }

        .product-card h4 {
          font-size: 18px;
          color: #333;
          margin: 10px 0;
        }

        .product-card p {
          font-size: 16px;
          color: #555;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProducts;
