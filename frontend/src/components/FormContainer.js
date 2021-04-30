import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
// import Svgs from "./Svgs";

const FormContainer = ({ children, image }) => {
  return (
    <Container className="pt-4 mt-4">
      <Row className="justify-content-around login-card" noGutters>
        {image ? (
          <Col md={5}>
            <Image src={image} className="login-card-img" />
          </Col>
        ) : (
          ""
        )}
        <Col md={7} className="card-body">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
