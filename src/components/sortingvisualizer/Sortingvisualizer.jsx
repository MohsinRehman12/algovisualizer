import React from 'react'
import './Sortingvisualizer.css'
import { useState, useEffect } from 'react';
import Bar from './Bar';
import * as sortingAlgorithms from './algorithms/sortingAlgorithms';
import * as generalAlgorithms from './algorithms/generalAlgorithms';


function Sortingvisualizer() {

    const [array, setArray] = useState([]);
    const [sorted, setSorted] = useState(false);
    const ANIMATION_SPEED_MS = 200;

    // Change this value for the number of bars (value) in the array.
    const NUMBER_OF_ARRAY_BARS = 310;
    
    // This is the main color of the array bars.
    const PRIMARY_COLOR = 'red';
    
    // This is the color of array bars that are being compared throughout the animations.
    const SECONDARY_COLOR = 'turquoise';

    function getRandomIntRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    useEffect(() => {
        createArray();

    }, [])


    function onClickArray(){
        createArray();
    }


    function createArray(){
        const array = [];
        for(let i = 0; i < 12; i++){
            array.push(getRandomIntRange(5, 90));
        }
        setArray(array);
        console.log("array: ", array);
        generalAlgorithms.resetColors();

    }

    function mergeSort(){

        const animations = sortingAlgorithms.getMergeSortAnimations(array);
        console.log("animations: ", animations);

        for (let i = 0; i < animations.length; i++) {
          const arrayBarsF = document.getElementsByClassName('bar front color');
          const arrayBarsB = document.getElementsByClassName('bar back color');
          const arrayBarsL = document.getElementsByClassName('bar left color');
          const arrayBarsR = document.getElementsByClassName('bar right color');

          const arrayBarsValue = document.getElementsByClassName('bar value');
        


          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            console.log("barOneIdx: ", barOneIdx);
                console.log("barTwoIdx: ", barTwoIdx);
            const barOneStyle = arrayBarsF[barOneIdx].style;
            const barTwoStyle = arrayBarsF[barTwoIdx].style;

            const barOneStyleB = arrayBarsB[barOneIdx].style;
            const barTwoStyleB = arrayBarsB[barTwoIdx].style;

            const barOneStyleL = arrayBarsL[barOneIdx].style;
            const barTwoStyleL = arrayBarsL[barTwoIdx].style;

            const barOneStyleR = arrayBarsR[barOneIdx].style;
            const barTwoStyleR = arrayBarsR[barTwoIdx].style;



            const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
                barOneStyleB.backgroundColor = color;
                barTwoStyleB.backgroundColor = color;

                barOneStyleL.backgroundColor = color;
                barTwoStyleL.backgroundColor = color;

                barOneStyleR.backgroundColor = color;
                barTwoStyleR.backgroundColor = color;



            }, i * ANIMATION_SPEED_MS);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBarsF[barOneIdx].style;
              const barOneStyleB = arrayBarsB[barOneIdx].style;
              const barOneStyleL = arrayBarsL[barOneIdx].style;
              const barOneStyleR = arrayBarsR[barOneIdx].style;


              barOneStyle.height = `${newHeight}vh`;
                barOneStyleB.height = `${newHeight}vh`;
                barOneStyleL.height = `${newHeight}vh`;
                barOneStyleR.height = `${newHeight}vh`;
              barOneStyle.transform = `translateY(${90 - newHeight}vh)`;
                barOneStyleB.transform = `translateY(${90 - newHeight}vh)`;
                barOneStyleL.transform = `translateY(${90 - newHeight}vh)`;
                barOneStyleR.transform = `translateY(${90 - newHeight}vh)`;

                document.getElementsByClassName('barvalue')[barOneIdx].innerHTML = newHeight;





            }, i * ANIMATION_SPEED_MS);
          }
        }
        setArray(array.sort(function(a, b){return a-b}));



        
    }

    function selectionSort(){
      generalAlgorithms.resetColors();
        const animations = sortingAlgorithms.getSelectionSortAnimations(array);
        console.log("animationsI: ", animations);

        for (let i = 0; i < animations.length; i++) {



            
            
            const [barOneIdx, barTwoIdx, barOneH, barTwoH, swap] = animations[i];
            
            setTimeout(() => {

                var arrayBarsF = document.getElementsByClassName('bar front color');
                var arrayBarsB = document.getElementsByClassName('bar back color');
                var arrayBarsL = document.getElementsByClassName('bar left color');
                var arrayBarsR = document.getElementsByClassName('bar right color');

                var arrayBarsValue = document.getElementsByClassName('bar value');

                var barOneStyle = arrayBarsF[barOneIdx].style;
                var barTwoStyle = arrayBarsF[barTwoIdx].style;

                var barOneStyleB = arrayBarsB[barOneIdx].style;
                var barTwoStyleB = arrayBarsB[barTwoIdx].style;

                var barOneStyleL = arrayBarsL[barOneIdx].style;
                var barTwoStyleL = arrayBarsL[barTwoIdx].style;

                var barOneStyleR = arrayBarsR[barOneIdx].style;
                var barTwoStyleR = arrayBarsR[barTwoIdx].style;

                barOneStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyle.backgroundColor = SECONDARY_COLOR;

                barOneStyleB.backgroundColor = SECONDARY_COLOR;
                barTwoStyleB.backgroundColor = SECONDARY_COLOR;

                barOneStyleL.backgroundColor = SECONDARY_COLOR;
                barTwoStyleL.backgroundColor = SECONDARY_COLOR;

                barOneStyleR.backgroundColor = SECONDARY_COLOR;
                barTwoStyleR.backgroundColor = SECONDARY_COLOR;


                


            if(swap){

              var animationsIndexSwap = [barTwoIdx, barOneIdx, barOneH, barTwoH, swap];

              generalAlgorithms.styleSwap( animationsIndexSwap, PRIMARY_COLOR);

              generalAlgorithms.resetColors();
                
            }
            }, i * ANIMATION_SPEED_MS);
            
            document.getElementsByClassName('color').backgroundColor = PRIMARY_COLOR;
        }

        // generalAlgorithms.finishedSort();

        setArray(array.sort(function(a, b){return a-b}));

    }


    function insertionSort(){

      generalAlgorithms.resetColors();
        const animations = sortingAlgorithms.getInsertionSortAnimations(array);
        console.log("animationsI: ", animations);

        for (let i = 0; i < animations.length; i++) {


            
            const [barOneIdx, barTwoIdx, barOneH, barTwoH, swap] = animations[i];
            
            setTimeout(() => {



                var arrayBarsF = document.getElementsByClassName('bar front color');
                var arrayBarsB = document.getElementsByClassName('bar back color');
                var arrayBarsL = document.getElementsByClassName('bar left color');
                var arrayBarsR = document.getElementsByClassName('bar right color');

                var arrayBarsValue = document.getElementsByClassName('bar value');

                var barOneStyle = arrayBarsF[barOneIdx].style;
                var barTwoStyle = arrayBarsF[barTwoIdx].style;

                var barOneStyleB = arrayBarsB[barOneIdx].style;
                var barTwoStyleB = arrayBarsB[barTwoIdx].style;

                var barOneStyleL = arrayBarsL[barOneIdx].style;
                var barTwoStyleL = arrayBarsL[barTwoIdx].style;

                var barOneStyleR = arrayBarsR[barOneIdx].style;
                var barTwoStyleR = arrayBarsR[barTwoIdx].style;

                
                  barOneStyle.backgroundColor = SECONDARY_COLOR;
                  barOneStyleB.backgroundColor = SECONDARY_COLOR;
                  barOneStyleL.backgroundColor = SECONDARY_COLOR;
                  barOneStyleR.backgroundColor = SECONDARY_COLOR;

                

                barTwoStyle.backgroundColor = SECONDARY_COLOR;

                barTwoStyleB.backgroundColor = SECONDARY_COLOR;

                barTwoStyleL.backgroundColor = SECONDARY_COLOR;

                barTwoStyleR.backgroundColor = SECONDARY_COLOR;


                
            

            if(swap){


              generalAlgorithms.styleSwap( animations[i], PRIMARY_COLOR);
              generalAlgorithms.resetColors();

                

            }
            }, i * ANIMATION_SPEED_MS);
            
            document.getElementsByClassName('color').backgroundColor = PRIMARY_COLOR;
        }

        // generalAlgorithms.finishedSort();

        setArray(array.sort(function(a, b){return a-b}));

        

        

        
    }

    function bubbleSort(){
        const animations = sortingAlgorithms.getBubbleSortAnimations(array);
        console.log("animationsB: ", animations);

        for (let i = 0; i < animations.length; i++) {
            const arrayBarsF = document.getElementsByClassName('bar front color');
            const arrayBarsB = document.getElementsByClassName('bar back color');
            const arrayBarsL = document.getElementsByClassName('bar left color');
            const arrayBarsR = document.getElementsByClassName('bar right color');



            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                console.log("barOneIdx: ", barOneIdx);
                    console.log("barTwoIdx: ", barTwoIdx);
                const barOneStyle = arrayBarsF[barOneIdx].style;
                const barTwoStyle = arrayBarsF[barTwoIdx].style;
    
                const barOneStyleB = arrayBarsB[barOneIdx].style;
                const barTwoStyleB = arrayBarsB[barTwoIdx].style;
    
                const barOneStyleL = arrayBarsL[barOneIdx].style;
                const barTwoStyleL = arrayBarsL[barTwoIdx].style;
    
                const barOneStyleR = arrayBarsR[barOneIdx].style;
                const barTwoStyleR = arrayBarsR[barTwoIdx].style;
    
    
    
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                  barOneStyle.backgroundColor = color;
                  barTwoStyle.backgroundColor = color;
                    barOneStyleB.backgroundColor = color;
                    barTwoStyleB.backgroundColor = color;
    
                    barOneStyleL.backgroundColor = color;
                    barTwoStyleL.backgroundColor = color;
    
                    barOneStyleR.backgroundColor = color;
                    barTwoStyleR.backgroundColor = color;
    
    
    
                }, i * ANIMATION_SPEED_MS);
              } else {
                setTimeout(() => {
                  const [barOneIdx, barTwoIdx, b1height, b2height] = animations[i];


                  if(b1height > b2height){

                    const animationsIndexSwap = [barTwoIdx, barOneIdx, b1height, b2height];
                    

                    generalAlgorithms.styleSwap( animationsIndexSwap, PRIMARY_COLOR);


                    }
                    else{
                      generalAlgorithms.styleSwap( animations[i], PRIMARY_COLOR);

                    }

                
                    
    

    
    
    
    
    
                }
                , i * ANIMATION_SPEED_MS);
                
              }
              
            }

            setArray(array.sort(function(a, b){return a-b}));
            // generalAlgorithms.finishedSort();


        }



    function arraysAreEqual(arrayOne, arrayTwo){
        if(arrayOne.length !== arrayTwo.length) return false;
        for(let i = 0; i < arrayOne.length; i++){
            if(arrayOne[i] !== arrayTwo[i]) return false;
        }
        return true;
    }

    // useEffect(() => {
    //     if(sorted){
    //         var elements = document.getElementsByClassName('bar color');
    //         for(var i = 0; i < elements.length; i++){
    //             elements[i].style.backgroundColor = 'green';
    //         }
    //     }
    // }, [sorted])


  return (
    <>

    <div className="buttonBox">
        <button className="button" onClick={bubbleSort}>Bubble Sort Array</button>
        <button className="button" onClick={mergeSort}>Merge Sort Array</button>
        <button className="button" onClick={insertionSort}>Insertion Sort Array</button>
        <button className="button" onClick={selectionSort}>Selection Sort Array</button>

        <button className="button" onClick={createArray}>Generate Array</button>

    </div>

    <div className="array-container">
    {array.map((value, idx) => (
            <div height={value} key={idx} className="bar-container"> 

                <div className="bar top">
                    </div>

                    <div className="bar bottom">

                    </div>

                    <div className="bar front">
                        <div className="bar front color" style={{ height: `${value}vh`, transform: `translateY(${90-value}vh)` }}>
                        <p className='barvalue'>{value}</p>

                        </div>
                        
                    </div>

                    <div className="bar back" >
                        <div className="bar back color" style={{ height: `${value}vh`, transform: `translateY(${90-value}vh)` }}>

                        </div>
                    </div>

                    <div className="bar left">
                        <div className="bar left color" style={{ height: `${value}vh`, transform: `translateY(${90-value}vh)` }}>

                        </div>
                    </div>

                    <div className="bar right">
                        <div className="bar right color" style={{ height: `${value}vh`, transform: `translateY(${90-value}vh)` }}>

                        </div>  
                    </div>
            </div>
    ))}

    </div>

    </>
  )
}

export default Sortingvisualizer