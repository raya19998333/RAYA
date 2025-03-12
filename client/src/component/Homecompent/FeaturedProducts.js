// VisionCards.js
import React from "react";
import { FaBullseye, FaGlobe, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import "./VisionComponent.css";

const VisionCards = () => {
  return (
    <motion.div
      className="vision-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <br />
      <br />
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h3 className="section-title">Our Commitment to Natural Beauty</h3>
      </motion.div>
      <div className="cards-container">
        {[
          {
            icon: <FaBullseye />,
            title: "Our Goal",
            text: "Our goal is to provide high-quality lip products that blend beauty and care.",
          },
          {
            icon: <FaGlobe />,
            title: "Our Vision",
            text: "Our vision is to be the leading Omani brand in plant-based cosmetics.",
          },
          {
            icon: <FaRocket />,
            title: "Our Mission",
            text: "Our mission is to empower individuals to express their beauty with confidence.",
          },
        ].map((card, index) => (
          <motion.div
            key={index}
            className="card2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
          >
            <div className="card-icon">{card.icon}</div>
            <h4>{card.title}</h4>
            <p style={{ color: "#fff" }}>{card.text}</p>
          </motion.div>
        ))}
      </div>
      <br />
      <br />
    </motion.div>
  );
};

export default VisionCards;
