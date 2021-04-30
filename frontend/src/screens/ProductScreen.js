import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Accordion,
  Table,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const { error, product, loading } = useSelector(
    (state) => state.productDetails
  );

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (successProductReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch, successProductReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn my-3 button-light-custom" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={product.name} />
          <Row>
            <Col lg={6}>
              <Image
                src={product.image}
                alt={product.name}
                className="product-detail-image mx-auto"
              />
            </Col>
            <Col lg={6}>
              <ListGroup variant="flush">
                <ListGroup.Item className="list-group-item-custom pt-4">
                  <h3 className="product-detail-title">{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-custom product-detail-stars">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-custom product-detail-price">
                  ${product.price}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-custom product-detail-description">
                  {product.description}
                </ListGroup.Item>
                <ListGroup.Item className="list-group-item-custom product-detail-buttons pb-4">
                  <div className="product-detail-buttons-status">
                    Status :{" "}
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </div>

                  <Button
                    onClick={addToCartHandler}
                    className="btn product-details-buttons-button"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    <i className="fas fa-shopping-cart"></i> Add To Cart
                  </Button>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item className="list-group-item-custom">
                    <Form.Label className="product-qty-heading mr-2">
                      Quantity :
                    </Form.Label>
                    <Form.Control
                      as="select"
                      custom
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </ListGroup.Item>
                )}
              </ListGroup>

              <Accordion className="mt-5">
                <div className="accordian-custom">
                  <Accordion.Toggle
                    as={Card.Header}
                    className="accordion-head-custom"
                    eventKey="1"
                  >
                    Description <i class="fas fa-caret-down"></i>
                  </Accordion.Toggle>
                  <Accordion.Collapse
                    eventKey="1"
                    className="accordion-body-custom"
                  >
                    <Card.Body>
                      <div>{product.description}</div>
                      <div className="mt-3 font-weight-bold">
                        Price: ${product.price}
                      </div>
                    </Card.Body>
                  </Accordion.Collapse>
                </div>
                <div className="accordian-custom">
                  <Accordion.Toggle
                    as={Card.Header}
                    className="accordion-head-custom"
                    eventKey="0"
                  >
                    Information <i class="fas fa-caret-down"></i>
                  </Accordion.Toggle>
                  <Accordion.Collapse
                    eventKey="0"
                    className="accordion-body-custom p-4"
                  >
                    <Table striped responsive borderless hover>
                      <tbody>
                        <tr>
                          <td>Title</td>
                          <td>{product.name}</td>
                        </tr>
                        <tr>
                          <td>Author</td>
                          <td>{product.author}</td>
                        </tr>
                        <tr>
                          <td>Category</td>
                          <td>{product.category}</td>
                        </tr>
                        <tr>
                          <td>Language</td>
                          <td>{product.language}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Accordion.Collapse>
                </div>
              </Accordion>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item
                    className="list-group-item-custom"
                    key={review._id}
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="list-group-item-custom">
                  <h2>Write a custom review</h2>
                  {errorProductReview && (
                    <Message variant="danger">{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select ...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">Sign In</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
