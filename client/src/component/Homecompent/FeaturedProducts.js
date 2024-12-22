import React from "react";
import deep from "../Photos/Deep.jpg";
import strike from "../Photos/strike.jpg";
import sleepyeyes from "../Photos/Sleeply_eyes.jpg";
const FeaturedProducts = () => {
  return (
    <section className="featured-products">
      <h2 className="display-5">Featured Products</h2>
      <br></br>
      <br></br>
      <div className="product-cards">
        {/* Product card components here */}
        <div className="product-card">
          <img src={deep} alt="Product 1" />
          <h4>Deep</h4>
          <p>Price: 4 OMR</p>
        </div>
        <div className="product-card">
          <img src={strike} alt="Product 2" />
          <h4>Strike</h4>
          <p>Price: 4 OMR</p>
        </div>
        <div className="product-card">
          <img src={sleepyeyes} alt="Product 2" />
          <h4>Sleeply Eyes</h4>
          <p>Price: 4 OMR</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
