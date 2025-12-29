import React from 'react'
import '../style/Parking.css'
import { useState } from 'react';
const Parking = () => {
  const [allVehicles, setAllVehicles] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
const filteredVehicles = allVehicles.filter((item) => {
  const q = searchTerm.trim().toLowerCase();
  if (q === "") return true;
  return item.regNumber.toLowerCase().includes(q);
});
  const [vehicle, setVehicle] = useState({
    regNumber: '',
    type: ''
  });
  const handleChange = (e) => {
    const {name, value} = e.target;
    setVehicle(
      prev =>({
        ...prev,
        [name] : value
      })
    )
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(allVehicles.some((veh) => veh.regNumber===vehicle.regNumber))
    {
      alert("already exist!");
    }
    else{
    setAllVehicles(
      prev => (
        [
          ...prev, 
          vehicle
        ]
      )
    )}
  };
  const handleParkOut = (veh) =>
  {
    console.log(veh.type)
    if(veh.type === "Car")
    {
      console.log(veh.regNumber)
      setTotalEarning(prev => prev + 100);
    }
    else if (veh.type === "Bike")
    {
      setTotalEarning(prev => prev + 50);
    }
    setAllVehicles((prev) =>
    prev.filter((item) => item.regNumber !== veh.regNumber)
  );

  }
  return (
    <div className='container'>
        <h2>Parking System:</h2>
        <h3>Total Earning : ${totalEarning}</h3>
        <form onSubmit={handleSubmit}>
            <input type="text" required name='regNumber' placeholder='Registration Number'onChange={handleChange}/>
            <br />
            <label>
                <input type="radio" required name='type' value="Car" onChange={handleChange}/>
                Car
            </label>
            <label>
                <input type="radio" required name='type' value="Bike" onChange={handleChange}/>
                Bike
            </label>
            <br />
            <button type='submit' className='submit-button' >Park In</button>
        </form>
              <form>
        <label htmlFor="search">Search by Reg Number :</label>
        <input
          type="text"
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
        <div className='all-vehicles'>
          {
            filteredVehicles.map(veh =>
            (  <div className="vehicle" key={veh.regNumber}>
                <h5 style={{fontSize:"1.3rem"}}>{veh.type}</h5>
                <p style={{fontSize:'1.2rem'}}>{veh.regNumber}</p>
                <button onClick={() => handleParkOut(veh)}>Park out</button>
              </div>
            )
            )
          }
        </div>
    </div>
  )
}
export default Parking