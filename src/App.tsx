import SchemaProvider from './SchemaContext';
import SchemaView from './SchemaView';

function App() {
  return (
    <div className="App">
      <SchemaProvider>
        <SchemaView />
      </SchemaProvider>
    </div>
  );
}

export default App;
