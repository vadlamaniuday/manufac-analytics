

import Home from './components/Home';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
    <div className="App">
      <Home />
    </div>
    </MantineProvider>
  );
}

export default App;
