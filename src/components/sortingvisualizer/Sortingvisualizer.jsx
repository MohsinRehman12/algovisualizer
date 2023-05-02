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
    }

    function mergeSort(){

        const animations = sortingAlgorithms.getMergeSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBarsF = document.getElementsByClassName('bar front color');
          const arrayBarsB = document.getElementsByClassName('bar back color');
          const arrayBarsL = document.getElementsByClassName('bar left color');
          const arrayBarsR = document.getElementsByClassName('bar right color');

          const arrayBarsValue = document.getElementsByClassName('bar value');
        


          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
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

        
    }

    function bubbleSort(){
        var n = array.length;
        for(var i = 0; i < n; i++){
            for(var j = 0; j < n-i-1; j++){
                if(array[j] > array[j+1]){
                    var temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                }
            }
        }
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
        <button className="button" onClick={mergeSort}>Sort Array</button>
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