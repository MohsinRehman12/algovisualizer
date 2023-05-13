import React, { useEffect } from 'react'
import { useState } from 'react'

import './scheduling.css'
function SchedulingVisualizer() {

    const [array2, setArray2] = useState([]);
    const [clicked, setClicked] = useState(false);




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

            onChange={(e) => setUsers(users.map(user => user.id === id ? {...user, arrival: e.target.value} : user))}

          ></input> 

          </td>
          <td style={{ padding: '10px', border: '1px solid white' }}>
          <input type='number'
            onChange={(e) => setUsers(users.map(user => user.id === id ? {...user, burst: e.target.value} : user))}

          ></input> 

          </td>
          <td style={{ padding: '10px', border: '1px solid white' }}>
          <input type='number'
            onChange={(e) => setUsers(users.map(user => user.id === id ? {...user, priority: e.target.value} : user))}

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

    


    function fcfs(e) {
        const newClicked = true;
        setClicked(newClicked);

        if(newClicked) {
        var auxillaryArray = users.slice();

        auxillaryArray.sort((a,b) => a.arrival - b.arrival);
        auxillaryArray = auxillaryArray.filter((process) => (process.arrival !== null || process.burst !== null));       

        for(let i = 0; i < auxillaryArray.length; i++) {
            if(i<auxillaryArray.length-1){
                
                if( (+auxillaryArray[i]['arrival'] + +auxillaryArray[i]['burst']) < +auxillaryArray[i+1]['arrival']) {

                    const arr1= auxillaryArray.slice(0,i+1);
                    const arr2= auxillaryArray.slice(i+1);
                    const arr3= [{id:'idle', arrival: +auxillaryArray[i]['arrival'] + +auxillaryArray[i]['burst'], burst: +auxillaryArray[i+1]['arrival'] - (+auxillaryArray[i]['arrival'] + +auxillaryArray[i]['burst']), priority: null}];
                    const arr4= arr1.concat(arr3).concat(arr2);
                    auxillaryArray = arr4;
                }
                else {
                    console.log("false");
                }
            }
        }

        setArray2(auxillaryArray);




    }
    }


    function sjf(){
        const newClicked = true;
        setClicked(newClicked);

        if(newClicked) {
        var auxillaryArray = users.slice();
        var auxillaryArray2 = users.slice(1);
        var auxillaryArray3 = auxillaryArray.slice(0,1);
        auxillaryArray.sort((a,b) => a.arrival - b.arrival);
        auxillaryArray2.sort((a,b) => a.burst - b.burst);
        
        auxillaryArray = auxillaryArray3.concat(auxillaryArray2);
        auxillaryArray = auxillaryArray.filter((process) => (process.arrival !== null || process.burst !== null));       

        for(let i = 0; i < auxillaryArray.length; i++) {
            if(i<auxillaryArray.length-1){

                if( i>0 && (+auxillaryArray[i-1]['arrival'] + +auxillaryArray[i-1]['burst']) < +auxillaryArray[i+1]['arrival']) {

                    if(auxillaryArray[i+1]['arrival'] > auxillaryArray[i]['arrival']){
                        const arr1= auxillaryArray.slice(0,i);
                        const arr2= auxillaryArray.slice(i+2);
                        const arr3= auxillaryArray[i];
                        const arr4= auxillaryArray[i+1];

                        const arr5= arr1.concat(arr4).concat(arr3).concat(arr2);
                        auxillaryArray = arr5;
                    }
                }
                
                if( (+auxillaryArray[i]['arrival'] + +auxillaryArray[i]['burst']) < +auxillaryArray[i+1]['arrival']) {

                    const arr1= auxillaryArray.slice(0,i+1);
                    const arr2= auxillaryArray.slice(i+1);
                    const arr3= [{id:'idle', arrival: +auxillaryArray[i]['arrival'] + +auxillaryArray[i]['burst'], burst: +auxillaryArray[i+1]['arrival'] - (+auxillaryArray[i]['arrival'] + +auxillaryArray[i]['burst']), priority: null}];
                    const arr4= arr1.concat(arr3).concat(arr2);
                    auxillaryArray = arr4;
                }

                
            }
        }

        setArray2(auxillaryArray);




    }
    }

    
    

    

    const returnArray = (arrayA) => {

            
        console.log(arrayA);

        
            return (
                <div className="testBox">
                
                
                    
                {arrayA.map((process ) => (

                    

                    <div className="test"
                        style={{flex: `${process.burst} 0 0`}}
                    >
                        {process.id}

                        <div className="underText">
                        </div>
                    </div>
                    
                ))}
        
        
            </div>
            )
            
    }

    useEffect(() => {

        


        
    }, [array2])
              
    

  return (
    <>
    {renderTable()}

    <button onClick={addRow}> + </button>
    <button onClick={fcfs}> FCFS </button>
    <button onClick={sjf}> SJF </button>

    {returnArray(array2)}


    

    </>
  )
}

export default SchedulingVisualizer