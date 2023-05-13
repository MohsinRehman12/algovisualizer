import logo from './logo.svg';
import './App.css';
import Sortingvisualizer from './components/sortingvisualizer/Sortingvisualizer';
import Schedulingvisualizer from './components/cpuvisualizer/Schedulingvisualizer';
import PathVisualizer from './components/pathvisualizer/PathVisualizer';
function App() {
  return (
    <div className="App">
      {/* <Sortingvisualizer></Sortingvisualizer> */}
      {/* <Schedulingvisualizer></Schedulingvisualizer> */}
      <PathVisualizer></PathVisualizer>
    </div>
  );
}

export default App;
