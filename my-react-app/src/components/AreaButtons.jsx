import React from "react";


function AreaButtons({areaProp}) {
    return (
      <div className={areaProp}>
        <button className={areaProp}>
          {areaProp}
        </button>
      </div>
    );
  }


export default AreaButtons;