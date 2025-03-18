import React from "react";


function AreaButtons({areaProp, areaClick}) {
    return (
      <div className={areaProp}>
        <button className={areaProp.name} onClick={()=>areaClick(areaProp)}>
          {areaProp.name}
        </button>
      </div>
    );
  }


export default AreaButtons;