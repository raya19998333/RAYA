import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import images from "../Photos/image 1.png"; // Import Lip Gloss image
import liptint from "../Photos/liptint3.jpg"; // Import Lip Tint image
import { Button } from "reactstrap";

// Define products
const products = [
  {
    id: 1,
    name: "Lip Gloss",
    price: "4 OMR",
    description: "Glossy lips, happy vibes!",
    image: images, // Image for Lip Gloss
    link: "/products", // Route to Lip Gloss page
  },
  {
    id: 2,
    name: "Lip Tint",
    price: "2.5 OMR",
    description: "Lip Tint, happy vibes!",
    image: liptint, // Image for Lip Tint
    link: "/Liptint", // Route to Lip Tint page
  },
];

// ProductCard component for displaying each product
const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image} alt={product.name} className="product-image" />
    <h3 className="product-name">{product.name}</h3>
    <p className="product-price">{product.price}</p>
    <p className="product-description">{product.description}</p>

    {/* Use Link instead of Button for navigation to product page */}
    <Link to={product.link}>
      <Button color="dark" outline>
        Buy
      </Button>
    </Link>
  </div>
);

// ProductsSection component for displaying all products
const ProductsSection = () => (
  <section className="products-section">
    <h2 className="display-6">Our Products</h2>
    <div className="products-grid">
      {/* Map through the products and display each ProductCard */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </section>
);

export default ProductsSection;
