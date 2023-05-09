



export function getSelectionSortAnimations(array){
  const animations = [];
  const auxiliaryArray = array.slice();

  if (array.length <= 1) return array;

  for (let i = 0; i < auxiliaryArray.length - 1; i++) {
    let min_idx = i;





    for (let j = i+1; j < auxiliaryArray.length; j++) {
      // push indices of the elements being compared
      

      if (auxiliaryArray[j] < auxiliaryArray[min_idx]) {
        min_idx = j;
      }

    }

    for (let k=i; k <= min_idx; k++) {
      // push indices of the elements being compared
      animations.push([i, k]);


    }


    
    // push indices of the elements being compared
    
    // push indices and values of the elements being swapped

    animations.push([i, min_idx, auxiliaryArray[i] ,auxiliaryArray[min_idx], false]);
    animations.push([i, min_idx, auxiliaryArray[i] ,auxiliaryArray[min_idx], true]);
    let temp = auxiliaryArray[min_idx];
    auxiliaryArray[min_idx] = auxiliaryArray[i];
    auxiliaryArray[i] = temp;
    

  }

  return animations;
  
}

export function getQuickSortAnimations(array){

  const animations = [];
  const auxiliaryArray = array.slice();

  if (array.length <= 1) return array;

  quickSortHelper(auxiliaryArray, 0, auxiliaryArray.length - 1, animations);


  return animations;


}

export function quickSortHelper(array, low, high, animations) {
  if (low < high) {
    let pi = partition(array, low, high, animations);
    quickSortHelper(array, low, pi - 1, animations);
    quickSortHelper(array, pi + 1, high, animations);
  }
}


export function partition(array, low, high, animations){

  let pivot = array[high];

  let i = (low - 1);

  for (let j = low; j <= high - 1; j++) {

    animations.push([high, false]);

    
  

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      animations.push([i, j, array[i] ,array[j], false]);
      animations.push([i, j, array[i] ,array[j], true]);
    }
  }

  [array[i+1], array[high]] = [array[high], array[i+1]];

  animations.push([(i+1), high, array[i+1] ,array[high], false]);
  animations.push([(i+1), high, array[i+1] ,array[high], true]);

  return (i + 1);

}

export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  
  for (let i = 1; i < auxiliaryArray.length; i++) {
    let key = auxiliaryArray[i];
    let j = i - 1;
    // push indices of the elements being compared
    animations.push([j, i]);
    while (j >= 0 && auxiliaryArray[j] > key) {
      // push indices and values of the elements being swapped

      [auxiliaryArray[j], auxiliaryArray[j+1]] = [auxiliaryArray[j+1], auxiliaryArray[j]];
      animations.push([j, j+1, auxiliaryArray[j] ,auxiliaryArray[j+1], false]);
      animations.push([j, j+1, auxiliaryArray[j] ,auxiliaryArray[j+1], true]);

      


      j = j - 1;
    }
    auxiliaryArray[j+1] = key;
  }



  return animations;



}

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // push indices of the elements being compared
      animations.push([j, j+1]);
      animations.push([j, j+1]);


      if (auxiliaryArray[j] > auxiliaryArray[j+1]) {
        // push indices and values of the elements being swapped
        animations.push([j, j+1, auxiliaryArray[j] ,auxiliaryArray[j+1]]);
        let temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j+1];
        auxiliaryArray[j+1] = temp;
      }

      else{
        // push indices and values of the elements being swapped
        animations.push([j, j+1, auxiliaryArray[j] ,auxiliaryArray[j+1]]);
      }
    }
  }
  return animations;
}



export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  const currentArray = array.slice();
  mergeSortHelper(currentArray, 0, currentArray.length - 1, auxiliaryArray, animations);
  
  return animations;
}


function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  console.log("array", mainArray);
  console.log('auxiliaryArray', auxiliaryArray);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, middleIdx]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, middleIdx]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, endIdx]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, endIdx]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }

}

export function getCocktailShakerSortAnimations(array){
  let animations = [];
  const auxiliaryArray = array.slice();
  let n = array.length;
  let swapped = true;
  let start = 0;
  let end = n - 1;

  while(swapped){
    swapped = false;

    for(let i = start; i < end; i++){

      animations.push([i, i+1]);
      animations.push([i, i+1]);

      if(auxiliaryArray[i] > auxiliaryArray[i+1]){
        animations.push([i, i+1, auxiliaryArray[i], auxiliaryArray[i+1]]);
        [auxiliaryArray[i], auxiliaryArray[i+1]] = [auxiliaryArray[i+1], auxiliaryArray[i]];
        swapped = true;
      }
      else{
        animations.push([i, i+1, auxiliaryArray[i], auxiliaryArray[i+1]]);
      }
    }

    if(!swapped){

      break;
    }

    swapped = false;

    end = end - 1;

    for(let i = end - 1; i >= start; i--){
      animations.push([i, i+1]);
      animations.push([i, i+1]);

      if(auxiliaryArray[i] > auxiliaryArray[i+1]){
        animations.push([i, i+1, auxiliaryArray[i], auxiliaryArray[i+1]]);
        [auxiliaryArray[i], auxiliaryArray[i+1]] = [auxiliaryArray[i+1], auxiliaryArray[i]];
        swapped = true;
      }
      else{
        animations.push([i, i+1, auxiliaryArray[i], auxiliaryArray[i+1]]);
      }
    }

    start = start + 1;
  }

  return animations;

}