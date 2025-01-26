import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Features/ProductSlice";

const FeaturedProducts = () => {
  const products = useSelector((state) => state.products.allProducts); // Fetch products dynamically
  const loading = useSelector((state) => state.products.loading); // Check if loading
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
  }, [dispatch, products]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or some UI feedback
  }

  // Display the first three products dynamically without using slice
  const featuredProducts = [];
  for (let i = 0; i < 3; i++) {
    if (products[i]) {
      featuredProducts.push(products[i]);
    }
  }

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
      <style>
        {`
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
        `}
      </style>
    </section>
  );
};

export default FeaturedProducts;
