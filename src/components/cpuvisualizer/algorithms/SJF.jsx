const INITIAL_STATE = [
    {id:'P0', arrival: null, burst: null, priority: null},
    {id:'P1', arrival: null, burst: null, priority: null} 


]

const INITIAL_INFO_STATE = [
  {id:'P0', arrival: null, burst: null, priority: null, finish: null, waitingTime: null, turnaroundTime: null},
  {id:'P1', arrival: null, burst: null, priority: null, finish: null, waitingTime: null, turnaroundTime: null}
]
var localArray = [];

function clearTable(users, updateUserState) {
    updateUserState(INITIAL_STATE);
    const input1 = document.getElementsByClassName("table-input1")
    const input2 = document.getElementsByClassName("table-input2")
    const input3 = document.getElementsByClassName("table-input3")

    for (let i = 0; i < input1.length; i++) {
      input1[i].value = "";
      input2[i].value = "";
      input3[i].value = "";
    }

  };

  export function sjrfScheduling(users, isRunning, updateUserState, updateRunningState) {
    localArray = [];
    var initialBurstTimes = users.map((process) => process.burst);
    let processes = [...users];
    let untouchedProcesses = [...users];
    processes = processes.sort((a, b) => a.arrival - b.arrival || a.burst - b.burst);
    const ganttChart = [];
  
    if (processes[0].arrival !== null || processes[0].burst !== null) {
  
      let currentTime = 0;
      let completedProcesses = 0;

      if(processes[0].arrival!=0){
        const idleProcess = {
          id: 'idle',
          arrival: 0,
          burst: processes[0].arrival,
          start: 0,
          finish: processes[0].arrival,
          priority: null
        };
        currentTime = processes[0].arrival;
        ganttChart.push(idleProcess);
      }
  
      while (completedProcesses < processes.length) {
        let nextProcess = null;
        let shortestTime = Infinity;
  
        for (let i = 0; i < processes.length; i++) {
          if (
            +processes[i].arrival <= currentTime &&
            +processes[i].burst < shortestTime &&
            +processes[i].burst > 0
          ) {
            nextProcess = processes[i];
            shortestTime = processes[i].burst;
          }
        }
  
        if (nextProcess === null) {
          ganttChart.push({ id: "idle", arrival: currentTime, burst: 1, start: currentTime, finish: currentTime });
          currentTime++;

          continue;
        }
  
        ganttChart.push({ id: nextProcess.id, arrival: currentTime, burst: 1, start: currentTime, finish: currentTime });
  
        nextProcess.burst--;
        currentTime++;
  
        if (nextProcess.burst === 0) {
          untouchedProcesses.forEach((process) => {
            if (process.id === nextProcess.id) {
              process.finish = currentTime;
            }
          });
          completedProcesses++;
        }
      }

      if(completedProcesses === processes.length){
        
        for(let i=0; i<ganttChart.length; i++){
          let k=0;
          if(i<ganttChart.length-1){

            if(ganttChart[i].id === ganttChart[i+1].id){
              for(let j=i+1; j<ganttChart.length; j++){
                if(ganttChart[j].id === ganttChart[i].id){
                  k++;
                  ganttChart[i].burst = ganttChart[i].burst + ganttChart[j].burst;

                }
                else{
                  break;
                }
              }

              ganttChart[i].finish = ganttChart[i].finish + ganttChart[i].burst;
              

              ganttChart.splice(i+1, k);

            }
          }

          if(i===ganttChart.length-1){
          
            ganttChart[i].last = true;
          }
        }


        calculateInfo(untouchedProcesses, initialBurstTimes);
        updateRunningState(true);
        clearTable(users, updateUserState);
        return ganttChart;

      }
     
    }

  

    
  }


  export function sjf(users, updateUserState, isRunning, updateRunningState) {

    localArray = [];
    let initialBurstTimes = users.map((process) => process.burst);

    var auxillaryArray = users.slice();
    auxillaryArray = auxillaryArray.filter((process) => process.arrival !== null || process.burst !== null);
    auxillaryArray = auxillaryArray.sort((a, b) => a.arrival - b.arrival || a.burst - b.burst);
    console.log("auxillaryArray", auxillaryArray);
    let timePassed = 0;

    for(var index = 0; index < auxillaryArray.length; index++) {
      let process = auxillaryArray[index];
      if(index==0 && process.arrival==0){
        const processTemp ={
          id: process.id,
          arrival: process.arrival,
          burst: process.burst,
          start: +process.arrival,
          finish: +process.burst,
        }

        auxillaryArray.splice(index, 1, processTemp);
      
      }

      if(index==0 && process.arrival!=0){
        const idleProcess = {
          id: 'idle',
          arrival: 0,
          burst: process.arrival,
          start: 0,
          finish: process.arrival,
          priority: null
        };
        auxillaryArray.unshift(idleProcess);
      }

      if (index > 0) {
        const previousProcess = auxillaryArray[index - 1];
        console.log("previousProcess", previousProcess);
        const processTime = +previousProcess.arrival + +previousProcess.burst;
        var initialArrival = +auxillaryArray[0].arrival;
        timePassed += +previousProcess.burst ;
        const idleTime = +process.arrival - (timePassed + initialArrival);
        console.log(processTime, previousProcess.arrival, previousProcess.burst);
        if (idleTime > 0) {
          const idleProcess = {
            id: 'idle',
            arrival: timePassed + initialArrival,
            burst: idleTime,
            start: +timePassed + +initialArrival,
            finish: +timePassed + +initialArrival + +idleTime,
            priority: null
          };
          auxillaryArray.splice(index, 0, idleProcess);
        }
        else{
          

          if(index == auxillaryArray.length-1){
            
            const processTemp ={
              id: process.id,
              arrival: process.arrival,
              burst: process.burst,
              start: +timePassed + +initialArrival,
              finish: +timePassed + +initialArrival + +process.burst,
              last: true
            }

            auxillaryArray.splice(index, 1, processTemp);
          
          }
          else{
            const processTemp ={
              id: process.id,
              arrival: process.arrival,
              burst: process.burst,
              start: +timePassed + +initialArrival,
              finish: +timePassed + +initialArrival + +process.burst,
            }
            auxillaryArray.splice(index, 1, processTemp);

          }
        }

      
      if(index==0 && process.arrival==0){                
          const processTemp ={
            id: process.id,
            arrival: process.arrival,
            burst: process.burst,
            start: +process.arrival,
            finish: +process.burst,
          }

          auxillaryArray.splice(index, 1, processTemp);
        
        }

      }

      if(index==auxillaryArray.length-1){
        clearTable(users, updateUserState);
        calculateInfo(auxillaryArray, initialBurstTimes);
        updateRunningState(true);
        return auxillaryArray;

      }

      
      

    };

    
    return auxillaryArray;
  }

    

    function calculateInfo(ganttChart, burstTimes){
      let totalTat = 0;
      let totalWt = 0;
      let j=0;

      for (let i = 0; i < ganttChart.length; i++) {
        if(ganttChart[i].id !== 'idle'){
        ganttChart[i].tat = +(ganttChart[i].finish) - +(ganttChart[i].arrival);
        totalTat += ganttChart[i].tat;
        ganttChart[i].burst = +burstTimes[j];
        console.log("burst", burstTimes[j])
        ganttChart[i].wt = (ganttChart[i].tat) - +(ganttChart[i].burst);
        totalWt += ganttChart[i].wt;
        j++;
        
  
        localArray.push(ganttChart[i]);
        }
      }
  
      const avgTat =  totalTat / j;
      const avgWt = totalWt /j;
      let avgTatRounded = Math.round(avgTat * 100.0) / 100.0;
      let avgWtRounded = Math.round(avgWt * 100.0) / 100.0;
  
  
      localArray.push({id: "Total", tat: totalTat, wt: totalWt, priority: " "})
      localArray.push({id: "Avg", tat: avgTatRounded, wt: avgWtRounded, priority: " "})
  
      console.log("localArray", localArray);
    }
  
  
    export function getLocalArray(){
      return localArray;
    }