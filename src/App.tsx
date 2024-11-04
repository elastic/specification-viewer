import { HashRouter } from 'react-router-dom';

import SchemaProvider from './SchemaContext';
import SchemaView from './SchemaView';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <SchemaProvider>
          <SchemaView />
        </SchemaProvider>
      </HashRouter>
    </div>
  );
}

export default App;
