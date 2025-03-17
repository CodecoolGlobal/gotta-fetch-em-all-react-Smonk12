import React from "react";

function LocationButtons({locationProp}) {
return(
    <div className={locationProp.name}>
        <button className={locationProp.name}>{locationProp.name}</button>
    </div>
)
}




export default LocationButtons;