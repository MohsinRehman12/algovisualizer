import React from 'react'
import './Sortingvisualizer.css'
import { useState, useEffect } from 'react';
import Bar from './Bar';
import * as sortingAlgorithms from './algorithms/sortingAlgorithms';

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


    function insertionSort(){
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
                barTwoStyle.backgroundColor = SECONDARY_COLOR;

                barOneStyleB.backgroundColor = SECONDARY_COLOR;
                barTwoStyleB.backgroundColor = SECONDARY_COLOR;

                barOneStyleL.backgroundColor = SECONDARY_COLOR;
                barTwoStyleL.backgroundColor = SECONDARY_COLOR;

                barOneStyleR.backgroundColor = SECONDARY_COLOR;
                barTwoStyleR.backgroundColor = SECONDARY_COLOR;


                


            if(swap){

                barOneStyle.backgroundColor = PRIMARY_COLOR;
                barTwoStyle.backgroundColor = PRIMARY_COLOR;

                barOneStyleB.backgroundColor = PRIMARY_COLOR;
                barTwoStyleB.backgroundColor = PRIMARY_COLOR;

                barOneStyleL.backgroundColor = PRIMARY_COLOR;
                barTwoStyleL.backgroundColor = PRIMARY_COLOR;

                barOneStyleR.backgroundColor = PRIMARY_COLOR;
                barTwoStyleR.backgroundColor = PRIMARY_COLOR;


                console.log("swap: ", swap);
                console.log("barOneIdx: ", barOneIdx);
                console.log("barTwoIdx: ", barTwoIdx);
                console.log("barOneH: ", barOneH);
                console.log("barTwoH: ", barTwoH);
                
                var temp = barOneH;

                barOneStyle.height = `${barOneH}vh`;
                barOneStyleB.height = `${barOneH}vh`;
                barOneStyleL.height = `${barOneH}vh`;
                barOneStyleR.height = `${barOneH}vh`;
                barOneStyle.transform = `translateY(${90 - barOneH}vh)`;

                barOneStyleB.transform = `translateY(${90 - barOneH}vh)`;
                barOneStyleL.transform = `translateY(${90 - barOneH}vh)`;
                barOneStyleR.transform = `translateY(${90 - barOneH}vh)`;

                document.getElementsByClassName('barvalue')[barOneIdx].innerHTML = barOneH;

                // barTwoStyle = arrayBarsF[barTwoIdx].style;
                // barTwoStyleB = arrayBarsB[barTwoIdx].style;
                // barTwoStyleL = arrayBarsL[barTwoIdx].style;
                // barTwoStyleR = arrayBarsR[barTwoIdx].style;

                barTwoStyle.height = `${barTwoH}vh`;
                barTwoStyleB.height = `${barTwoH}vh`;
                barTwoStyleL.height = `${barTwoH}vh`;
                barTwoStyleR.height = `${barTwoH}vh`;
                barTwoStyle.transform = `translateY(${90 - barTwoH}vh)`;
                barTwoStyleB.transform = `translateY(${90 - barTwoH}vh)`;
                barTwoStyleL.transform = `translateY(${90 - barTwoH}vh)`;
                barTwoStyleR.transform = `translateY(${90 - barTwoH}vh)`;

                console.log("bar hegihts", barOneH, barTwoH, barTwoH);

                document.getElementsByClassName('barvalue')[barTwoIdx].innerHTML = barTwoH;
                
                
            }
            }, i * ANIMATION_SPEED_MS);
            
            document.getElementsByClassName('color').backgroundColor = PRIMARY_COLOR;
        }

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
            
                  console.log("b1height and idx: ", b1height, barOneIdx)
                    console.log("b2height and idx: ", b2height , barTwoIdx)

                  var barOneStyle = arrayBarsF[barOneIdx].style;
                  var barOneStyleB = arrayBarsB[barOneIdx].style;
                  var barOneStyleL = arrayBarsL[barOneIdx].style;
                  var barOneStyleR = arrayBarsR[barOneIdx].style;

                  var barTwoStyle = arrayBarsF[barTwoIdx].style;
                    var barTwoStyleB = arrayBarsB[barTwoIdx].style;
                    var barTwoStyleL = arrayBarsL[barTwoIdx].style;
                    var barTwoStyleR = arrayBarsR[barTwoIdx].style;


                  if(b1height > b2height){
                    barOneStyle.height = `${b2height}vh`;
                    barOneStyleB.height = `${b2height}vh`;
                    barOneStyleL.height = `${b2height}vh`;
                    barOneStyleR.height = `${b2height}vh`;
                    barOneStyle.transform = `translateY(${90 - b2height}vh)`;

                    barOneStyleB.transform = `translateY(${90 - b2height}vh)`;
                    barOneStyleL.transform = `translateY(${90 - b2height}vh)`;
                    barOneStyleR.transform = `translateY(${90 - b2height}vh)`;

                    document.getElementsByClassName('barvalue')[barOneIdx].innerHTML = b2height;

                    barTwoStyle = arrayBarsF[barTwoIdx].style;
                    barTwoStyleB = arrayBarsB[barTwoIdx].style;
                    barTwoStyleL = arrayBarsL[barTwoIdx].style;
                    barTwoStyleR = arrayBarsR[barTwoIdx].style;

                    barTwoStyle.height = `${b1height}vh`;
                    barTwoStyleB.height = `${b1height}vh`;
                    barTwoStyleL.height = `${b1height}vh`;
                    barTwoStyleR.height = `${b1height}vh`;
                    barTwoStyle.transform = `translateY(${90 - b1height}vh)`;
                    barTwoStyleB.transform = `translateY(${90 - b1height}vh)`;
                    barTwoStyleL.transform = `translateY(${90 - b1height}vh)`;
                    barTwoStyleR.transform = `translateY(${90 - b1height}vh)`;

                    document.getElementsByClassName('barvalue')[barTwoIdx].innerHTML = b1height;

                    }
                    else{
                        barOneStyle.height = `${b1height}vh`;
                        barOneStyleB.height = `${b1height}vh`;
                        barOneStyleL.height = `${b1height}vh`;
                        barOneStyleR.height = `${b1height}vh`;
                        barOneStyle.transform = `translateY(${90 - b1height}vh)`;
                        barOneStyleB.transform = `translateY(${90 - b1height}vh)`;
                        barOneStyleL.transform = `translateY(${90 - b1height}vh)`;
                        barOneStyleR.transform = `translateY(${90 - b1height}vh)`;

                        document.getElementsByClassName('barvalue')[barOneIdx].innerHTML = b1height;

                        barTwoStyle = arrayBarsF[barTwoIdx].style;
                        barTwoStyleB = arrayBarsB[barTwoIdx].style;
                        barTwoStyleL = arrayBarsL[barTwoIdx].style;
                        barTwoStyleR = arrayBarsR[barTwoIdx].style;

                        barTwoStyle.height = `${b2height}vh`;
                        barTwoStyleB.height = `${b2height}vh`;
                        barTwoStyleL.height = `${b2height}vh`;
                        barTwoStyleR.height = `${b2height}vh`;
                        barTwoStyle.transform = `translateY(${90 - b2height}vh)`;
                        barTwoStyleB.transform = `translateY(${90 - b2height}vh)`;
                        barTwoStyleL.transform = `translateY(${90 - b2height}vh)`;
                        barTwoStyleR.transform = `translateY(${90 - b2height}vh)`;

                        document.getElementsByClassName('barvalue')[barTwoIdx].innerHTML = b2height;
                    }

                
                    
    

    
    
    
    
    
                }
                , i * ANIMATION_SPEED_MS);
                
              }
            }

            setArray(array.sort(function(a, b){return a-b}));

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