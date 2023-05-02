// export function mergeSort(arr, l, r) {
//     if (l >= r) return arr;
  
//     const m = l + Math.floor((r - l) / 2);
//     mergeSort(arr, l, m);
//     mergeSort(arr, m + 1, r);
//     merge(arr, l, m, r);
  
//     return arr;
//   }
  
//   export function merge(arr, l, m, r) {
//     var n1 = m - l + 1;
//     var n2 = r - m;
  
//     var L = new Array(n1);
//     var R = new Array(n2);
  
//     for (var i = 0; i < n1; i++) {
//       L[i] = arr[l + i];
//     }
  
//     for (var j = 0; j < n2; j++) {
//       R[j] = arr[m + 1 + j];
//     }
  
//     i = 0;
//     j = 0;
//     var k = l;
  
//     while (i < n1 && j < n2) {
//       if (L[i] <= R[j]) {
//         arr[k] = L[i];
//         i++;
//       } else {
//         arr[k] = R[j];
//         j++;
//       }
//       k++;
//     }
  
//     while (i < n1) {
//       arr[k] = L[i];
//       i++;
//       k++;
//     }
  
//     while (j < n2) {
//       arr[k] = R[j];
//       j++;
//       k++;
//     }
//   }


export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
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
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}