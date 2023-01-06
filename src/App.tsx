// import React from 'react';
// import logo from './logo.svg';
import getItems from "api/_axios";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    getItems().then((data) => console.log(data));
  }, []);
  return <div className="App"></div>;
}

export default App;
