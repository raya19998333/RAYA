import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { deleteCartItem, getCart, checkout } from "../Features/CartSlice";
import { useNavigate } from "react-router-dom";
import Logo from "../component/Photos/logo.png";
import {
  FaTrashAlt,
  FaShoppingBag,
  FaShoppingCart,
  FaBoxOpen,
  FaDollarSign,
} from "react-icons/fa";

const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [setMessage] = useState(null);
  const [setMessageType] = useState("");
  const [setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [setIsCheckoutCompleted] = useState(false);

  const getTotalPrice = () => {
    return cart.items
      .filter((item) => selectedItems.includes(item._id))
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteCartItem(itemToDelete))
      .then(() => {
        setMessage("Product has been successfully deleted from your cart.");
        setMessageType("success");
        setModalOpen(true);
      })
      .catch(() => {
        setMessage("Error during deletion. Please try again.");
        setMessageType("danger");
        setModalOpen(true);
      });
    setDeleteModalOpen(false);
  };

  const handleCheckout = () => {
    const productsToCheckout = cart.items.filter((item) =>
      selectedItems.includes(item._id)
    );
    dispatch(checkout(user._id, productsToCheckout))
      .then(() => {
        setMessage("Checkout successful! Your order has been placed.");
        setMessageType("success");
        setModalOpen(true);
        setIsCheckoutCompleted(true);
      })
      .catch(() => {
        setMessage("Error during checkout. Please try again.");
        setMessageType("danger");
        setModalOpen(true);
        setIsCheckoutCompleted(false);
      });
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(getCart(user._id));
    }
  }, [user]);

  if (!cart || cart.items.length === 0) {
    return (
      <Container className="cart-container text-center py-5">
        <h1 className="display-6">
          <FaShoppingCart className="me-2" />
          Your Shopping Cart
        </h1>
        <p className="text-muted">
          Your cart is empty. Please add items to the cart.
        </p>
      </Container>
    );
  }

  return (
    <Container
      className="cart-container py-5"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card
            className="shadow-lg rounded"
            style={{
              border: "none",
              borderRadius: "8px",
              padding: "20px",
              color: "#333", // إبقاء النص باللون الطبيعي (مثل ملخص الطلب)
            }}
          >
            <CardBody>
              <CardTitle
                tag="h3"
                className="text-center mb-4 text-uppercase"
                style={{ fontWeight: "bold" }}
              >
                YOUR BAG ({cart.items.length})
              </CardTitle>
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="d-flex align-items-center justify-content-between mb-4"
                  style={{
                    borderBottom: "1px solid #ddd", // تم تعديل اللون ليكون أكثر تباينًا مع السلة
                    paddingBottom: "15px",
                    paddingTop: "15px",
                  }}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ flex: 1 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: "15px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ddd",
                        backgroundColor: "#f7f7f7",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item._id)}
                        onChange={() => handleSelectItem(item._id)}
                        style={{
                          width: "20px",
                          height: "20px",
                          color: "#000", // تغيير لون اختيار المنتج إلى اللون الأسود
                          accentColor: "#000", // لجعل المربع نفسه يظهر باللون الأسود عند التحديد
                        }}
                      />
                    </div>
                    <img
                      src={item.image}
                      alt={item.desc}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </div>
                  <div className="d-flex flex-column flex-grow-1 ms-3">
                    <h6
                      style={{
                        fontWeight: "bold",
                        fontSize: "16px",
                        marginBottom: "5px",
                      }}
                    >
                      {item.desc}
                    </h6>
                    <div className="d-flex justify-content-between">
                      <CardText
                        className="text-muted mb-1"
                        style={{ fontSize: "14px" }}
                      >
                        Quantity: {item.quantity}
                      </CardText>
                    </div>
                    <div>
                      <CardText
                        className="text-muted mb-1"
                        style={{ fontSize: "14px" }}
                      >
                        Price: {item.price.toFixed(2)} OMR
                      </CardText>
                    </div>
                  </div>
                  <FaTrashAlt
                    style={{
                      fontSize: "18px",
                      color: "#e74c3c",
                      cursor: "pointer",
                      marginLeft: "10px",
                      transition: "color 0.3s ease, transform 0.2s ease",
                    }}
                    onClick={() => handleDelete(item._id)}
                    onMouseEnter={(e) => (e.target.style.color = "#c0392b")}
                    onMouseLeave={(e) => (e.target.style.color = "#e74c3c")}
                    onMouseDown={(e) =>
                      (e.target.style.transform = "scale(0.9)")
                    }
                    onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
                  />
                </div>
              ))}
            </CardBody>
          </Card>
        </Col>
        {/* Order Summary Card */}
        <Col xs={12} md={4}>
          <Card
            className="shadow-lg rounded"
            style={{ border: "none", backgroundColor: "#333", color: "white" }} // نفس خلفية السلة
          >
            <CardBody>
              <CardTitle
                tag="h4"
                className="text-center mb-4"
                style={{
                  fontWeight: "bold",
                  fontFamily: "Helvetica, Arial, sans-serif",
                }} // خط نحيل
              >
                Order Summary
              </CardTitle>
              <div className="d-flex justify-content-between mb-2">
                <CardText
                  style={{
                    fontSize: "14px",
                    color: "#bbb", // لون فاتح
                    fontFamily: "Helvetica, Arial, sans-serif", // نفس الخط
                  }}
                >
                  <FaBoxOpen className="me-2" />
                  Total Items:
                </CardText>
                <CardText
                  style={{
                    fontSize: "14px",
                    color: "#bbb", // لون فاتح
                    fontFamily: "Helvetica, Arial, sans-serif", // نفس الخط
                  }}
                >
                  {selectedItems.length}
                </CardText>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <CardText
                  style={{
                    fontSize: "14px",
                    color: "#bbb", // لون فاتح
                    fontFamily: "Helvetica, Arial, sans-serif", // نفس الخط
                  }}
                >
                  <FaDollarSign className="me-2" />
                  Total Price:
                </CardText>
                <CardText
                  style={{
                    fontSize: "14px",
                    color: "#bbb", // لون فاتح
                    fontFamily: "Helvetica, Arial, sans-serif", // نفس الخط
                  }}
                >
                  {getTotalPrice().toFixed(2)} OMR
                </CardText>
              </div>
              <Button
                style={{
                  backgroundColor: "#555", // تغيير اللون عند التمرير
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "16px",
                  padding: "12px 20px",
                  transition: "background-color 0.3s",
                }}
                size="lg"
                className="checkout-button shadow-lg w-100"
                onClick={handleCheckout}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#555")}
              >
                <FaShoppingBag className="me-2" /> Checkout
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Deletion Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        toggle={() => setDeleteModalOpen(false)}
        centered
      >
        <ModalHeader
          toggle={() => setDeleteModalOpen(false)}
          style={{
            backgroundColor: "#fff",
            color: "#333",
            border: "none",
            padding: "15px",
            fontSize: "18px",
          }}
        >
          <img
            src={Logo}
            alt="Your Logo"
            style={{ width: "40px", marginRight: "15px" }}
          />
          Confirm Deletion
        </ModalHeader>
        <ModalBody
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "18px",
            padding: "20px",
          }}
        >
          Are you sure you want to delete this product?
        </ModalBody>
        <ModalFooter style={{ justifyContent: "center", padding: "15px" }}>
          <Button
            color="secondary"
            onClick={() => setDeleteModalOpen(false)}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Cancel
          </Button>
          <Button
            color="danger"
            onClick={confirmDelete}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            <FaTrashAlt style={{ marginRight: "8px" }} />
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Cart;
