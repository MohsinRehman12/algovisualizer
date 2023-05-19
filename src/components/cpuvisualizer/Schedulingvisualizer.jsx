import React, { useEffect } from 'react'
import { useState } from 'react'
import * as PriorityAlgoritms from './algorithms/Priority';
import * as SJF from './algorithms/SJF';
import * as FCFS from './algorithms/FCFS';
import * as RR from './algorithms/RoundRobin';

import './scheduling.css'
function SchedulingVisualizer() {

    const [array2, setArray2] = useState([]);
    const [clicked, setClicked] = useState(false);
    const [order, setOrder] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isEmptied, setIsEmptied] = useState(true);
    const [timeIntervals, setTimeIntervals] = useState([]);



    const INITIAL_STATE = [
        {id:'P0', arrival: null, burst: null, priority: null},
        {id:'P1', arrival: null, burst: null, priority: null} 
 

    ]

    const [users, setUsers] = useState(INITIAL_STATE);
    
    const updateUserState = (newUsers) => {
        setUsers(newUsers);
    };

    const updateRunningState = (newRunningState) => {
        setIsRunning(newRunningState);
    };

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
      setArray2(FCFS.fcfs(users, updateUserState));
      
    }
    
    


    function sjf(){
      setArray2(SJF.sjf(users, updateUserState));
    }

    
    

    
    

    function sjrfScheduling() {
      setArray2(SJF.sjrfScheduling(users, isRunning, updateUserState));

      
    }

    function roundRobinScheduling() {

    setArray2(RR.roundRobinScheduling(users, 3, updateUserState));
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
    
    

  const ReturnArray = (arrayA) => {

    


    function colorMaker(){
      const fringe =[];
      arrayA.forEach(element => {

        if(fringe.includes(element.id)){
          element.color = arrayA[fringe.indexOf(element.id)].color;

        }
        else{
          element.color = '#'+Math.floor(Math.random()*16777215).toString(16);

        }
        fringe.push(element.id);

      });
    }

    colorMaker();
  
    return (
      <>
      <div className="testBox">
        {arrayA.map((process, index) => (
          <div
            key={index}
            className="test"
            style={{ flex: `${process.burst} 0 0`, backgroundColor: `${process.color}`, background : '20%' }}
          >
            {process.id}
            
            
          </div>
          
        ))}
    </div>

    <div className="testBox">
      {arrayA.map((process, index) => (

          <div
            key={index}
            className="intervalBox"
            style={{ flex: `${process.burst} 0 0` }}
          >
            <p>
              {process.start}
            </p>

            <p>
            {process.last ? process.finish : null}
            </p>
          </div>
          
        ))}
    </div>
    </>
  )


};

 
  function priorityScheduling(){
    
    setArray2(PriorityAlgoritms.priorityScheduling(users, isRunning, updateUserState));
  }
  

  
    

  return (
    <>
    {renderTable()}

    <button onClick={addRow}> + </button>
    <button onClick={deleteRow}> - </button>
    <button onClick={fcfs} disabled={isEmptied}> FCFS </button>
    <button onClick={sjf} disabled={isEmptied}> SJF </button>
    <button onClick={sjrfScheduling} disabled={isEmptied}> SJF Preempting </button>
    <button onClick={priorityScheduling} disabled={isEmptied}> Priority </button>
    <button onClick={roundRobinScheduling} disabled={isEmptied}> Round Robin </button>
    <button onClick={clearTable}> Reset State </button>

    {array2 && ReturnArray(array2)}


    

    </>
  )
}

export default SchedulingVisualizer