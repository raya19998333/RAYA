import Console from "./Homecompent/Console";
import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Row,
} from "reactstrap";
import ProductsSection from "./Homecompent/Productcard";
import FeaturedProducts from "./Homecompent/FeaturedProducts";
import CustomerReviews from "./Homecompent/CustomerReviews";
import NewArrivals from "./Homecompent/NewArrivals";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Home = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);
  return (
    <div style={{ padding: "0", margin: "0" }}>
      <Console />
      <br></br>
      <br></br>

      <ProductsSection />

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <FeaturedProducts />

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <CustomerReviews />

      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <NewArrivals />
    </div>
  );
};
export default Home;
