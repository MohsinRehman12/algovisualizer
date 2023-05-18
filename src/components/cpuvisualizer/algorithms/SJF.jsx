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

  export function sjrfScheduling(users, isRunning, updateUserState) {
    console.log("sjrfScheduling called");
    let processes = [...users];
    console.log("users", users);
    const ganttChart = [];
  
    if (processes[0].arrival !== null || processes[0].burst !== null) {
      processes.sort((a, b) => a.arrival - b.arrival || a.burst - b.burst);
  
      let currentTime = 0;
      let completedProcesses = 0;
  
      while (completedProcesses < processes.length) {
        let nextProcess = null;
        let shortestTime = Infinity;
  
        for (let i = 0; i < processes.length; i++) {
          if (
            processes[i].arrival <= currentTime &&
            processes[i].burst < shortestTime &&
            processes[i].burst > 0
          ) {
            nextProcess = processes[i];
            shortestTime = processes[i].burst;
          }
        }
  
        if (nextProcess === null) {
          currentTime++;
          ganttChart.push({ id: "idle", arrival: currentTime, burst: 1 });
          continue;
        }
  
        ganttChart.push({ id: nextProcess.id, arrival: currentTime, burst: 1 });
  
        nextProcess.burst--;
        currentTime++;
  
        if (nextProcess.burst === 0) {
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
              ganttChart.splice(i+1, k);

            }
          }
        }

        clearTable(users, updateUserState);
        return ganttChart;

      }
     
    }

  

    
  }
  

  export function sjf(users, updateUserState) {
    
      var auxillaryArray = users.slice();
      var auxillaryArray2 = users.slice(1);
      
      auxillaryArray.sort((a, b) => a.arrival - b.arrival);

      auxillaryArray.sort((a, b) => a.arrival - b.arrival);
      var auxillaryArray3 = auxillaryArray.slice(0, 1);
      auxillaryArray2.sort((a, b) => a.burst - b.burst);

      if(+auxillaryArray3[0].arrival >= +auxillaryArray2[0].arrival){
        if(+auxillaryArray3[0].burst > +auxillaryArray2[0].burst){
          auxillaryArray3.unshift(auxillaryArray2[0]);
          auxillaryArray2.splice(0, 1);
        }
      }

  
      auxillaryArray = auxillaryArray3.concat(auxillaryArray2);
      auxillaryArray = auxillaryArray.filter((process) => process.arrival !== null || process.burst !== null);
      console.log("auxillaryArray", auxillaryArray);
      let currentTime = 0;
      
      
      auxillaryArray.forEach((process, index) => {
        if (index > 0) {


          var initialArrival = +auxillaryArray[0].arrival;
          currentTime += +auxillaryArray[index - 1].burst;

          const idleTime = +process.arrival - (currentTime + initialArrival);
          if (idleTime > 0) {
            const idleProcess = {
              id: 'idle',
              arrival: currentTime + initialArrival,
              burst: idleTime,
              priority: null
            };
            auxillaryArray.splice(index, 0, idleProcess);
          }
        }
      });

  
      return auxillaryArray;
    }