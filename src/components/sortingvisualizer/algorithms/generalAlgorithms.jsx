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


                
                

                barOneStyle.height = `${(barOneH/2)}vh`;
                barOneStyleB.height = `${(barOneH/2)}vh`;
                barOneStyleL.height = `${(barOneH/2)}vh`;
                barOneStyleR.height = `${(barOneH/2)}vh`;
                barOneStyle.transform = `translateY(${45-(barOneH/2)}vh)`;

                barOneStyleB.transform = `translateY(${45-(barOneH/2)}vh)`;
                barOneStyleL.transform = `translateY(${45-(barOneH/2)}vh)`;
                barOneStyleR.transform = `translateY(${45-(barOneH/2)}vh)`;

                document.getElementsByClassName('barvalue')[barOneIdx].innerHTML = barOneH;

                // barTwoStyle = arrayBarsF[barTwoIdx].style;
                // barTwoStyleB = arrayBarsB[barTwoIdx].style;
                // barTwoStyleL = arrayBarsL[barTwoIdx].style;
                // barTwoStyleR = arrayBarsR[barTwoIdx].style;

                barTwoStyle.height = `${(barTwoH/2)}vh`;
                barTwoStyleB.height = `${(barTwoH/2)}vh`;
                barTwoStyleL.height = `${(barTwoH/2)}vh`;
                barTwoStyleR.height = `${(barTwoH/2)}vh`;
                barTwoStyle.transform = `translateY(${45-(barTwoH/2)}vh)`;
                barTwoStyleB.transform = `translateY(${45-(barTwoH/2)}vh)`;
                barTwoStyleL.transform = `translateY(${45-(barTwoH/2)}vh)`;
                barTwoStyleR.transform = `translateY(${45-(barTwoH/2)}vh)`;


                document.getElementsByClassName('barvalue')[barTwoIdx].innerHTML = barTwoH;
                

}

export function resetColors(){
    
        var arrayBarsF = document.getElementsByClassName('bar front color');
        var arrayBarsB = document.getElementsByClassName('bar back color');
        var arrayBarsL = document.getElementsByClassName('bar left color');
        var arrayBarsR = document.getElementsByClassName('bar right color');
        var arrayBarsBo = document.getElementsByClassName('bar bottom');

        for (let i = 0; i < arrayBarsF.length; i++) {
            arrayBarsF[i].style.backgroundColor = 'red';
            // arrayBarsF[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';

            arrayBarsB[i].style.backgroundColor = 'red';
            
            arrayBarsL[i].style.backgroundColor = 'red';
            arrayBarsR[i].style.backgroundColor = 'red';
            arrayBarsBo[i].style.backgroundColor = 'red';
            arrayBarsF[i].style.boxShadow = '5px 5px 50px 5px rgba(255, 0, 0, 0.2)';
            arrayBarsB[i].style.boxShadow = '5px 5px 50px 5px rgba(255, 0, 0, 0.2)';
            arrayBarsL[i].style.boxShadow = '5px 5px 50px 5px rgba(255, 0, 0, 0.2)';
            arrayBarsR[i].style.boxShadow = '5px 5px 50px 5px rgba(255, 0, 0, 0.2)';

        }
    
}


export function finishedSort(){

    var arrayBarsF = document.getElementsByClassName('bar front color');
    var arrayBarsB = document.getElementsByClassName('bar back color');
    var arrayBarsL = document.getElementsByClassName('bar left color');
    var arrayBarsR = document.getElementsByClassName('bar right color');
    var arrayBarsBo = document.getElementsByClassName('bar bottom');

    for (let i = 0; i < arrayBarsF.length; i++) {
        arrayBarsF[i].style.backgroundColor = 'green';
        arrayBarsB[i].style.backgroundColor = 'green';
        arrayBarsL[i].style.backgroundColor = 'green';
        arrayBarsR[i].style.backgroundColor = 'green';
        arrayBarsBo[i].style.backgroundColor = 'green';
        arrayBarsF[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';
        arrayBarsB[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';
        arrayBarsL[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';
        arrayBarsR[i].style.boxShadow = '5px 5px 50px 5px rgba(0, 255, 0, 0.2)';

    }

}

export function disableButtons(isSorting){
    document.getElementById('sortbutton1').setAttribute('disabled', 'disabled');
    document.getElementById('sortbutton2').setAttribute('disabled', 'disabled');
    document.getElementById('sortbutton3').setAttribute('disabled', 'disabled');
    document.getElementById('sortbutton4').setAttribute('disabled', 'disabled');
    document.getElementById('sortbutton5').setAttribute('disabled', 'disabled');
    document.getElementById('sortbutton6').setAttribute('disabled', 'disabled');
    document.getElementById('sortbutton7').setAttribute('disabled', 'disabled');
}

export function enableButtons(isSorting){

    document.getElementById('sortbutton1').removeAttribute('disabled');
    document.getElementById('sortbutton2').removeAttribute('disabled');
    document.getElementById('sortbutton3').removeAttribute('disabled');
    document.getElementById('sortbutton4').removeAttribute('disabled');
    document.getElementById('sortbutton5').removeAttribute('disabled');
    document.getElementById('sortbutton6').removeAttribute('disabled');
    document.getElementById('sortbutton7').removeAttribute('disabled');
    document.getElementById('sortbutton8').classList.replace( 'sort-sliders.Mui-disabled' ,'sort-sliders');

    isSorting = false;
}