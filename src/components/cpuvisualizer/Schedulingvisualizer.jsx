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
    const [infoArray, setInfoArray] = useState([]);



    const INITIAL_STATE = [
        {id:'P0', arrival: null, burst: null, priority: null},
        {id:'P1', arrival: null, burst: null, priority: null} 
 

    ]

    const INITIAL_INFO_STATE = [
        {id:'P0', arrival: null, burst: null, priority: null, finish: null, waitingTime: null, turnaroundTime: null},
        {id:'P1', arrival: null, burst: null, priority: null, finish: null, waitingTime: null, turnaroundTime: null}
    ]

    const [users, setUsers] = useState(INITIAL_STATE);
    
    const updateUserState = (newUsers) => {
        setUsers(newUsers);
    };

    const updateRunningState = (newRunningState) => {
        setIsRunning(newRunningState);
    };

    const renderInfo = () => {
        return infoArray.map(({id, arrival, burst, priority, start, finish, wt, tat }) => {

            return <tr key={id} >
            <td style={{ padding: '10px'}}>
              {id}
            </td>
            <td style={{ padding: '10px' }}>
              {arrival}
            </td>
            <td style={{ padding: '10px' }}>
              {burst}
            </td>
            <td style={{ padding: '10px' }}>
              {priority? priority : "N/A"}
            </td>
            
            <td style={{ padding: '10px' }}>
              {finish}
            </td>
            <td style={{ padding: '10px' }}>
              {wt}
            </td>
            <td style={{ padding: '10px' }}>
              {tat}
            </td>
          </tr>
          })
        }

    const renderUsers = () => {
        return users.map(({id, arrival, burst, priority }) => {
        
          return <tr key={id} >
          <td style={{ padding: '10px'}}>
            {id}          
          </td>
          <td style={{ padding: '10px' }}>
          <input type='number' 
            className='table-input1'
            onChange={(e) => setUsers(users.map(user => user.id === id ? {...user, arrival: e.target.value} : user))}
            id='tableInput1'
          ></input> 

          </td>
          <td style={{ padding: '10px' }}>
          <input type='number'
            onChange={(e) => setUsers(users.map(user => user.id === id ? {...user, burst: e.target.value} : user))}
            id='tableInput2'
            className='table-input2'


          ></input> 

          </td>
          <td style={{ padding: '10px' }}>
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
          {Object.keys(INITIAL_STATE[0]).map(key => <th className='ptable-header'>{key}</th>)}
        </tr>
      }

      const renderInfoHeader = () => {
        return <tr>
          {Object.keys(INITIAL_INFO_STATE[0]).map(key => <th className='ptable-header'>{key}</th>)}
        </tr>
      }

      const renderInfoTable = () => {
        return (
          <table className='processTable'>
            {renderInfoHeader()}
            <tbody>
              {renderInfo()}
            </tbody>
          </table>
        )
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
      setIsRunning(false);
      setInfoArray([]);
      setArray2(FCFS.fcfs(users, updateUserState, isRunning, updateRunningState));
      setInfoArray(FCFS.getLocalArray());

      
    }
    
    


    function sjf(){
      setIsRunning(false);

      setArray2(SJF.sjf(users, updateUserState, isRunning, updateRunningState));
      setInfoArray(SJF.getLocalArray());
    }

    
    

    
    

    function sjrfScheduling() {
      setIsRunning(false);
      setInfoArray([]);
      setArray2(SJF.sjrfScheduling(users, isRunning, updateUserState, updateRunningState));
      setInfoArray(SJF.getLocalArray());

      
    }

    function roundRobinScheduling() {
    setIsRunning(false);
    setInfoArray([]);
    setArray2(RR.roundRobinScheduling(users, 3, updateUserState, isRunning, updateRunningState));
    setInfoArray(RR.getLocalArray());
    }

    

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

    const clearInfoTable = () => {
      setInfoArray(INITIAL_INFO_STATE);
    };
    
    
    
    
    
    
    function isTableFilled() {
      const inputs = document.getElementsByClassName('table-input1');
      const inputs2 = document.getElementsByClassName('table-input2');

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value === '' || inputs2[i].value === '') {
          return false;
        }
      }

      let isNeg = isTableNegative();
      return isNeg;  
    }

    function isTableNegative() {
      const inputs = document.getElementsByClassName('table-input1');
      const inputs2 = document.getElementsByClassName('table-input2');
      const inputs3 = document.getElementsByClassName('table-input3');

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value < 0 || inputs2[i].value < 0 || inputs3[i].value < 0
          || inputs[i].value === '0' || inputs2[i].value === '0' || inputs3[i].value === '0') {
           
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
      <div className={`coverDiv ${isRunning}`}>

      
      <div className={`testBox ${isRunning}`}>
        {arrayA.map((process, index) => (
          <div
            key={index}
            className={`test`}

            style={isRunning?
              { 
                opacity: '1',
                flex: 
                `${process.burst} 0 0`, 
                backgroundColor: `${process.color}`, 
                boxShadow: `5px 5px 50px 5px ${process.color}`, 
                transform: `translateX(0)`,
                color: 'white',
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                height:'60px',
                alignItems: 'center',
                opacity: '1',
                visibility: 'visible',
                transition: `${process.start*100}ms`,
                animation: `${process.start*100}ms ease-in-out 0s 1 slideInFromLeft`,
              
              }
              : 
              { 
                flex: 
                `${process.burst} 0 0`, 
                backgroundColor: `${process.color}`, 
                boxShadow: `5px 5px 50px 5px ${process.color}`, 
                transform: `translateX(0)`,
                color: 'white',
                display: 'flex',
                textAlign: 'center',
                justifyContent: 'center',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                height:'60px',
                alignItems: 'center',
                opacity: '0',
                visibility: 'hidden',
                transition: `${process.start*10}ms ease-in-out 0s 1 slideInFromLeft`,

              
               }
            }
          >
            {process.id}
            
            
          </div>
          
        ))}
    </div>

    <div className="testBox interval">
      {arrayA.map((process, index) => (

          <div
            key={index}
            className="intervalBox"
            style={{ flex: `${process.burst} 0 0` }}
          >
            <p className='timeText'>
              {process.start}
            </p>

            <p className='timeText'>
            {process.last ? process.finish : null}
            </p>
          </div>
          
        ))}
    </div>
    </div>
    </>
  )


};

 
  function priorityScheduling(){
    
    setArray2(PriorityAlgoritms.priorityScheduling(users, isRunning, updateUserState));
  }
  

  
    

  return (
    <>

    <h1 className='headerText'> CPU Scheduling Visualizer </h1>
    {renderTable()}

    <button className='bar-button' onClick={addRow}> + </button>
    <button className='bar-button' onClick={deleteRow}> - </button>
    <button className='bar-button' onClick={fcfs} disabled={isEmptied}> FCFS </button>
    <button className='bar-button' onClick={sjf} disabled={isEmptied}> SJF </button>
    <button className='bar-button' onClick={sjrfScheduling} disabled={isEmptied}> SJF Preempting </button>
    <button className='bar-button' onClick={priorityScheduling} disabled={isEmptied}> Priority Preempting</button>
    <button className='bar-button' onClick={roundRobinScheduling} disabled={isEmptied}> Round Robin </button>
    <button className='bar-button' onClick={clearTable}> Reset State </button>
    <button className='bar-button' onClick={clearInfoTable}> Clear Info </button>

    {array2 && ReturnArray(array2)}
    {infoArray && renderInfoTable(infoArray)}


    

    </>
  )
}

export default SchedulingVisualizer