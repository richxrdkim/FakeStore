import { Container } from 'react-bootstrap';

function Layout({ children }) {
  return (
    <Container fluid className="px-3 py-4" style={{ maxWidth: '1200px' }}>
      {children}
    </Container>
  );
}

export default Layout;