import { useState, useEffect } from 'react';
import './App.css';
import LocationButtons from './components/LocationButtons';
import AreaButtons from './components/AreaButtons';

function App() {
  const [locations, setLocations] = useState([]);
  const [zoomedLocation, setZoomedLocation] = useState("");
  const [areas, setAreas] = useState([]);


  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/location');
        const data = await response.json();
        setLocations(data.results);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);


  async function checkClick(locationName, location) {
    if (zoomedLocation === locationName) {
      setZoomedLocation("");
      setAreas([]);
    } else {
      setZoomedLocation(locationName);
    }

    let locationURL = location.url;

    try {
      const response = await fetch(locationURL);
      const data = await response.json();
      console.log("Areas data:", data.areas);
      setAreas(data.areas);
    } catch (error) {
      console.error('Error fetching areas:', error);
    }
  }

  return (
    <>
      {locations
        .filter(location => zoomedLocation === "" || zoomedLocation === location.name)
        .map(location => (
          <LocationButtons
            key={location.name}
            locationProp={location}
            checkClick={checkClick}
          />
        ))}

      {zoomedLocation && areas.length > 0 && (
        <div>
          <ul>
            {areas.map((area, index) => (
              <AreaButtons
                key={index}
                areaProp={area.name} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default App;
