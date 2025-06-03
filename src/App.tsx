import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import BlueprintDisplayer from './BlueprintDisplayer';

const [BlueprintData, setBlueprintData] = useState(null);

function getBlueprints() {

  fetch("http://localhost:3000/api/v1/123/actions/blueprints/bp_456/graph")
    .then((res) => {
      if (!res.ok) {
        const err = new Error(res.statusText);
        throw err;
      }
      return res.json();
    })
    .then((data) => {
      setBlueprintData(data);
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

useEffect(() => {
  getBlueprints();
}, []);


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Routes>
          <Route path="/"
            element={
              <BlueprintDisplayer
                BlueprintData={BlueprintData}
              />
            }
          />
        </Routes>
        <p>



          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

  );
}

export default App;
