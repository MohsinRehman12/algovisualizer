export function styleSwap( animationsIndex, PRIMARY_COLOR){

                const animations = animationsIndex;
                const [barOneIdx, barTwoIdx, barOneH, barTwoH, swap] = animations;

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

export function resetColors(){
    
        var arrayBarsF = document.getElementsByClassName('bar front color');
        var arrayBarsB = document.getElementsByClassName('bar back color');
        var arrayBarsL = document.getElementsByClassName('bar left color');
        var arrayBarsR = document.getElementsByClassName('bar right color');
    
        for (let i = 0; i < arrayBarsF.length; i++) {
            arrayBarsF[i].style.backgroundColor = 'red';
            // arrayBarsF[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';

            arrayBarsB[i].style.backgroundColor = 'red';
            
            arrayBarsL[i].style.backgroundColor = 'red';
            arrayBarsR[i].style.backgroundColor = 'red';


        }
    
}

export function finishedSort(){

    var arrayBarsF = document.getElementsByClassName('bar front color');
    var arrayBarsB = document.getElementsByClassName('bar back color');
    var arrayBarsL = document.getElementsByClassName('bar left color');
    var arrayBarsR = document.getElementsByClassName('bar right color');

    for (let i = 0; i < arrayBarsF.length; i++) {
        arrayBarsF[i].style.backgroundColor = 'green';
        arrayBarsB[i].style.backgroundColor = 'green';
        arrayBarsL[i].style.backgroundColor = 'green';
        arrayBarsR[i].style.backgroundColor = 'green';
        arrayBarsF[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';
        arrayBarsB[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';
        arrayBarsL[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';
        arrayBarsR[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';

    }

}