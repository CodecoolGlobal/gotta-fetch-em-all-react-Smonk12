import React from "react";

function LocationButtons({ locationProp, checkClick }) {
  return (

      <button onClick={() => checkClick(locationProp.name, locationProp)} className={locationProp.name}  >
        {locationProp.name}
      </button>
  );
}

export default LocationButtons;