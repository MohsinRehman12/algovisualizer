const INITIAL_STATE = [
    {id:'P0', arrival: null, burst: null, priority: null},
    {id:'P1', arrival: null, burst: null, priority: null} 


]
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

export function priorityScheduling(users, isRunning, updateUserState) {
    isRunning=true;
    console.log("priorityScheduling called");
    let processes = [...users];
    console.log("users", users);
    const ganttChart = [];
    const combinedProcesses = {};
  
    if (processes[0].arrival !== null || processes[0].burst !== null || processes[0].priority !== null) {
      processes.sort((a, b) => a.arrival - b.arrival || a.priority - b.priority);
  
      let currentTime = 0;
      let completedProcesses = 0;
  
      while (completedProcesses < processes.length) {
        let nextProcess = null;
        let highestPriority = Infinity;
  
        for (let i = 0; i < processes.length; i++) {
          if (
            processes[i].arrival <= currentTime &&
            processes[i].priority < highestPriority &&
            processes[i].burst > 0
          ) {
            nextProcess = processes[i];
            highestPriority = processes[i].priority;
          }
        }
  
        if (nextProcess === null) {
          ganttChart.push({ id: "idle", arrival: currentTime, burst: 1, start: currentTime, finish: currentTime, priority: Infinity });
          currentTime++;
          continue;
        }
  
        // Combine processes with the same PID
        if (combinedProcesses[nextProcess.id]) {
          combinedProcesses[nextProcess.id].burst += nextProcess.burst;
        } else {
          combinedProcesses[nextProcess.id] = { ...nextProcess };
        }
  
        ganttChart.push({ id: nextProcess.id, arrival: currentTime, burst: 1, start: currentTime, finish: currentTime, priority: nextProcess.priority });
  
        nextProcess.burst--;
        currentTime++;
  
        if (nextProcess.burst === 0) {
          completedProcesses++;
        }
      }
  
      // Convert combined processes back to an array
  
      if (completedProcesses === processes.length) {
        
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
        isRunning=false;
        clearTable(users, updateUserState);
        return ganttChart;
        
      }
    }
  }

  
  