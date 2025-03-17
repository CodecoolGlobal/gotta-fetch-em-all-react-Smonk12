import { useState, useEffect } from 'react'
import './App.css'
import LocationButtons from './components/LocationButtons';

function App() {
  const [locations, setLocations] = useState([]);

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

  return (
    <>

        {locations.map(location => 
          <LocationButtons
          key={location.name}
          locationProp={location}
          />
        )}
    </>
        )
      }

export default App