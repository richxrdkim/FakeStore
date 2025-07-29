import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { fetchProductById, updateProduct } from '../api/fakestore';

function EditProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', price: '', description: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductById(id)
      .then(response => {
        const product = response.data;
        setFormData({
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category
        });
      })
      .catch(() => setError('Failed to load product data'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    updateProduct(id, formData)
      .then(() => {
        setSuccess(true);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to update product');
        setLoading(false);
      });
  };

  if (loading) return <Spinner animation="border" role="status" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <Container className="mt-4">
      <h2>Edit Product</h2>
      {success && <Alert variant="success">Product updated successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            step="0.01"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Update Product'}
        </Button>{' '}
        <Button variant="secondary" onClick={() => navigate(-1)} disabled={loading}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
}

export default EditProductPage;
