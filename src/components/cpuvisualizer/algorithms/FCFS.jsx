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


  export function fcfs(users, updateUserState, isRunning, updateRunningState) {
    const newClicked = true;
  
    if (newClicked) {

      updateRunningState(false);
      const auxillaryArray = users.slice();
      var timePassed = 0;

  
      auxillaryArray.sort((a, b) => a.arrival - b.arrival);

      for(var index = 0; index < auxillaryArray.length; index++) {
        let process = auxillaryArray[index];
        console.log("index", index);
        
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
          let x= calculateTAT(auxillaryArray);
          console.log("TAT", x);
          updateRunningState(true);
          return auxillaryArray;

        }

        
        

      };

      

     

      
      return auxillaryArray;
    }
  }


  function calculateTAT(users){
    var tat = 0;
    for(var i = 0; i < users.length; i++){
      if(users[i].id != 'idle'){
      tat += users[i].finish - users[i].arrival;
      }
    }
    return tat;

  }