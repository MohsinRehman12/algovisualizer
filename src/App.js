import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Sortingvisualizer from './components/sortingvisualizer/Sortingvisualizer';
import Schedulingvisualizer from './components/cpuvisualizer/Schedulingvisualizer';
import PathVisualizer from './components/pathvisualizer/PathVisualizer';
import ImgCard from './components/card/Card'
import Home from './components/pages/Home';
import { func } from 'prop-types';


function App() {

  const [page, setPage] = useState("home");
  
  

  return (
    <div className="App">

      {page === "home" ? <Home state={page} updatePropState={setPage}/> 
      : page === "sortingvisualizer" ? <Sortingvisualizer propState={page}  updatePropState={setPage}/>
      : page === "schedulingvisualizer" ? <Schedulingvisualizer propState={page}  updatePropState={setPage}/>
      : page === "pathvisualizer" ? <PathVisualizer propState={page} updatePropState={setPage} /> 
      : null}
      {/* <BrowserRouter>
      <Routes>
      <Route path="/algovisualizer" element={<Home  />} />

        <Route path="/sortingvisualizer" element={<Sortingvisualizer  />} />
        <Route path="/schedulingvisualizer" element={<Schedulingvisualizer />} />
        <Route path="/pathvisualizer" element={<PathVisualizer />} />
        </Routes>
      </BrowserRouter> */}
     
    </div>
  );
}

export default App;
