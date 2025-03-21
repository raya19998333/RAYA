import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "./User";
import { logout, updateUserProfile } from "../Features/UserSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchemaValidation } from "../Validations/UserValidations";
import { FaUser, FaPhone, FaKey, FaFileUpload } from "react-icons/fa";
import Location from "./Location";

const Profile = () => {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState(user.name);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    const userData = {
      email: user.email,
      name: userName,
      phoneNumber: phoneNumber,
      password: pwd,
      profilePic: profilePic,
    };
    console.log(userData);
    dispatch(updateUserProfile(userData));
    setModalMessage("Profile Updated successfully!");
    setModalOpen(true); // Show the modal when the profile is updated
    navigate("/profile");
  };

  const handleFileChange = (event) => {
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user.email, navigate]);

  const handleLogout = async () => {
    dispatch(logout());
    await new Promise((resolve) => setTimeout(resolve, 100));
    navigate("/logout");
  };

  const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };

  return (
    <div className="profile" style={{ color: "#333" }}>
      <Container fluid className="pt-5">
        <Row>
          <h1 className="display-3" style={{ textAlign: "center" }}>
            My Profile
          </h1>
        </Row>
        <br></br>
        <br></br>
        <Row>
          <Col md={5}>
            <User userData={user} />
            <br></br>
            <Location />
          </Col>
          <Col md={7}>
            <Card
              className="shadow-lg border-light rounded p-4"
              style={{
                background: "linear-gradient(145deg, #ffffff, #e6e6e6)",
                borderRadius: "15px",
              }}
            >
              {/* Card content */}

              <CardBody>
                <h4
                  className="text-center  display-6"
                  style={{
                    color: "#333",
                    fontFamily: "sans-serif",
                    fontWeight: "600",
                  }}
                >
                  <FaUser style={{ marginRight: "10px" }} />
                  Update Your Profile
                </h4>

                <Form onSubmit={handleUpdate}>
                  <FormGroup>
                    <Label
                      for="profilePic"
                      className="d-flex align-items-center mb-2"
                      style={{
                        color: "#333",
                        fontWeight: "500",
                      }}
                    >
                      <FaFileUpload style={{ marginRight: "10px" }} />
                      Upload Photo
                    </Label>
                    <Input
                      type="file"
                      name="profilePic"
                      onChange={handleFileChange}
                      className="custom-file-input"
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                        padding: "10px",
                      }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label
                      for="name"
                      className="d-flex align-items-center mb-2"
                      style={{
                        color: "#333",
                        fontWeight: "500",
                      }}
                    >
                      <FaUser style={{ marginRight: "10px" }} />
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                        padding: "10px",
                      }}
                    />
                    <p className="error" style={{ color: "red" }}>
                      {errors.name?.message}
                    </p>
                  </FormGroup>

                  <FormGroup>
                    <Label
                      for="phoneNumber"
                      className="d-flex align-items-center mb-2"
                      style={{
                        color: "#333",
                        fontWeight: "500",
                      }}
                    >
                      <FaPhone style={{ marginRight: "10px" }} />
                      Phone Number
                    </Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                        padding: "10px",
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label
                      for="password"
                      className="d-flex align-items-center mb-2"
                      style={{
                        color: "#333",
                        fontWeight: "500",
                      }}
                    >
                      <FaKey style={{ marginRight: "10px" }} />
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      type="password"
                      value={pwd}
                      onChange={(e) => setPwd(e.target.value)}
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                        padding: "10px",
                      }}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label
                      for="confirmPassword"
                      className="d-flex align-items-center mb-2"
                      style={{
                        color: "#333",
                        fontWeight: "500",
                      }}
                    >
                      <FaKey style={{ marginRight: "10px" }} />
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{
                        borderRadius: "10px",
                        border: "1px solid #ddd",
                        padding: "10px",
                      }}
                    />
                  </FormGroup>

                  <FormGroup className="text-center">
                    <Button
                      color="dark"
                      type="submit"
                      className="w-100"
                      style={{
                        borderRadius: "10px",
                        fontWeight: "bold",
                        backgroundColor: "#333",
                        color: "white",
                        padding: "10px 0",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#444")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#333")
                      }
                    >
                      Update Profile
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for Success Message */}
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
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Profile;
