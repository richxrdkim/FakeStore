import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById, deleteProduct } from '../api/fakestore';
import { Container, Button, Spinner, Alert, Card, Modal } from 'react-bootstrap';

function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProductById(id)
      .then(res => setProduct(res.data))
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    deleteProduct(id)
      .then(() => {
        setShowModal(false);
        navigate('/products');
      })
      .catch(() => alert('Failed to delete product'));
  };

  if (loading) return <Spinner animation="border" role="status" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;
  if (!product) return null;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={product.image} height="400" style={{ objectFit: 'contain' }} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text><strong>Category:</strong> {product.category}</Card.Text>
          <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
          <Button variant="warning" onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</Button>{' '}
          <Button variant="danger" onClick={() => setShowModal(true)}>Delete</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetailsPage;
