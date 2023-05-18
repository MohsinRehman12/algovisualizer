import React, { useEffect } from 'react'
import { useState } from 'react'

import './scheduling.css'
function SchedulingVisualizer() {

    const [array2, setArray2] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [order, setOrder] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isEmptied, setIsEmptied] = useState(true);



    const INITIAL_STATE = [
        {id:'P0', arrival: null, burst: null, priority: null},
        {id:'P1', arrival: null, burst: null, priority: null} 
 

    ]

    const [users, setUsers] = useState(INITIAL_STATE);
    
    const renderUsers = () => {
        return users.map(({id, arrival, burst, priority }) => {
        
          return <tr key={id} >
          <td style={{ padding: '10px', border: '1px solid white' }}>
            {id}          
          </td>
          <td style={{ padding: '10px', border: '1px solid white' }}>
          <input type='number'
            className='table-input1'
            onChange={(e) => setUsers(users.map(user => user.id === id ? {...user, arrival: e.target.value} : user))}
            id='tableInput1'
          ></input> 

          </td>
          <td style={{ padding: '10px', border: '1px solid white' }}>
          <input type='number'
            onChange={(e) => setUsers(users.map(user => user.id === id ? {...user, burst: e.target.value} : user))}
            id='tableInput2'
            className='table-input2'


          ></input> 

          </td>
          <td style={{ padding: '10px', border: '1px solid white' }}>
          <input type='number'
            onChange={(e) => setUsers(users.map(user => user.id === id ? {...user, priority: e.target.value} : user))}
            id='tableInput3'
            className='table-input3'

          ></input> 

          </td>
        </tr>
        })
      }

      const renderHeader = () => {
        return <tr>
          {Object.keys(INITIAL_STATE[0]).map(key => <th>{key}</th>)}
        </tr>
      }

      const renderTable = () => {
        return (
          <table className='processTable'>
            {renderHeader()}
            <tbody>
              {renderUsers()}
            </tbody>
          </table>
        )
    }

    function addRow() {
        setUsers([...users, {id:`P${users.length}`, arrival: null, burst: null, priority: null}]);
    }

    function deleteRow() {
        if(users.length > 1) {
            setUsers(users.slice(0, -1));
        }
    }

    

    


    function fcfs() {
      setArray2([]);
      const newClicked = true;
      setClicked(newClicked);
    
      if (newClicked) {
        const auxillaryArray = users.slice();
        var timePassed = 0;

    
        auxillaryArray.sort((a, b) => a.arrival - b.arrival);

        auxillaryArray.forEach((process, index) => {
          if (index > 0) {
            const previousProcess = auxillaryArray[index - 1];
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
                priority: null
              };
              auxillaryArray.splice(index, 0, idleProcess);
            }
          }
        });
    
        setArray2(auxillaryArray);
      }
    }
    


    function sjf() {
      const newClicked = true;
      setClicked(newClicked);
    
      if (newClicked) {
        var auxillaryArray = users.slice();
        var auxillaryArray2 = users.slice(1);
        var auxillaryArray3 = auxillaryArray.slice(0, 1);
        
        auxillaryArray.sort((a, b) => a.arrival - b.arrival);

        auxillaryArray.sort((a, b) => a.arrival - b.arrival);
        auxillaryArray2.sort((a, b) => a.burst - b.burst);
    
        auxillaryArray = auxillaryArray3.concat(auxillaryArray2);
        auxillaryArray = auxillaryArray.filter((process) => process.arrival !== null || process.burst !== null);
        console.log("aaaa",auxillaryArray);
    
        let currentTime = 0;
        
        
        auxillaryArray.forEach((process, index) => {
          if (index > 0) {

            let preempt=false;
            const previousProcess = auxillaryArray[index - 1];

            var initialArrival = +auxillaryArray[0].arrival;

            currentTime = currentTime+ +previousProcess.burst;


            

            var auxillaryArray5 = users.slice(index);
            var auxillaryArray6 = auxillaryArray5.filter((process) => process.burst <= (currentTime+initialArrival));

            console.log("bbbb", auxillaryArray6);
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

    
        setArray2(auxillaryArray);
      }
    }

    
    

    
    

    function sjrfScheduling() {
      setIsRunning(true);
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

          setIsRunning(false);
          setArray2(ganttChart);
          clearTable();
        }
       
      }

    

      
    }

    

    useEffect(() => {
      console.log("running", isRunning);
    }, [isRunning]);

    const clearTable = () => {
      setUsers(INITIAL_STATE);
      const input1 = document.getElementsByClassName("table-input1")
      const input2 = document.getElementsByClassName("table-input2")
      const input3 = document.getElementsByClassName("table-input3")

      for (let i = 0; i < input1.length; i++) {
        input1[i].value = "";
        input2[i].value = "";
        input3[i].value = "";
      }

    };
    
    
    
    
    
    
    function isTableFilled() {
      const inputs = document.getElementsByClassName('table-input1');
      const inputs2 = document.getElementsByClassName('table-input2');

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '' || inputs2[i].value === '') {
          return false;
        }
      }
      return true;  
    }

    useEffect(() => {
      setIsEmptied(!isTableFilled());
    }, [users]);
    
    

  const returnArray = (arrayA) => {
  
    return (
      <div className="testBox">
        {arrayA.map((process, index) => (
          <div
            key={index}
            className="test"
            style={{ flex: `${process.burst} 0 0` }}
          >
            {process.id}
            <div className="underText"></div>
          </div>
        ))}
      </div>
    );
  };
  

  
    

  return (
    <>
    {renderTable()}

    <button onClick={addRow}> + </button>
    <button onClick={deleteRow}> - </button>
    <button onClick={fcfs} disabled={isEmptied}> FCFS </button>
    <button onClick={sjf} disabled={isEmptied}> SJF </button>
    <button onClick={sjrfScheduling} disabled={isEmptied}> SJF Preempting </button>
    <button onClick={clearTable}> Reset State </button>

    {array2 && returnArray(array2)}


    

    </>
  )
}

export default SchedulingVisualizer