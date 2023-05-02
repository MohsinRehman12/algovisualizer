import React from 'react'

function Bar({height}) {
  return (
    <div className="bar-container"> 

    <div className="bar top">
        </div>

        <div className="bar bottom">

        </div>

        <div className="bar front">
            <div className="bar front color" style={{ height: `${height}vh`, transform: `translateY(${90-height}vh)` }}>
            <p className='barvalue'>{height}</p>

            </div>
            
        </div>

        <div className="bar back" >
            <div className="bar back color" style={{ height: `${height}vh`, transform: `translateY(${90-height}vh)` }}>

            </div>
        </div>

        <div className="bar left">
            <div className="bar left color" style={{ height: `${height}vh`, transform: `translateY(${90-height}vh)` }}>

            </div>
        </div>

        <div className="bar right">
            <div className="bar right color" style={{ height: `${height}vh`, transform: `translateY(${90-height}vh)` }}>

            </div>  
        </div>
    </div>
  )
}

export default Bar