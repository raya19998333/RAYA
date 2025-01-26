import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import logoImage from "../component/Photos/logo.png"; // Add logo image path here
import lipProduct1 from "../component/Photos/c2.jpg"; // Add lip product image 1
import lipProduct2 from "../component/Photos/IMG_8626.jpg"; // Add lip product image 2

const About = () => {
  return (
    <div>
      {/* About Us Section */}
      <Container>
        <Row className="my-5">
          <Col xs={12} md={6}>
            <h1>About Us</h1>
            <p>
              At Raya, we pride ourselves on being a premier Omani brand
              dedicated to enhancing beauty through high-quality lip products.
              Our mission is to empower individuals by providing a range of lip
              glosses and lip tints that not only offer stunning colors but also
              nourish and care for your lips.
            </p>
            <p>
              Founded with a passion for natural beauty and local craftsmanship,
              Raya embraces the richness of Omani culture while integrating
              modern beauty trends. Our products are thoughtfully formulated
              with vegan and cruelty-free ingredients, ensuring that every swipe
              of our lip gloss or tint is a guilt-free indulgence.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <img
              src={logoImage}
              alt="Raya Logo"
              style={{ width: "100%", height: "auto" }}
            />
          </Col>
        </Row>

        {/* Product Showcase Section */}
        <Row>
          <Col xs={12} md={6}>
            <Card>
              <CardImg
                top
                width="100%"
                src={lipProduct1}
                alt="Lip Product 1"
                className="medium-card-img" // Custom class to make the image medium-sized
                fluid
              />
              <CardBody>
                <CardTitle tag="h5">Premium Lip Gloss</CardTitle>
                <CardText>
                  Our lip gloss is designed to give you a smooth and glossy
                  finish, while nourishing your lips with cruelty-free
                  ingredients.
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card>
              <CardImg
                top
                width="100%"
                src={lipProduct2}
                alt="Lip Product 2"
                className="medium-card-img" // Custom class to make the image medium-sized
                fluid
              />
              <CardBody>
                <CardTitle tag="h5">Natural Lip Tint</CardTitle>
                <CardText>
                  Enhance your natural beauty with our lip tint that provides
                  long-lasting color while keeping your lips moisturized.
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
