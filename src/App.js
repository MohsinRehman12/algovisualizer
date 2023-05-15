import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Sortingvisualizer from './components/sortingvisualizer/Sortingvisualizer';
import Schedulingvisualizer from './components/cpuvisualizer/Schedulingvisualizer';
import PathVisualizer from './components/pathvisualizer/PathVisualizer';
import ImgCard from './components/card/Card'
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">

      
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home  />} />

        <Route path="/sortingvisualizer" element={<Sortingvisualizer  />} />
        {/* <Route path="/schedulingvisualizer" element={<Schedulingvisualizer />} /> */}
        <Route path="/pathvisualizer" element={<PathVisualizer />} />
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
