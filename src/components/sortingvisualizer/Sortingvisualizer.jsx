import React from 'react'
import './Sortingvisualizer.css'
import { useState, useEffect } from 'react';
import Bar from './Bar';
import * as sortingAlgorithms from './algorithms/sortingAlgorithms';
import * as generalAlgorithms from './algorithms/generalAlgorithms';
import { Slider } from '@mui/material';

function Sortingvisualizer({propState, updatePropState}) {

    const [array, setArray] = useState([]);
    const [arraySize, setArraySize] = useState(10);
    const [isSorting, setIsSorting] = useState(false);
    const [showSliders, setShowSliders] = useState(false);

    useEffect(() => {
      console.log("arrayF: ", array);

        if(isSorting==1){
            generalAlgorithms.resetColors();
            generalAlgorithms.disableButtons(isSorting);
            setShowSliders(true);

        }
        
        else{
            generalAlgorithms.enableButtons(isSorting);
            setShowSliders(false);
            setArray(array.sort(function(a, b){return a-b}));


        }

    }, [isSorting])

    const [ANIMATION_SPEED_MS, setAnimationSpeed] = useState(200);

    // Change this value for the number of bars (value) in the array.
    
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
        for(let i = 0; i < arraySize; i++){
            array.push(getRandomIntRange(5, 90));
        }
        setArray(array);
        generalAlgorithms.resetColors();

    }

    

    function mergeSort(){

      generalAlgorithms.disableButtons(isSorting);
      
      setIsSorting(1);


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


              barOneStyle.height = `${(newHeight/2)}vh`;
                barOneStyleB.height = `${(newHeight/2)}vh`;
                barOneStyleL.height = `${(newHeight/2)}vh`;
                barOneStyleR.height = `${(newHeight/2)}vh`;
              barOneStyle.transform = `translateY(${45-(newHeight/2)}vh)`;
                barOneStyleB.transform = `translateY(${45-(newHeight/2)}vh)`;
                barOneStyleL.transform = `translateY(${45-(newHeight/2)}vh)`;
                barOneStyleR.transform = `translateY(${45-(newHeight/2)}vh)`;

                document.getElementsByClassName('barvalue')[barOneIdx].innerHTML = newHeight;

                if(i == animations.length - 1){
                  generalAlgorithms.finishedSort();
                  setIsSorting(0);
    
                }


            }, i * ANIMATION_SPEED_MS);
          }
        }




        
    }

    function selectionSort(){

      generalAlgorithms.disableButtons(isSorting);
      setIsSorting(1);

      generalAlgorithms.resetColors();
        const animations = sortingAlgorithms.getSelectionSortAnimations(array);

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

                barOneStyleL.backgroundColor = 'black';
                barOneStyleB.backgroundColor = 'black';
                barOneStyleR.backgroundColor = 'black';
                barOneStyle.backgroundColor = 'black';

                barTwoStyle.backgroundColor = SECONDARY_COLOR;
                barTwoStyleB.backgroundColor = SECONDARY_COLOR;             
                barTwoStyleL.backgroundColor = SECONDARY_COLOR;
                barTwoStyleR.backgroundColor = SECONDARY_COLOR;
              


                


            if(swap){

              var animationsIndexSwap = [barTwoIdx, barOneIdx, barOneH, barTwoH, swap];

              generalAlgorithms.styleSwap( animationsIndexSwap, PRIMARY_COLOR);

              generalAlgorithms.resetColors();
                
            }

            if(i == animations.length - 1){
              generalAlgorithms.finishedSort();
              setIsSorting(0);

            }

            }, i * ANIMATION_SPEED_MS);
            
            document.getElementsByClassName('color').backgroundColor = PRIMARY_COLOR;
          
        }

        

        // generalAlgorithms.finishedSort();
        

    }


    function insertionSort(){
      generalAlgorithms.disableButtons(isSorting);
      setIsSorting(1);


      generalAlgorithms.resetColors();
        const animations = sortingAlgorithms.getInsertionSortAnimations(array);

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
            if(i == animations.length - 1){
              generalAlgorithms.finishedSort();
              setIsSorting(0);

            }
            }, i * ANIMATION_SPEED_MS);
            
            document.getElementsByClassName('color').backgroundColor = PRIMARY_COLOR;
        }

        // generalAlgorithms.finishedSort();


        

        

        
    }

    function quickSort(){
      generalAlgorithms.disableButtons(isSorting);
      setIsSorting(1);


        generalAlgorithms.resetColors();
        const animations = sortingAlgorithms.getQuickSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {



            
            
            const [barOneIdx, barTwoIdx, barOneH, barTwoH, swap] = animations[i];
            
            setTimeout(() => {

                var arrayBarsF = document.getElementsByClassName('bar front color');
                var arrayBarsB = document.getElementsByClassName('bar back color');
                var arrayBarsL = document.getElementsByClassName('bar left color');
                var arrayBarsR = document.getElementsByClassName('bar right color');

                var arrayBarsValue = document.getElementsByClassName('bar value');

                

                if (barTwoIdx == false){

                  var barOneStyle = arrayBarsF[barOneIdx].style;
                  var barOneStyleB = arrayBarsB[barOneIdx].style;
                  var barOneStyleL = arrayBarsL[barOneIdx].style;
                  var barOneStyleR = arrayBarsR[barOneIdx].style;

                  barOneStyleL.backgroundColor = 'black';
                  barOneStyleB.backgroundColor = 'black';
                  barOneStyleR.backgroundColor = 'black';
                  barOneStyle.backgroundColor = 'black';
                }

                else{

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
                }

                


                


            if(swap){

              // var animationsIndexSwap = [barTwoIdx, barOneIdx, barOneH, barTwoH, swap];

              generalAlgorithms.styleSwap( animations[i], PRIMARY_COLOR);

              generalAlgorithms.resetColors();
                
            }
            if(i == animations.length - 1){
              generalAlgorithms.finishedSort();
              setIsSorting(0);

            }
            
            }, i * ANIMATION_SPEED_MS);
            
            document.getElementsByClassName('color').backgroundColor = PRIMARY_COLOR;
        }

        // generalAlgorithms.finishedSort();


    

    }

    function bubbleSort(){
      setIsSorting(1);

      generalAlgorithms.disableButtons(isSorting);


        const animations = sortingAlgorithms.getBubbleSortAnimations(array);

        for (let i = 0; i < animations.length; i++) {
            const arrayBarsF = document.getElementsByClassName('bar front color');
            const arrayBarsB = document.getElementsByClassName('bar back color');
            const arrayBarsL = document.getElementsByClassName('bar left color');
            const arrayBarsR = document.getElementsByClassName('bar right color');



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
                  const [barOneIdx, barTwoIdx, b1height, b2height] = animations[i];


                  if(b1height > b2height){

                    const animationsIndexSwap = [barTwoIdx, barOneIdx, b1height, b2height];
                    

                    generalAlgorithms.styleSwap( animationsIndexSwap, PRIMARY_COLOR);


                    }
                    else{
                      generalAlgorithms.styleSwap( animations[i], PRIMARY_COLOR);

                    }

                
                    
    

    
    
    
    
                    if(i == animations.length - 1){
                      generalAlgorithms.finishedSort();
                      setIsSorting(0);


                    }
                }
                
                , i * ANIMATION_SPEED_MS);
                
              }
              
            }

            // generalAlgorithms.finishedSort();


        }


    function cocktailShakerSort(){
      
      setIsSorting(1);
      generalAlgorithms.disableButtons(isSorting);

        const animations = sortingAlgorithms.getCocktailShakerSortAnimations(array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBarsF = document.getElementsByClassName('bar front color');
          const arrayBarsB = document.getElementsByClassName('bar back color');
          const arrayBarsL = document.getElementsByClassName('bar left color');
          const arrayBarsR = document.getElementsByClassName('bar right color');



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
                const [barOneIdx, barTwoIdx, b1height, b2height] = animations[i];


                if(b1height > b2height){

                  const animationsIndexSwap = [barTwoIdx, barOneIdx, b1height, b2height];
                  

                  generalAlgorithms.styleSwap( animationsIndexSwap, PRIMARY_COLOR);


                  }
                  else{
                    generalAlgorithms.styleSwap( animations[i], PRIMARY_COLOR);

                  }

              
                  
  

  
  
  
  
                  if(i == animations.length - 1){
                    generalAlgorithms.finishedSort();
                    setIsSorting(0);
      
                  }
              }
              
              , i * ANIMATION_SPEED_MS);
              
            }
            
          }

          
          // generalAlgorithms.finishedSort();

      
    }    

    function handleSliderChange(e){
        setArraySize(e.target.value);
        createArray();
    }

    function handleSliderChangeTime(e){
      setAnimationSpeed(e.target.value);
      createArray();
  }

    function handleOnClick(){

      updatePropState("home");

    }

  


 


  return (
    <>

    <div className="header">
      <h1 className='headerText'>Sorting Visualizer</h1>
      <button onClick={handleOnClick} className='bar-button'>Back To Home</button>
    </div>

    <div className="buttonBox">
        <button className="bar-button" id='sortbutton1' onClick={bubbleSort}> Bubble Sort</button>
        <button className="bar-button" id='sortbutton2' onClick={mergeSort}>Merge Sort</button>
        <button className="bar-button" id='sortbutton3'  onClick={insertionSort}>Insertion Sort</button>
        <button className="bar-button" id='sortbutton4'  onClick={selectionSort}>Selection Sort</button>
        <button className="bar-button" id='sortbutton5'  onClick={quickSort}>Quick Sort</button>
        <button className="bar-button" id='sortbutton6'  onClick={cocktailShakerSort}>Cocktail Shaker Sort</button>

        <button className="bar-button" id='sortbutton7' disabled={isSorting} onClick={createArray}>Generate Array</button>

    </div>

    <div className="array-container">
    {array.map((value, idx) => (
            <div height={value} key={idx} className="bar-container"> 

                <div className="bar top">

                
                    </div>

                    <div className="bar bottom">

                    </div>

                    

                    <div className="bar front" >
                        <div className="bar front color" style={{ height: `${(value/2)}vh`, transform: `translateY(${45-(value/2)}vh)` }}>
                        <p className='barvalue'>{value}</p>

                        </div>
                        
                    </div>

                    <div className="bar back" >
                        <div className="bar back color" style={{ height: `${value/2}vh`, transform: `translateY(${45-(value/2)}vh)` }}>

                        </div>
                    </div>

                    <div className="bar left">
                        <div className="bar left color" style={{ height: `${value/2}vh`, transform: `translateY(${45-(value/2)}vh)` }}>

                        </div>
                    </div>

                    <div className="bar right" style={{padding: '0px', margin: '0px'}}>
                        <div className="bar right color" style={{ height: `${value/2}vh`, transform: `translateY(${45-(value/2)}vh)` }}>

                        </div>  
                    </div>
            </div>
    ))}

    </div>
    <div className="sliderBox">
    <h3 className="sliderHeaders"> Size Of Array</h3>
    <Slider
        defaultValue={10}
        aria-labelledby="discrete-slider"
        aria-label='sliders'
        valueLabelDisplay="auto"
        step={1}
        marks
        min={5}
        max={20}
        onChange={handleSliderChange}
        className='sort-sliders'
        disabled={showSliders}
        id='sortbutton8' 
        ></Slider>

<h3 className="sliderHeaders"> Animation Speed</h3>

    <Slider
        defaultValue={200}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={50}
        marks
        min={50}
        max={400}
        onChange={handleSliderChangeTime}
        id='sortbutton9'
        disabled={showSliders}
        className='sort-sliders'

        ></Slider>
    </div>

    </>
  )
}

export default Sortingvisualizer