# Algovisualzer
## Deployed at http://mohsinrehman.me/algovisualizer/


This project is a visualization tool built with React that allows you to visualize various sorting algorithms, pathing/search algorithms, and CPU scheduling algorithms.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Introduction

Algovisualizer is a powerful educational tool that helps users understand the inner workings of sorting algorithms, pathing/search algorithms, and CPU scheduling algorithms. By visualizing the algorithms in action, users can gain a deeper understanding of how they operate and make informed decisions when implementing them in their own projects. Instead of creating 3 seperate visualization apps, Algovisualizer contains all of them in 1 app for easier access and future use. More algorithms are planned to be added in the future

## Features

- Sorting Algorithm Visualization: Visualize popular sorting algorithms such as Bubble Sort, Insertion Sort, Selection Sort, Merge Sort, Quick Sort, and more.
- Search Algorithm Visualization: Visualize search algorithms like Linear Search, Binary Search, Depth-First Search (DFS), Breadth-First Search (BFS), and more.
- CPU Scheduling Visualization: Visualize CPU scheduling algorithms like First-Come, First-Served (FCFS), Shortest Job Next (SJN), Round Robin (RR), and more.
- Additionally It provides adjustments for animation time and size the visualizer
- Allows mobile support for all 3 visualizer, however if you are using pathing visualizer we recommend to use your mobile device horozontally

## Installation

To run this project locally, follow these steps:

1. Clone the repository: git clone https://github.com/MohsinRehman12/algovisualizer/
2. Navigate to the project directory: cd algovisualizer
3. Install the dependencies: npm install
4. Start the development server: npm start
5. Open your browser and visit: http://localhost:3000

## Usage
-On when you intially load into the site you will be met with this page (shown below) you press visualize here based on what you currently want to visualize and then it will be loaded
-The sections after this futher explain how to use each visualizer
<img width="785" alt="image" src="https://github.com/MohsinRehman12/algovisualizer/assets/58042011/010235ee-497d-44e0-8b7f-b65455b2d061">


### Usage of Sorting Visualizer
- Sorting visualizer comes with a simple UI to view the dataset to be sorted and allows for adjustment of animation speed and array size using the sliders at the bottom (Shown in the image below)
- Generate Array, generates a random array and then you press any of the button based on the sorting algorithm you want to visualize

<img width="981" alt="image" src="https://github.com/MohsinRehman12/algovisualizer/assets/58042011/0c16d204-da62-4afc-83af-98258438e0b3">

### Usage of Pathing Visualizer

-Similar to Sorting visualizer, Pathing Visualizer comes allows for adjustment of animation speed using sliders

<img width="1204" alt="image" src="https://github.com/MohsinRehman12/algovisualizer/assets/58042011/50f2aead-bcb9-4d4f-abd3-a6ee71130c1e">

-You can move the start node(in green) and goal node(in red) by clicking and dragging them to a desired node

<img width="1115" alt="image" src="https://github.com/MohsinRehman12/algovisualizer/assets/58042011/6405afea-aeed-480f-918c-a7e725d24912">

-to add walls (shown in white) you can click on on empty node one at a time, or hold and drag your mouse across the screen in order to draw a line of walls continously as shown below, these walls act as a barrier that the algorithm must navigate around to reach the goal

<img width="1092" alt="image" src="https://github.com/MohsinRehman12/algovisualizer/assets/58042011/7211bfdd-5aa7-472c-a9bc-4eb03881ea26">

-then you press on the search algortihm you want visualized and then the app will show an animation for the path searched in yellow nodes and the path to goal in blue nodes (an example of BFS is shown below)

<img width="1080" alt="image" src="https://github.com/MohsinRehman12/algovisualizer/assets/58042011/d46939b9-cb9b-46a7-bd46-c5db4e5bd33f">


### Usage of CPU Scheduling Visualizer
- CPU Scheduling Visualizer comes with a slider to adjust the time quantum for round robin processes
- You can fill in the table with non-zero and non-negative numbers for burst and arrival times (app will not let you run otherwise)
- additionally you can add or remove processes by pressing the respective + or - buttons shown below

<img width="1085" alt="image" src="https://github.com/MohsinRehman12/algovisualizer/assets/58042011/6689c6a9-1b5c-4a2f-83d4-83d0d4601106">

-once you have filled in the table correctly you can select any of the CPU scheduling algoritms you want to visualize and you will get a Gantt chart along with information pertaining to the processes an example of Round Robin with a time quantum of 3 is shown below


<img width="1074" alt="image" src="https://github.com/MohsinRehman12/algovisualizer/assets/58042011/ccc5981b-de49-47cf-a0e9-9816cafa25f7">



