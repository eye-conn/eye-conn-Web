// import axios from 'axios';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { getToken } from '../Utils/Common';

require('dotenv').config();


function Dashboard({setAuth: hasAuth, setAuthLoading: hasAuthLoading, Socket: socket, ...props}) {
  const [loading, setLoading] = useState(false)
  const [allStations, setAllStations] = useState([])
  const [inCode, setInCode] = useState(null)
  const [outCode, setOutCode] = useState(null)
  // const user = getUser();
  // console.log(user)

  useEffect(() => {
    setLoading(true)
    axios.post(`${process.env.REACT_APP_HOST}/station/all`, {token: getToken()})
    .then((response) => {
      setLoading(false)
      setAllStations(response.data.stations)
      setInCode(response.data.stations[0].station_code)
      setOutCode(response.data.stations[0].station_code)
    }).catch((error) => {
      setLoading(false)
      setAllStations([])
    })
    return () => {
      
    }
  }, [])
  
  if (loading) {
// return <div className="loadclass"><span className="loader-11"></span></div>;
return <>
<div className="loadclass-new">
  <div className="spinner-box">
<div className="configure-border-1">  
  <div className="configure-core"></div>
</div>  
<div className="configure-border-2">
  <div className="configure-core"></div>
</div> 
</div>
</div>
</>;  }  

  return (
    <div className='dash'>
      <h1 className='subtitle' >Stations</h1> 
      <div className="stationContainer">
        <div className="inHeader">
          <h2 className="stationName">IN</h2>
        </div>
        <div className="outHeader">
        <h2 className="stationName">OUT</h2>
        </div>
        <div className="stationDrop">
        {/* <h2 className="stationName">Station 1</h2> */}
       {/* create dropdown */}
       <select name="inStation" id="inSelectInput" onChange={(e)=>{setInCode(e.target.value)}} >
          {allStations.map((station) => {
            return <option key={"in"+station.id} value={station.station_code}>{station.station_name}</option>
          })}
       </select>
        </div>
        <div className="stationDrop">
        {/* <h2 className="stationName">Station 2</h2> */}
        <select name="outStation" id="outSelectInput" onChange={(e)=>{setOutCode(e.target.value)}}>
          {allStations.map((station) => {
            return <option key={"out"+station.id} value={station.station_code}>{station.station_name}</option>
          })}
       </select>
        </div>
        <div className="qrCont" id="inqr">
          
          
        </div>
        <div className="qrCont" id="outqr">

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
