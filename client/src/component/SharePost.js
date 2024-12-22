import {
  Button,
  Col,
  Label,
  Container,
  Row,
  FormGroup,
  Input,
  Alert,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faTags } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePost, getPosts } from "../Features/PostSlice";
import { useNavigate } from "react-router-dom";
import Logo from "./Photos/logo.png"; // Adjust the path if needed
import DisplayPosts from "./Posts"; // Import the DisplayPosts component

const SharePosts = () => {
  const [postMsg, setPostMsg] = useState("");
  const [category, setCategory] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.users.user.email);
  const name = useSelector((state) => state.users.user.name);

  const handlePost = () => {
    if (!postMsg.trim()) {
      alert("Please provide your feedback about the product.");
      return;
    }
    if (!category) {
      alert("Please select a product category.");
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
              borderRadius: "50px",
              padding: "12px",
              backgroundColor: "#333",
              color: "#fff",
            }}
          >
            Submit Feedback
          </Button>
        </Col>

        {/* Right column for DisplayPosts */}
        <Col md={6}>
          <DisplayPosts />
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;
