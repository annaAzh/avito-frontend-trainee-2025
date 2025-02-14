import { QueryProvider } from './providers/queryProvider/queryProvider';
import { RouteProvider } from './providers/routerProvider/routerProvider';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <QueryProvider>
      <RouteProvider />
      <Toaster />
    </QueryProvider>
  );
}

export default App;
