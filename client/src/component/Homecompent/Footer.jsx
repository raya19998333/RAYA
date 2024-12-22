import React from "react";
import { Container, Row, Col } from "reactstrap";
import {
  FaPhoneAlt,
  FaInstagram,
  FaSnapchat,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import logoImage from "../Photos/logo.png"; // Path to your logo image

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <Container>
        <Row>
          {/* Left Section: Logo and About Info */}
          <Col md={4} className="text-left">
            <img
              src={logoImage}
              alt="Raya Beauty Logo"
              className="footer-logo mb-3"
              style={{ width: "150px", filter: "invert(1)" }}
            />
            <p className="footer-text">
              Raya Beauty is an Omani brand specializing in high-quality lip
              products that combine beauty and care.
            </p>
          </Col>

          {/* Center Section: Contact Info (Align Left) */}
          <Col md={4} className="text-left">
            <h6 className="footer-heading">Contact Information</h6>
            <p className="footer-text">
              <FaMapMarkerAlt /> <strong>Store Location:</strong> Mirbat, Oman
            </p>
            <p className="footer-text">
              <FaPhoneAlt />{" "}
              <a href="tel:+96892424311" className="text-white">
                92424311
              </a>
            </p>
            <p className="footer-text">
              <FaEnvelope />{" "}
              <a href="mailto:rayabeauty" className="text-white">
                rayabeauty
              </a>
            </p>
          </Col>

          {/* Right Section: Social Media */}
          <Col md={4} className="text-left">
            <h6 className="footer-heading">Social Media</h6>
            <ul className="list-unstyled">
              <li className="footer-text">
                <FaInstagram />{" "}
                <a
                  href="https://www.instagram.com/raya.beautys"
                  target="_blank"
                  className="text-white"
                >
                  Instagram
                </a>
              </li>
              <li className="footer-text">
                <FaSnapchat />{" "}
                <a
                  href="https://www.snapchat.com/add/i.ra9a"
                  target="_blank"
                  className="text-white"
                >
                  Snapchat
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        {/* Divider and Copyright */}
        <hr className="my-4" style={{ borderColor: "#fff" }} />
        <Row>
          <Col className="text-center">
            <p className="footer-text mb-0">
              &copy; 2024 Raya Beauty. All Rights Reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
