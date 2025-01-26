import React, { useEffect, useState, useCallback } from "react";
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
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { getCart } from "../Features/CartSlice";
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
  const user = useSelector((state) => state.users.user) || {};
  const cart = useSelector((state) => state.cart);
  const [offcanvasOpen, setOffcanvasOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleOffcanvas = useCallback(
    () => setOffcanvasOpen((prev) => !prev),
    []
  );
  const closeOffcanvas = useCallback(() => setOffcanvasOpen(false), []);
  const toggleLogoutModal = useCallback(
    () => setLogoutModal((prev) => !prev),
    []
  );

  const handleLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/login");
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    } else {
      dispatch(getCart(user._id));
    }
  }, [user, navigate, dispatch]);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div style={{ padding: "0", margin: "0" }}>
      {/* Navbar Component */}
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
        <NavbarBrand tag={Link} to="/" className="me-auto">
          <img src={Logo} alt="Logo" className="logo-img" />
        </NavbarBrand>
        <NavbarToggler onClick={toggleOffcanvas} className="me-2" />
      </Navbar>

      {/* Offcanvas Menu */}
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
              className={`nav-item ${isActive("/")}`}
              onClick={closeOffcanvas}
            >
              <Link to="/" className="nav-link">
                <FaHome className="me-2" /> Home
              </Link>
            </NavItem>

            {/* Admin-specific links */}
            {user?.userType === "admin" && (
              <>
                <NavItem
                  className={`nav-item ${isActive("/Manage")}`}
                  onClick={closeOffcanvas}
                >
                  <Link to="/Manage" className="nav-link">
                    <FaUsersCog className="me-2" /> Manage Users
                  </Link>
                </NavItem>
                <NavItem
                  className={`nav-item ${isActive("/posts")}`}
                  onClick={closeOffcanvas}
                >
                  <Link to="/posts" className="nav-link">
                    <FaCommentDots className="me-2" /> Customer Reviews
                  </Link>
                </NavItem>
                <NavItem
                  className={`nav-item ${isActive("/cart")}`}
                  onClick={closeOffcanvas}
                >
                  <Link to="/cart" className="nav-link">
                    <FaShoppingCart className="me-2" /> My Shopping Cart (
                    {cart.count})
                  </Link>
                </NavItem>

                <NavItem
                  className={`nav-item ${isActive("/managep")}`}
                  onClick={closeOffcanvas}
                >
                  <Link to="/managep" className="nav-link">
                    <FaPaintBrush className="me-2" /> Manage Products
                  </Link>
                </NavItem>
              </>
            )}

            {/* Common links */}
            <NavItem
              className={`nav-item ${isActive("/products")}`}
              onClick={closeOffcanvas}
            >
              <Link to="/products" className="nav-link">
                <FaTint className="me-2" /> All Products
              </Link>
            </NavItem>
            <NavItem
              className={`nav-item ${isActive("/profile")}`}
              onClick={closeOffcanvas}
            >
              <Link to="/profile" className="nav-link">
                <FaUser className="me-2" /> Profile Settings
              </Link>
            </NavItem>
            <NavItem
              className={`nav-item ${isActive("/cart")}`}
              onClick={closeOffcanvas}
            >
              <Link to="/cart" className="nav-link">
                <FaShoppingCart className="me-2" /> My Shopping Cart
              </Link>
            </NavItem>
            <NavItem
              className={`nav-item ${isActive("/SharePost")}`}
              onClick={closeOffcanvas}
            >
              <Link to="/SharePost" className="nav-link">
                <FontAwesomeIcon icon={faComments} className="me-2" /> Share
                Your Feedback
              </Link>
            </NavItem>
            <NavItem
              className={`nav-item ${isActive("/About")}`}
              onClick={closeOffcanvas}
            >
              <Link to="/About" className="nav-link">
                <FaInfoCircle className="me-2" /> About Us
              </Link>
            </NavItem>
            <NavItem className="nav-item">
              <div
                onClick={toggleLogoutModal}
                className="logout-button w-100 text-start d-flex align-items-center"
                style={{
                  borderRadius: "5px",
                  padding: "10px",
                  marginTop: "20px",
                  cursor: "pointer",
                  color: "#fff",
                  backgroundColor: "#000",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                }}
              >
                <FaSignOutAlt className="me-2" /> Log Out
              </div>
            </NavItem>
          </Nav>
        </OffcanvasBody>
      </Offcanvas>

      {/* Logout Confirmation Modal */}
      <Modal isOpen={logoutModal} toggle={toggleLogoutModal} centered>
        <ModalHeader
          toggle={toggleLogoutModal}
          style={{
            backgroundColor: "#fff",
            color: "#333",
            border: "none",
            display: "flex",
            alignItems: "center",
            padding: "15px",
            fontSize: "18px",
          }}
        >
          <img
            src={Logo}
            alt="Your Logo"
            style={{ width: "40px", marginRight: "15px" }}
          />
          Confirm Logout
        </ModalHeader>
        <ModalBody
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "18px",
            padding: "20px",
          }}
        >
          Are you sure you want to log out?
        </ModalBody>
        <ModalFooter style={{ justifyContent: "center", padding: "15px" }}>
          <Button
            color="secondary"
            onClick={toggleLogoutModal}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Cancel
          </Button>
          <Button
            color="dark"
            onClick={handleLogout}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Log Out
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Header;
