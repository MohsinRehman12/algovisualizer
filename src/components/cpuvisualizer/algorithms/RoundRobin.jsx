const INITIAL_STATE = [
    {id:'P0', arrival: null, burst: null, priority: null},
    {id:'P1', arrival: null, burst: null, priority: null} 


]

const localArray = [];

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
  
  


  
  
  export function roundRobinScheduling(processes, timeQuantum, updateUserState, isRunning, updateRunningState) {
    let n = processes.length;
    const initialBurstTimes = processes.map((p) => p.burst);
    console.log("initialBurstTimes", initialBurstTimes);
    const untouchedProcesses = processes.slice();
    const queue = processes.slice();
    const ganttChart = [];
    let currentTime = 0;
    let process = null;
    let queue2 = [];

  
    while (n > 0) {

      process = queue2.shift();



      


      if(process==null){

        const allCompleted = processes.every((p) => p.completed);
        const nextArrival = Math.min(...processes.filter((p) => !p.completed).map((p) => p.arrival));
        if (nextArrival !== Infinity && !allCompleted && nextArrival > currentTime) {
          const idleTime = nextArrival - currentTime;
          if (idleTime > 0) {
            currentTime += idleTime;
            queue.forEach((p) => {
              if (p.arrival <= currentTime && !p.completed) {
                queue2.push(p);
              }
            });

            ganttChart.push({
              id: 'idle',
              start: currentTime - idleTime,
              finish: currentTime,
              burst: idleTime,
              priority: Infinity
            });
          }
        }

      }

  
      else {
        // No processes in the queue, check if all processes are completed
        const allCompleted = processes.every((p) => p.completed);
  
        // Find the next process arrival time
        const nextArrival = Math.min(...processes.filter((p) => !p.completed).map((p) => p.arrival));
        
  
        // Execute the process for the time quantum or until it finishes
        const executionTime = Math.min(timeQuantum, process.burst);
        currentTime += executionTime;


        for (let i = 0; i < queue.length; i++) {
          

          if(queue[i].arrival<=currentTime && !queue[i].completed){
            let check = true;
            for(let j=0; j<queue2.length; j++){
              if(queue2[j].id==queue[i].id){
                check = false;
              }
            }
            if(check && queue[i].id!=process.id){
              queue2.push(queue[i]);

            }
        }
      }
        process.burst -= executionTime;

  
        // Add the process to the Gantt chart

        if(process.burst==0 && n==1){
          ganttChart.push({
            id: process.id,
            start: currentTime - executionTime,
            finish: currentTime,
            arrival: process.arrival,
            burst: executionTime,
            priority: process.priority,
            last : true,
          });

          



        }
        else{
          ganttChart.push({
            id: process.id,
            start: currentTime - executionTime,
            finish: currentTime,
            arrival: process.arrival,
            burst: executionTime,
            priority: process.priority
          });
          


        }
        
  
        // Check if the process has finished
        if (process.burst <= 0) {
          untouchedProcesses.find((p) => p.id === process.id).finish = process.finish = currentTime;
          process.completed = true;
          n--;
        }
  
        // Add the process back to the queue if it still has burst time remaining
        if (!process.completed) {
          queue2.push(process);
          
        }
        

      }

    }
    updateRunningState(true);
    calculateInfo(untouchedProcesses, initialBurstTimes);
    clearTable(processes, updateUserState);
    return ganttChart;
  }

  

  function calculateInfo(ganttChart, burstTimes){
    let totalTat = 0;
    let totalWt = 0;
    for (let i = 0; i < ganttChart.length; i++) {
      ganttChart[i].tat = +(ganttChart[i].finish) - +(ganttChart[i].arrival);
      totalTat += ganttChart[i].tat;
      ganttChart[i].burst = +burstTimes[i];
      console.log("burst", burstTimes[i])
      ganttChart[i].wt = (ganttChart[i].tat) - +(ganttChart[i].burst);
      totalWt += ganttChart[i].wt;
      

      localArray.push(ganttChart[i]);
    }

    const avgTat =  totalTat / ganttChart.length;
    const avgWt = totalWt / ganttChart.length;

    localArray.push({id: "Total", tat: totalTat, wt: totalWt})
    localArray.push({id: "Avg", tat: avgTat, wt: avgWt})

    console.log("localArray", localArray);
  }


  export function getLocalArray(){
    return localArray;
  }
  
  
  
  