import { BrowserRouter } from 'react-router-dom';

import SchemaProvider from './SchemaContext';
import SchemaView from './SchemaView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SchemaProvider>
          <SchemaView />
        </SchemaProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
