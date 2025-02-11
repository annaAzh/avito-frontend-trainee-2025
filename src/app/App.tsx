import { Container } from '@/shared/components/ui';
import { RouteProvider } from './providers/routerProvider/routerProvider';

function App() {
  return (
    <Container className="mt-10 text-center">
      <RouteProvider />
    </Container>
  );
}

export default App;
