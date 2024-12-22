import React, { useState } from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { logout } from "../Features/UserSlice";
import {
  FaHome,
  FaPaintBrush,
  FaTint,
  FaUser,
  FaInfoCircle,
  FaSignOutAlt,
  FaShoppingCart,
  FaUsersCog,
  FaCommentDots,
} from "react-icons/fa";
import Logo from "../component/Photos/logo.png";
import { Link, useLocation } from "react-router-dom";
import "../App.css"; // Custom CSS
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faComments } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const user = useSelector((state) => state.users.user);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const toggleOffcanvas = () => setOffcanvasOpen(!offcanvasOpen);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/login");
  };

  return (
    <div>
      <Navbar
        light
        className="header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          backgroundColor: "#fff",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <NavbarBrand href="/" className="me-auto">
          <img src={Logo} alt="Logo" className="logo-img" />
        </NavbarBrand>
        <NavbarToggler onClick={toggleOffcanvas} className="me-2" />
      </Navbar>

      <Offcanvas
        isOpen={offcanvasOpen}
        toggle={toggleOffcanvas}
        direction="start"
      >
        <OffcanvasHeader toggle={toggleOffcanvas}>
          <img src={Logo} alt="Logo" className="logo-img sidebar-logo" />
        </OffcanvasHeader>
        <OffcanvasBody>
          <Nav vertical className="nav">
            <NavItem
              className={`nav-item ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <Link to="/" className="nav-link">
                <FaHome className="me-2" /> Home
              </Link>
            </NavItem>
            {user?.userType === "admin" && (
              <NavItem
                className={`nav-item ${
                  location.pathname === "/Manage" ? "active" : ""
                }`}
              >
                <Link to="/Manage" className="nav-link">
                  <FaUsersCog className="me-2" /> Manage Users
                </Link>
              </NavItem>
            )}
            {user.userType === "admin" && (
              <NavItem
                className={`nav-item ${
                  location.pathname === "/posts" ? "active" : ""
                }`}
              >
                <Link to="/posts" className="nav-link">
                  <FaCommentDots className="me-2" /> Customer Reviews
                </Link>
              </NavItem>
            )}{" "}
            {user.userType === "admin" && (
              <NavItem
                className={`nav-item ${
                  location.pathname === "/allcarts" ? "active" : ""
                }`}
              >
                <Link to="/allcarts" className="nav-link">
                  <FaShoppingCart className="me-2" /> Carts
                </Link>
              </NavItem>
            )}
            {user.userType === "admin" && (
              <NavItem className="nav-item">
                <Link to="/managep" className="nav-link">
                  <FaPaintBrush className="me-2" />
                  Manage Products
                </Link>
              </NavItem>
            )}
            <NavItem
              className={`nav-item ${
                location.pathname === "/products" ? "active" : ""
              }`}
            >
              <Link to="/products" className="nav-link">
                <FaTint className="me-2" /> All Products
              </Link>
            </NavItem>
            <NavItem
              className={`nav-item ${
                location.pathname === "/profile" ? "active" : ""
              }`}
            >
              <Link to="/profile" className="nav-link">
                <FaUser className="me-2" /> Profile Settings
              </Link>
            </NavItem>
            <NavItem
              className={`nav-item ${
                location.pathname === "/cart" ? "active" : ""
              }`}
            >
              <Link to="/cart" className="nav-link">
                <FaShoppingCart className="me-2" /> My Shopping Cart
              </Link>
            </NavItem>
            <NavItem
              className={`nav-item ${
                location.pathname === "/SharePost" ? "active" : ""
              }`}
            >
              <Link to="/SharePost" className="nav-link">
                <FontAwesomeIcon icon={faComments} className="me-2" />
                Share Your Feedback
              </Link>
            </NavItem>
            <NavItem
              className={`nav-item ${
                location.pathname === "/About" ? "active" : ""
              }`}
            >
              <Link to="/About" className="nav-link">
                <FaInfoCircle className="me-2" /> About Us
              </Link>
            </NavItem>
            <NavItem className="nav-item">
              <Button
                onClick={handleLogout}
                color="dark"
                className="logout-button w-100 text-start"
                style={{
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "20px",
                }}
              >
                <FaSignOutAlt className="me-2" /> Log Out
              </Button>
            </NavItem>
          </Nav>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
}

export default Header;
