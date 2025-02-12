import { QueryProvider } from './providers/queryProvider/queryProvider';
import { RouteProvider } from './providers/routerProvider/routerProvider';

function App() {
  return (
    <QueryProvider>
      <RouteProvider />
    </QueryProvider>
  );
}

export default App;
