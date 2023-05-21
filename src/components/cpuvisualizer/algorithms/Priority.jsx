const INITIAL_STATE = [
    {id:'P0', arrival: null, burst: null, priority: null},
    {id:'P1', arrival: null, burst: null, priority: null} 


]

let localArray = [];

function clearTable(users, updateUserState, isRunning, updateRunningState) {
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



  function calculateInfo(ganttChart, burstTimes){
    let totalTat = 0;
    let totalWt = 0;
    let j = 0;
    for (let i = 0; i < ganttChart.length; i++) {
      if(ganttChart[i].id !== "idle"){
      ganttChart[i].tat = +(ganttChart[i].finish) - +(ganttChart[i].arrival);
      totalTat += ganttChart[i].tat;
      ganttChart[i].burst = +burstTimes[j];
      console.log("burst", burstTimes[j])
      ganttChart[i].wt = (ganttChart[i].tat) - +(ganttChart[i].burst);
      totalWt += ganttChart[i].wt;
      

      localArray.push(ganttChart[i]);
      j++;
      }
    }

    const avgTat =  totalTat / j;
    const avgWt = totalWt / j;
    let avgTatRounded = Math.round(avgTat * 100.0) / 100.0;
    let avgWtRounded = Math.round(avgWt * 100.0) / 100.0;


    localArray.push({id: "Total", tat: totalTat, wt: totalWt, priority: " "})
    localArray.push({id: "Avg", tat: avgTatRounded, wt: avgWtRounded, priority: " "})

    console.log("localArray", localArray);
  }


  export function getLocalArray(){
    return localArray;
  }


  export function priorityScheduling(users, isRunning, updateUserState, updateRunningState) {
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
        let lowestPriority = Infinity;
  
        for (let i = 0; i < processes.length; i++) {
          if (
            +processes[i].arrival <= currentTime &&
            +processes[i].priority < lowestPriority &&
            +processes[i].burst > 0
          ) {
            nextProcess = processes[i];
            lowestPriority = processes[i].priority;
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
  