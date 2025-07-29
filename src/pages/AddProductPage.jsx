import { useState } from 'react';
import { Form, Button, Alert, Spinner, Container } from 'react-bootstrap';
import { addProduct } from '../api/fakestore';

function AddProductPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    // Basic validation
    if (!title || !price || !description || !category) {
      setErrorMsg('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const productData = {
        title,
        price: parseFloat(price),
        description,
        category,
        image: "https://via.placeholder.com/150" // Placeholder image required
      };

      const response = await addProduct(productData);

      if (response.status === 200 || response.status === 201) {
        setSuccessMsg('Product successfully added! (Note: This is a mock API, data won’t persist)');
        setTitle('');
        setPrice('');
        setDescription('');
        setCategory('');
      } else {
        setErrorMsg('Failed to add product. Please try again.');
      }
      } catch (error) {
        console.log(error);
        setErrorMsg('An error occurred while adding the product.');
      } finally {
        setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Product</h2>

      {successMsg && <Alert variant="success">{successMsg}</Alert>}
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPrice">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Add Product'}
        </Button>
      </Form>
    </Container>
  );
}

export default AddProductPage;
