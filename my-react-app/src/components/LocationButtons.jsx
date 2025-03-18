import React from "react";

function LocationButtons({ locationProp, checkClick }) {
  return (
    <div className={locationProp.name}>
      <button onClick={() => checkClick(locationProp.name, locationProp)} className={locationProp.name}>
        {locationProp.name}
      </button>
    </div>
  );
}

export default LocationButtons;
