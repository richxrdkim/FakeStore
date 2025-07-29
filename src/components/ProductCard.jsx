import { Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <Col md={4} sm={6} xs={12} className="mb-4">
      <Card className="h-100 shadow-sm">
        <Card.Img variant="top" src={product.image} style={{ height: '250px', objectFit: 'contain', padding: '10px' }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title style={{ fontSize: '1rem' }}>{product.title}</Card.Title>
          <Card.Text className="fw-bold mb-2">${product.price}</Card.Text>
          <Button variant="primary" className="mt-auto" onClick={() => navigate(`/products/${product.id}`)}>
            View Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductCard;
