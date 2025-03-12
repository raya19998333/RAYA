import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalFooter,
  Input,
  ModalBody,
} from "reactstrap";
import Logo from "../component/Photos/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Features/CartSlice";
import { getProducts } from "../Features/ProductSlice";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import im from "./Photos/b1.jpg";
import c11 from "./Photos/c11.jpg";
const Products = () => {
  const products = useSelector((state) => state.products.allProducts);
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quantities, setQuantities] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleQuantityChange = (productId, value) => {
    if (value < 1) return;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: value,
    }));
  };

  const handleAddToCart = (productId) => {
    const quantity = quantities[productId] || 1;
    if (!quantity) {
      alert("Quantity is required!");
    } else {
      const cartData = {
        userId: user._id,
        productId: productId,
        quantity: quantity,
      };
      dispatch(addToCart(cartData));
      setModalMessage("Item added to the cart successfully!");
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/cart");
  };

  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
    } else {
      dispatch(getProducts());
    }
  }, [user]);

  return (
    <div className="products-container">
      <Row
        style={{
          backgroundColor: "#000",
          height: "80vh", // نصف ارتفاع الشاشة
          overflow: "hidden",
        }}
      >
        <img
          src={c11}
          className=""
          alt="Raya Beauty Collection"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            margin: "0",
            padding: "0",
          }}
        />
      </Row>

      <Row>
        <div className="beauty-collection-content mt-4">
          <h2
            className="collection-title"
            style={{
              color: "#333",
              fontWeight: "bold",
              fontSize: "36px",
              marginBottom: "20px",
            }}
          >
            RAYA BEAUTY COLLECTION
          </h2>
          <p
            className="collection-description"
            style={{ color: "#555", fontSize: "16px", margin: "20px 0" }}
          >
            Embrace your natural beauty with Raya Beauty!
          </p>
          <Button
            color="dark"
            style={{
              backgroundColor: "#000",
              border: "none",
              padding: "12px 24px",
              fontSize: "16px",

              marginTop: "10px",
            }}
          >
            BUY NOW
          </Button>
        </div>
      </Row>

      <Row style={{ padding: "0 20px", margin: "0 auto", maxWidth: "1200px" }}>
        {products.map((product) => (
          <Col
            xs="12"
            sm="6"
            md="4"
            key={product._id}
            className="mb-4"
            style={{ padding: "15px" }}
          >
            <Card
              style={{
                position: "relative",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {product.stocks === 0 && (
                <div
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    backgroundColor: "rgba(255, 0, 0, 0.8)",
                    color: "white",
                    textAlign: "center",
                    padding: "5px",
                    fontWeight: "bold",
                    zIndex: "1",
                  }}
                >
                  SOLD OUT
                </div>
              )}

              <CardImg
                top
                src={product.image || im}
                alt={product.desc}
                style={{
                  height: "200px",
                  width: "100%",
                  objectFit: "cover",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              />

              <CardBody
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: "20px",
                  height: "100%",
                }}
              >
                <div>
                  <CardTitle
                    tag="h5"
                    style={{
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "#000",
                      marginBottom: "0",
                    }}
                  >
                    {product.desc}
                  </CardTitle>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <CardText
                      style={{
                        fontSize: "22px",
                        fontWeight: "600",
                        color: "#333",
                        textAlign: "center",
                        fontFamily: "Arial, sans-serif",
                      }}
                    >
                      {product.price.toFixed(2)} OMR
                    </CardText>
                  </div>

                  <div
                    style={{
                      marginBottom: "10px",
                      fontSize: "14px",
                      color: "#555",
                    }}
                  >
                    <strong>In Stock:</strong> {product.stocks} units
                  </div>
                </div>

                {product.stocks > 0 && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "15px",
                    }}
                  >
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          product._id,
                          (quantities[product._id] || 1) - 1
                        )
                      }
                      disabled={(quantities[product._id] || 1) <= 1}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#ccc",
                        border: "none",
                        color: "#fff",
                      }}
                    >
                      -
                    </button>
                    <Input
                      type="number"
                      value={quantities[product._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          product._id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      min={1}
                      max={product.stocks}
                      style={{
                        width: "50px",
                        textAlign: "center",
                        margin: "0 10px",
                      }}
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          product._id,
                          (quantities[product._id] || 1) + 1
                        )
                      }
                      disabled={quantities[product._id] >= product.stocks}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#ccc",
                        border: "none",
                        color: "#fff",
                      }}
                    >
                      +
                    </button>
                  </div>
                )}

                <Button
                  onClick={() => handleAddToCart(product._id)}
                  style={{
                    fontSize: "16px",
                    backgroundColor: "transparent", // خلفية شفافة
                    borderColor: "#000", // لون الإطار أسود
                    borderWidth: "1px", // سمك الإطار
                    borderStyle: "solid", // تأكيد نمط الإطار
                    borderRadius: "5px",
                    boxShadow: "none",
                    color: "#000", // النص باللون الأسود
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    transition: "background-color 0.3s ease, color 0.3s ease", // تأثير انتقال سلس
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#000"; // عند مرور الفأرة يصبح الخلفية سوداء
                    e.target.style.color = "#fff"; // النص يصبح أبيض
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent"; // عند خروج الفأرة يعود الخلفية إلى الشفافية
                    e.target.style.color = "#000"; // النص يعود إلى اللون الأسود
                  }}
                  onMouseDown={(e) => {
                    e.target.style.backgroundColor = "#333"; // عند الضغط يصبح الخلفية أكثر قتامة
                  }}
                  onMouseUp={(e) => {
                    e.target.style.backgroundColor = "#000"; // عند رفع الضغط، يعود الخلفية إلى الأسود
                  }}
                  disabled={product.stocks === 0}
                >
                  <FaShoppingCart style={{ marginRight: "5px" }} />
                  Add to Cart
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} centered>
        <ModalHeader
          toggle={() => setModalOpen(false)}
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
            src={Logo} // تأكد من استبدال "Logo" بالرابط الصحيح للصورة
            alt="Your Logo"
            style={{ width: "40px", marginRight: "15px" }}
          />
          Success
        </ModalHeader>

        <ModalBody
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "18px",
            padding: "20px",
          }}
        >
          {modalMessage}
        </ModalBody>

        <ModalFooter style={{ justifyContent: "center", padding: "15px" }}>
          <Button
            color="secondary"
            onClick={() => setModalOpen(false)}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Cancel
          </Button>
          <Button
            color="success"
            onClick={handleModalClose}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            <i className="fas fa-cart-plus" style={{ marginRight: "8px" }}></i>
            Go to Cart
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Products;
