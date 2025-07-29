import { useEffect, useState } from 'react';
import { Container, Row, Spinner, Alert } from 'react-bootstrap';
import { fetchAllProducts } from '../api/fakestore';
import ProductCard from '../components/ProductCard';

function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllProducts()
      .then(response => setProducts(response.data))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Spinner animation="border" role="status" className="d-block mx-auto mt-5" />;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <Container className="mt-4">
      <Row>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>
    </Container>
  );
}

export default ProductListPage;
