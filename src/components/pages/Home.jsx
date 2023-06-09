import React from 'react'
import ImgCard from '../card/Card'

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


        <ImgCard
        title={'CPU Scheduling Visualizer'}
        description={'This is a CPU Scheduling visualizer made using ReactJS. It visualizes the CPU Scheduling algorithms like First Come First Serve (FCFS), Shortest Job First (SJF), Shortest Remaining Time First (SRTF), Priority Scheduling, Round Robin Scheduling'}
        linkTo={'./schedulingvisualizer'}
        scheduling={true}
        ></ImgCard>
        </div>
        
    </>
  )
}

export default Home