const INITIAL_STATE = [
    {id:'P0', arrival: null, burst: null, priority: null},
    {id:'P1', arrival: null, burst: null, priority: null} 


]
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


  export function roundRobinScheduling2( processes, timeQuantum, updateUserState){
    let n = processes.length;
    const queue = [...processes];
    queue.sort((a, b) => a.arrival - b.arrival);
    const ganttChart = [];
    let currentTime = 0;
    let process = null;
    let completedProcess=0;
  
    while (completedProcess<n) {

      if(process===null){
        const nextArrival = Math.min(...queue.filter(p => !p.completed && p.arrival !== null).map(p => p.arrival));
        currentTime=nextArrival;

        const idleTime = nextArrival - currentTime;
        currentTime += idleTime;
        ganttChart.push({
          id: 'idle',
          start: currentTime - idleTime,
          finish: currentTime,
          burst: idleTime,
          priority: Infinity
        });



        process = queue.shift();
        continue;
      }

      if(process.arrival <= currentTime){
        const executionTime = Math.min(timeQuantum, process.burst);
        process.burst -= executionTime;
        currentTime += executionTime;
  
        // Add the process to the Gantt chart
        ganttChart.push({
          id: process.id,
          start: currentTime - executionTime,
          finish: currentTime,
          arrival: process.arrival,
          burst: executionTime,
          priority: process.priority
        });
  
        // Check if the process has finished
        if (process.burst <= 0) {
          process.completed = true;
          n--;
        }
  
        // Add the process back to the queue if it still has burst time remaining
        if (!process.completed) {
          queue.push(process);
        }
      }

    }
    clearTable(processes, updateUserState);
    return ganttChart;
  }

  
  


  export function calculateTAT(ganttChart){
    let tat = 0;
    for (let i = 0; i < ganttChart.length; i++) {
      tat += ganttChart[i].finish - ganttChart[i].arrival;
    }
    tat /= ganttChart.length;
    return tat;
  }
  
  export function roundRobinScheduling(processes, timeQuantum, updateUserState) {
    let n = processes.length;
    const queue = [...processes];
    const ganttChart = [];
    let currentTime = 0;
    let process = null;
  
    while (n > 0) {
      process = queue.shift();
  
      if (process.arrival <= currentTime) {
        // No processes in the queue, check if all processes are completed
        const allCompleted = processes.every((p) => p.completed);
  
        // Find the next process arrival time
        const nextArrival = Math.min(...processes.filter((p) => !p.completed).map((p) => p.arrival));
        
  
        // Execute the process for the time quantum or until it finishes
        const executionTime = Math.min(timeQuantum, process.burst);
        process.burst -= executionTime;
        currentTime += executionTime;
  
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
          process.completed = true;
          n--;
        }
  
        // Add the process back to the queue if it still has burst time remaining
        if (!process.completed) {
          queue.push(process);
        }
      }

      else{

        const allCompleted = processes.every((p) => p.completed);
        const nextArrival = Math.min(...processes.filter((p) => !p.completed).map((p) => p.arrival));
        if (nextArrival !== null && !allCompleted && nextArrival > currentTime) {
          const idleTime = nextArrival - currentTime;
          if (idleTime > 0) {
            currentTime += idleTime;
            ganttChart.push({
              id: 'idle',
              start: currentTime - idleTime,
              finish: currentTime,
              burst: idleTime,
              priority: Infinity
            });
          }
        }
        queue.push(process);
        currentTime++;
      }
    }
  
    clearTable(processes, updateUserState);
    return ganttChart;
  }
  
  
  
  