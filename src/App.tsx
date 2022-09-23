import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Chessboard } from "react-chessboard";

function App() {
  return (
    <div className="App">
     <Chessboard id={1} />
    </div>
  );
}

export default App;
