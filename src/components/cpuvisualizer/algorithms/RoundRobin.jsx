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
  
  


  
  
  export function roundRobinScheduling(processes, timeQuantum, updateUserState, isRunning, updateRunningState) {
    let n = processes.length;
    const untouchedProcesses = [...processes];
    const queue = [...processes];
    const ganttChart = [];
    let currentTime = 0;
    let process = null;
    let queue2 = [];

  
    while (n > 0) {

      process = queue2.shift();


      console.log("process", process);
      console.log("currentTime", currentTime);

      


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
                console.log("queue", p);
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
              console.log("queue", queue[i], currentTime);

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
    let x = calculateTAT(untouchedProcesses);
    console.log("tat",x);
    updateRunningState(true);
    clearTable(processes, updateUserState);
    return ganttChart;
  }

  

  function calculateTAT(ganttChart){
    let tat = 0;
    for (let i = 0; i < ganttChart.length; i++) {
      tat += ganttChart[i].finish - ganttChart[i].arrival;
    }
    return tat;
  }
  
  
  
  