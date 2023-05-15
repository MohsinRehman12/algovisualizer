import React from 'react'
import ImgCard from '../card/Card'
import Sortinggif from '../../assets/sorting.gif';
import Sortingimg from '../../assets/sorting.png';

const Home = () => {
  return (
    <>
        <h3 className="headerText">Algorithm Visualizer</h3>
        <div className="imgCardBox" >
        <ImgCard
        title={'Sorting Visualizer'}
        description={'This is a sorting visualizer made using ReactJS. It visualizes the sorting algorithms like Bubble Sort, Selection Sort, Insertion Sort, Selection Sort, Merge Sort, Quick Sort, and Cocktail Shaker Sort.'}
        linkTo={'./sortingvisualizer'}
        sorting={true}
        ></ImgCard>

        <ImgCard
        title={'Pathfinding Visualizer'}
        description={'This is a pathfinding visualizer made using ReactJS. It visualizes the pathfinding algorithms like Dijkstra\'s Algorithm, BFS and DFS search Algorithms, A* Search Algorithm, and Greedy Best-first Search Algorithm.'}
        linkTo={'./pathvisualizer'}
        path={true}
        ></ImgCard>
        </div>
        
    </>
  )
}

export default Home