import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-2 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" fluid className='product-img-custom'/>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className='card-title-custom'>
            {product.name.length > 27 ? (
              <strong>{product.name.slice(0, 27)}...</strong>
            ) : (
              <strong>{product.name}</strong>
            )}
          </Card.Title>
        </Link>
        <Card.Subtitle className="mb-2 card-subtitle-custom">
          {product.author}
        </Card.Subtitle>
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <Card.Text as="h5" className='card-price'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
