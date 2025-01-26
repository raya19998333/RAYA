import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faTags } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePost } from "../Features/PostSlice";
import { useNavigate } from "react-router-dom";
import Logo from "./Photos/logo.png"; // Adjust the path if needed
import DisplayPosts from "./Posts"; // Import the DisplayPosts component

const SharePosts = () => {
  const [postMsg, setPostMsg] = useState("");
  const [category, setCategory] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); // To hold the dynamic message for Modal

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);

  const handlePost = () => {
    if (!postMsg.trim()) {
      setModalMessage("Please provide your feedback about the product.");
      setModalOpen(true);
      return;
    }
    if (!category) {
      setModalMessage("Please select a product category.");
      setModalOpen(true);
      return;
    }

    const postData = {
      postMsg: postMsg,
      category: category,
      email: email,
      name: name,
    };

    dispatch(savePost(postData));
    setPostMsg("");
    setCategory("");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalMessage(""); // Reset the message
  };

  return (
    <Container>
      <Row>
        {/* Left column for Share Form */}
        <Col
          md={6}
          className="my-5"
          style={{
            backgroundColor: "#f8f8f8",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Row className="mb-4">
            <Col style={{ textAlign: "center" }}>
              <img
                src={Logo}
                alt="Logo"
                style={{
                  maxWidth: "150px",
                  margin: "0 auto",
                  display: "block",
                }}
              />
              <h3
                style={{ color: "#333", marginTop: "10px" }}
                className="display-6"
              >
                Share Your Feedback
              </h3>
              <p
                style={{
                  color: "#555",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
              >
                Let us know your thoughts about our products.
              </p>
            </Col>
          </Row>

          {showAlert && (
            <Alert color="success" style={{ textAlign: "center" }}>
              Thank you for your feedback! We appreciate your input.
            </Alert>
          )}

          <FormGroup>
            <Label
              for="share"
              style={{
                fontWeight: "bold",
                color: "#333",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faCommentDots}
                style={{ marginRight: "8px", color: "#555" }}
              />
              Your Feedback
            </Label>
            <Input
              id="share"
              name="share"
              placeholder="Write your feedback here..."
              type="textarea"
              value={postMsg}
              onChange={(e) => setPostMsg(e.target.value)}
              required
              style={{
                resize: "none",
                borderRadius: "8px",
                padding: "12px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </FormGroup>

          <FormGroup>
            <Label
              for="category"
              style={{
                fontWeight: "bold",
                color: "#333",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faTags}
                style={{ marginRight: "8px", color: "#555" }}
              />
              Select a Product
            </Label>
            <Input
              id="category"
              type="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{
                borderRadius: "8px",
                padding: "10px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <option value="">Choose a Product</option>
              <optgroup label="Lip Gloss">
                <option value="Deep">Deep</option>
                <option value="Crush">Crush</option>
                <option value="Luiscous Red">Luiscous Red</option>
                <option value="Nova">Nova</option>
                <option value="No Guidence">No Guidence</option>
                <option value="Red Brown">Red Brown</option>
                <option value="Sleeply Eyes">Sleeply Eyes</option>
                <option value="Cinnamon">Cinnamon</option>
                <option value="Summer Scent">Summer Scent</option>
              </optgroup>
              <optgroup label="Lip Tint">
                <option value="Cherry">Cherry</option>
                <option value="Watermelon">Watermelon</option>
                <option value="Watermelon">Strawberry</option>
              </optgroup>
            </Input>
          </FormGroup>

          <Button
            onClick={handlePost}
            color="dark"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#000", // خلفية باللون الأسود
              color: "#fff",
              borderRadius: "8px", // حواف مستديرة قليلاً
            }}
          >
            <FontAwesomeIcon icon={faThumbsUp} style={{ marginRight: "8px" }} />
            Share Your Opinion
          </Button>
        </Col>

        {/* Right column for DisplayPosts */}
        <Col md={6}>
          <DisplayPosts />
        </Col>
      </Row>

      {/* Modal for Feedback Alert */}
      <Modal isOpen={modalOpen} toggle={handleModalClose} centered>
        <ModalHeader
          toggle={handleModalClose}
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
            onClick={handleModalClose}
            style={{ padding: "10px 20px", fontSize: "16px" }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default SharePosts;
