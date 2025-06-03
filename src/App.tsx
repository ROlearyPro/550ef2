import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import Blueprints from './Blueprints/Blueprints';
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import { getBlueprints } from './ApiCalls';
import NodeDetail from './Components/NodeDetail';

function App() {

  const [BlueprintData, setBlueprintData] = useState<any[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/v1/123/actions/blueprints/bpd_456/graph`);
      console.log(res)
      const data = await res.json();
      setBlueprintData(data); // resolved data
    };

    fetchData();
  }, []);



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
