import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { registerUser } from "../Features/UserSlice";
import logo from "../component/Photos/logo.png";
import c3 from "../component/Photos/c2.jpg";

import { userSchemaValidation } from "../Validations/UserValidations";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { addUser, deleteUser, updateUser } from "../Features/UserSlice";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const userList = useSelector((state) => state.users.value);
  //Create the state variables
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState();
  const [birthday, setbirthday] = useState();
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  // State for Modal
  const [modal, setModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // To store alert message
  const [alertType, setAlertType] = useState(""); // To store alert type (success or error)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  // Handle form submission
  const onSubmit = (data) => {
    const { name, email, phoneNumber, birthday, password, confirmPassword } =
      data;

    // Simulate checking if email already exists (you may check in redux store or server)
    const isEmailExist = false; // Replace this with actual check from your state or backend
    if (isEmailExist) {
      setAlertMessage("Email already exists. Please use a different email.");
      setAlertType("danger");
      setModal(true); // Open the modal
      return;
    }
    // User data
    const userData = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      birthday: birthday,
      password: password,
    };

    try {
      dispatch(registerUser(userData)); // Dispatch action to add user
      // Set success message
      setAlertMessage("Registration successful! Please log in.");
      setAlertType("success");

      // Open modal
      setModal(true);

      // Log success
      console.log("Success! User registered successfully.");

      // Redirect to login page after success
      setTimeout(() => {
        setModal(false); // Close modal after 3 seconds
        navigate("/");
      }, 3000);
    } catch (error) {
      // Set error message
      setAlertMessage(
        "There was an error processing your registration. Please try again."
      );
      setAlertType("danger");
      setModal(true); // Open the modal

      // Log error
      console.error("Error:", error);
    }
  }; // Toggle modal
  const toggle = () => setModal(!modal);

  return (
    <Container className="register-container">
      <Row>
        <Col md={6} className="register-form">
          <div className="register-r">
            <img src={logo} className="logo_register"></img>
          </div>
          <h2 className="display-6 logtitle">Register</h2>
          <p className="register-description">
            Join us and enjoy exclusive benefits and features!
          </p>
          {/* Modal for success or error messages */}
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
              {alertType === "success" ? "Success!" : "Error"}
            </ModalHeader>
            <ModalBody>{alertMessage}</ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={toggle}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label for="name">Enter Your Name</Label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                {...register("name", {
                  onChange: (e) => setname(e.target.value),
                })}
              />
              <p className="error">{errors.name?.message}</p>
            </FormGroup>

            <FormGroup>
              <Label for="email">Enter Your Email</Label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                {...register("email", {
                  onChange: (e) => setemail(e.target.value),
                })}
              />
              <p className="error">{errors.email?.message}</p>
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Enter Your Phone Number</Label>
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                id="phoneNumber"
                {...register("phoneNumber", {
                  onChange: (e) => setphoneNumber(e.target.value),
                })}
              />
              <p className="error">{errors.phoneNumber?.message}</p>
            </FormGroup>

            <FormGroup>
              <Label for="birthday">Enter Your Birthday</Label>
              <input
                type="date"
                className="form-control"
                name="birthday"
                id="birthday"
                {...register("birthday", {
                  onChange: (e) => setbirthday(e.target.value),
                })}
              />{" "}
              <p className="error">{errors.birthday?.message}</p>
            </FormGroup>
            <FormGroup>
              <Label for="password">Enter Your Password</Label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                {...register("password", {
                  onChange: (e) => setpassword(e.target.value),
                })}
              />
              <p className="error">{errors.password?.message}</p>
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Enter Your Confirm Password</Label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                id="confirmPassword"
                {...register("confirmPassword", {
                  onChange: (e) => setconfirmPassword(e.target.value),
                })}
              />
              <p className="error">{errors.confirmPassword?.message}</p>
            </FormGroup>
            <Button color="dark" className="register-btn">
              Create Account
            </Button>
          </form>
        </Col>

        <Col md={6} className="register-image">
          <img
            src={c3}
            alt="Product Image"
            className="register-image__content"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
