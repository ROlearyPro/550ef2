import './App.css';
import { useState, useEffect } from "react";
import Blueprints from './Blueprints/Blueprints';
import { Routes, Route } from 'react-router-dom';
import NodeDetail from './Components/NodeDetail';

function App() {

  const [BlueprintData, setBlueprintData] = useState<any[] | null>([]);
  // get the graph we're using, currently hardcoded but easily replaced through props, etc.
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/123/actions/blueprints/bpd_456/graph`);
      console.log(res)
      const data = await res.json();
      setBlueprintData(data); // resolved data
    };

    fetchData();
  }, []);

  // Basic container for routes, with the first route showing the "home page" and the second being the node's individual pages.
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route
            path="/"
            element={<Blueprints BlueprintData={BlueprintData} />}
          />
          <Route
            path="/nodes/:nodeName"
            element={<NodeDetail BlueprintData={BlueprintData} />}
          />
        </Routes>
        <p>
        </p>
      </header>
    </div>
  );
}

export default App;
