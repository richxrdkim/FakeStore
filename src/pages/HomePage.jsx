import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Container className="text-center mt-5">
      <h1>Welcome to FakeStore!</h1>
      <p>Your favorite mock E-Commerce platform.</p>
      <Button variant="primary" onClick={() => navigate('/products')}>
        Browse Products
      </Button>
    </Container>
  );
}

export default HomePage;
